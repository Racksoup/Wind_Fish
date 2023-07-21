const Blog = require('../../../models/Blog');
const auth = require('../../../middleware/auth');
const db = process.env.MONGOURI;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');

// Blog Header Image Storage
const headerStorage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'headerImages',
          //metadata
        };
        resolve(fileInfo);
      });
    });
  },
});
const headerUpload = multer({ storage: headerStorage });
// Blog Content Image Storage
const contentStorage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const obj = JSON.parse(JSON.stringify(req.body));
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'contentImages',
          metadata: {
            blogID: req.params.blogID,
            imgName: file.originalname,
            link: obj.link,
            caption: obj.caption,
          },
        };
        resolve(fileInfo);
      });
    });
  },
});
const contentUpload = multer({ storage: contentStorage });

// Create a new mongodb connection and once connected save GridFSBucket 'headerImages' to headerImageBucket, 'contentImages' to contentImageBucket
const connect = mongoose.createConnection(db);
let headerImageBucket;
let contentImageBucket;
connect.once('open', () => {
  headerImageBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'headerImages',
  });
  contentImageBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'contentImages',
  });
});

// @desc    Search
router.get('/search/:search', async (req, res) => {
  try {
    const res1 = await Blog.find({ title: { $regex: req.params.search, $options: 'i' } });
    const res2 = await Blog.find({ category: { $regex: req.params.search, $options: 'i' } });
    const res3 = await Blog.find({ tags: { $regex: req.params.search, $options: 'i' } });
    res.json([res1, res2, res3]);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get 10 most recent blogs
router.get('/recent-blogs/:blogType', async (req, res) => {
  try {
    const blogs = await Blog.find({ blogType: req.params.blogType }).sort({ date: 1 }).limit(10);
    res.json(blogs);
  } catch (error) {
    console.log(error);
  }
});

// @route   POST api/blogs
// @desc    Post blog
// @access  Private
router.post('/', [auth, headerUpload.single('file')], async (req, res) => {
  const { title, poster, category, date, text, favorite, tags, link, caption, blogType } = req.body;
  const postItem = {
    title,
    poster,
    category,
    date,
    favorite,
    link,
    caption,
    blogType,
    image_filename: req.file.filename,
  };
  postItem.text = JSON.parse(text);
  postItem.tags = JSON.parse(tags);

  try {
    const item = new Blog(postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/blogs/:_id
// @desc    Update Blog
// @access  Private
router.put('/:_id', [auth, headerUpload.single('file')], async (req, res) => {
  const {
    title,
    poster,
    category,
    date,
    text,
    favorite,
    _id,
    image_filename,
    tags,
    link,
    caption,
    blogType,
  } = req.body;
  const postItem = {
    _id,
    title,
    poster,
    category,
    date,
    favorite,
    image_filename,
    link,
    caption,
    blogType,
  };
  if (req.file) {
    postItem.image_filename = req.file.filename;
  }

  postItem.text = JSON.parse(text);
  postItem.tags = JSON.parse(tags);

  try {
    const item = await Blog.findOneAndUpdate({ _id: req.params._id }, postItem, { new: true });

    if (req.file) {
      const imgs = await headerImageBucket.find({ filename: image_filename }).toArray();
      await headerImageBucket.delete(imgs[0]._id);
    }

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/blogs/:_id
// @desc    Delete Blog
// @access  Private
router.delete('/:_id', auth, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params._id });
    const img = await headerImageBucket.find({ filename: blog.image_filename }).toArray();
    await headerImageBucket.delete(img[0]._id);
    const imgs = await contentImageBucket.find({ 'metadata.blogID': req.params._id }).toArray();
    imgs.map(async (x) => {
      await contentImageBucket.delete(x._id);
    });
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogs
// @desc    Get All Blog
// @access  Public
router.get('/:blogType', async (req, res) => {
  try {
    const items = await Blog.find({ blogType: req.params.blogType }).sort({ date: 1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogs/get-three
// @desc    Get 3 blogs by most recent
// @access  Public
router.get('/get-three/:blogType', async (req, res) => {
  try {
    const items = await Blog.find({ favorite: true, blogType: req.params.blogType })
      .sort({ date: 1 })
      .limit(3);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogs/:_id
// @desc    Get One blog by id
// @access  Public
router.get('/:_id', async (req, res) => {
  try {
    const item = await Blog.findOne({ _id: req.params._id });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send;
  }
});

// @route   GET api/blogs/image/:filename
// @desc    Get blog header image
// @access  Public
router.get('/image/:filename', async (req, res) => {
  try {
    const files = await headerImageBucket.find({ filename: req.params.filename }).toArray();
    if (!files[0] || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }
    const file = files[0];
    if (file.contentType !== 'image/png' && file.contentType !== 'image/jpeg') {
      return res.status(404).json({
        success: false,
        message: 'File is not an image',
      });
    }
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    headerImageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
  // headerImageBucket.find({ filename: req.params.filename }).toArray((err, files) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Internal server error',
  //     });
  //   }

  //   if (!files[0] || files.length === 0) {
  //     return res.status(200).json({
  //       success: false,
  //       message: 'No files available',
  //     });
  //   }

  //   console.log('here');

  //   if (files[0].contentType === 'image/png' || files[0].contentType === 'image/jpeg') {
  //     res.setHeader('Content-Type', file.contentType);
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     // headerImageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  //     console.log('fff');
  //   } else {
  //     res.status(404).json({
  //       err: 'Not an image',
  //     });
  //   }
  // });
});

// ---- CONTENT IMAGES -----
// ---- CONTENT IMAGES -----
// ---- CONTENT IMAGES -----

// @route   GET api/blogs/content-image/:filename
// @desc    Get blog content image
// @access  Public
router.get('/content-image/:filename', async (req, res) => {
  try {
    const files = await contentImageBucket.find({ filename: req.params.filename }).toArray();
    if (!files[0] || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }
    const file = files[0];
    if (file.contentType !== 'image/png' && file.contentType !== 'image/jpeg') {
      return res.status(404).json({
        success: false,
        message: 'File is not an image',
      });
    }
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    contentImageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// @route   GET api/blogs/content-images/data/:blogID
// @desc    Get images for 1 blog
// @access  Public
router.get('/content-images/data/:blogID', async (req, res) => {
  try {
    const items = await contentImageBucket.find({ 'metadata.blogID': req.params.blogID }).toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});

// @route   DELETE api/blogs/content-image/:filename
// @desc    Delete 1 blog content image
// @access  private
router.delete('/content-image/:filename', auth, async (req, res) => {
  try {
    const img = await contentImageBucket.find({ filename: req.params.filename }).toArray();
    await contentImageBucket.delete(img[0]._id);
    res.json(img);
  } catch (error) {
    console.error(err.message);
    res.status(500).send;
  }
});

// @route   POST api/blogs/content-images
// @desc    Post content-images
// @access  Private
router.post(
  '/content-images/:blogID',
  [auth, contentUpload.array('file', 100)],
  async (req, res) => {
    res.json(req.files);
  }
);

// @route   POST api/blogs/content-image/:blogID
// @desc    Post single content-image
// @access  Private
router.post('/content-image/:blogID', [auth, contentUpload.single('file')], async (req, res) => {
  res.json(req.file);
});

// @route   PUT api/blogs/content-image/:filename/:name
// @desc    Update metadata.imgName
// @access  Private
router.put('/content-image/:filename/:name/:blogID', auth, async (req, res) => {
  const postItem = {
    $set: { metadata: { imgName: req.params.name, blogID: req.params.blogID } },
  };
  try {
    let x = mongoose.connection.db.collection('contentImages.files');
    const newImage = await x.findOneAndUpdate({ filename: req.params.filename }, postItem, {
      new: true,
    });
    res.json(newImage);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
