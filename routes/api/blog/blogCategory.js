const BlogCategory = require('../../../models/BlogCategory');
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
const categoryStorage = new GridFsStorage({
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
          bucketName: 'categoryImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
// create multer storage engine
const categoryUpload = multer({ storage: categoryStorage });
// Create a new mongodb connection and once connected save GridFSBucket 'headerImages' to headerImageBucket, 'contentImages' to contentImageBucket
const connect = mongoose.createConnection(db);
let categoryImageBucket;
connect.once('open', () => {
  categoryImageBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'categoryImages',
  });
});

//  desc    Create Category
router.post('/', [auth, categoryUpload.single('file')], async (req, res) => {
  const { category, blogType } = req.body;
  const postItem = { category, blogType, image_filename: req.file.filename };

  try {
    const item = new BlogCategory(postItem);
    await item.save();
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

// desc   Delete Category
router.delete('/:_id', auth, async (req, res) => {
  try {
    const category = await BlogCategory.findOneAndRemove({ _id: req.params._id });
    const img = await categoryImageBucket.find({ filename: category.image_filename }).toArray();
    await categoryImageBucket.delete(img[0]._id);
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get all categories
router.get('/:blogType', async (req, res) => {
  try {
    const categories = await BlogCategory.find({ blogType: req.params.blogType });
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Read an image
router.get('/image/:filename', async (req, res) => {
  try {
    const files = await categoryImageBucket.find({ filename: req.params.filename }).toArray();
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
    categoryImageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});
module.exports = router;
