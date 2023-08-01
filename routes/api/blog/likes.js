const Like = require('../../../models/Like');
const User = require('../../../models/User');
const userAuth = require('../../../middleware/userAuth');
const auth = require('../../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

//  Delete all likes from one user on all blog-likes
router.delete('/user', userAuth, async (req, res) => {
  try {
    let likes = await Like.find({ likes: [req.user.id] });
    likes = likes.map((blogLike) => {
      let x = blogLike.likes.filter((id) => id !== req.user.id);
      blogLike.likes = x;
      return blogLike;
    });
    likes.map(async (blogLike) => {
      await Like.findByIdAndUpdate(blogLike._id, blogLike);
    });
  } catch (error) {
    console.log(error);
  }
});

//  Create New Blog-Likes
router.post('/', auth, async (req, res) => {
  const postItem = {
    blogId: req.body.blogId,
    likes: [],
    blogName: req.body.blogName,
  };

  try {
    const item = new Like(postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Likes on blog-likes
router.put('/', userAuth, async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.body;
  try {
    let userIDFound = false;
    // Get Like
    let item = await Like.findOne({ blogId: blogId });
    // check if userId is in item.likes
    item.likes.forEach((id) => {
      if (id === userId) {
        userIDFound = true;
      }
    });
    // if id is in item.likes remove it
    item.likes = item.likes.filter((id) => {
      if (id !== userId) {
        return id;
      }
    });
    // if id was not found, add it
    if (!userIDFound) {
      item.likes.push(userId);
    }

    // findoneandupdate
    const saveItem = await Like.findOneAndUpdate({ blogId: blogId }, item, { new: true });
    await saveItem.save();
    res.json(saveItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Update likes on user
router.put('/user', userAuth, async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.body;
  try {
    // Update user.likes
    let user = await User.findOne({ _id: userId });
    let inlikes = false;
    if (user.likes.length > 0) {
      user.likes.map((id) => {
        if (blogId === id) {
          inlikes = true;
        }
      });
    }
    if (!inlikes) {
      user.likes.push(blogId);
    } else {
      user.likes = user.likes.filter((id) => id !== blogId);
    }
    const item = await User.findOneAndUpdate({ _id: userId }, user, { new: true });
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

// Delete Blog-Likes
router.delete('/:blogID', auth, async (req, res) => {
  try {
    const deleteItem = await Like.findOneAndDelete({ blogId: req.params.blogID });
    res.json(deleteItem);
  } catch (error) {
    console.log(error);
  }
});

// Find 1 Blog-Likes
router.get('/:blogID', async (req, res) => {
  try {
    const item = await Like.findOne({ blogId: req.params.blogID });
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
