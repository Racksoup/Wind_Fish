const Comment = require('../../../models/Comment');
const User = require('../../../models/User');
const userAuth = require('../../../middleware/userAuth');
const auth = require('../../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

//  Delete all Comments from user
router.delete('/user', userAuth, async (req, res) => {
  try {
    let comments = await Comment.find({ 'comments.userId': req.user.id });
    comments = comments.map((blogComment) => {
      let x = blogComment.comments.filter((comment) => comment.userId !== req.user.id);
      blogComment.comments = x;
      return blogComment;
    });
    comments.map(async (blogComment) => {
      await Comment.findByIdAndUpdate(blogComment._id, blogComment);
    });
  } catch (error) {
    console.log(error);
  }
});

router.put('/name-change', userAuth, async (req, res) => {
  try {
    let comments = await Comment.find({ 'comments.userId': req.user.id });
    comments = comments.map((blogComment) => {
      let x = blogComment.comments.map((comment) => {
        if ((comment.userId = req.user.id)) {
          comment.userName = req.body.name;
          return comment;
        }
      });
      blogComment.comments = x;
      console.log(blogComment);
      return blogComment;
    });
    comments.map(async (blogComment) => {
      await Comment.findByIdAndUpdate(blogComment._id, blogComment);
    });
  } catch (error) {
    console.log(error);
  }
});

//  Create Blog-Comments
router.post('/', auth, async (req, res) => {
  const postItem = {
    blogId: req.body.blogId,
    comments: [],
    blogName: req.body.blogName,
  };

  try {
    const item = new Comment(postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Update Comments on Blog-Comments, adds blogId to user if not there
router.put('/', userAuth, async (req, res) => {
  const userId = req.user.id;
  const { blogId, commentText, userName } = req.body;
  try {
    let userIDFound = false;
    // Get Comment
    let item = await Comment.findOne({ blogId: blogId });
    // check if userId is in item.comments
    item.comments.forEach((userComment) => {
      if (userComment.userId === userId) {
        userIDFound = true;
      }
    });
    // if comment was not found, add a new comment
    if (!userIDFound) {
      item.comments.push({ userId, comment: commentText, userName });
    }
    // if comment was found, remove it and create add new comment
    else {
      item.comments = item.comments.filter((userComment) => {
        userComment.userId !== userId;
      });
      item.comments.push({ userId, comment: commentText, userName });
    }

    // needs seperate route ---
    // -------------------
    // -------------------
    // Update user.comments
    let user = await User.findOne({ _id: userId });
    let inComments = false;
    if (user.comments.length > 0) {
      user.comments.map((id) => {
        if (blogId === id) {
          inComments = true;
        }
      });
    }
    if (!inComments) {
      user.comments.push(blogId);
      await User.findOneAndUpdate({ _id: userId }, user);
    }
    // -------------------

    // findoneandupdate
    const saveItem = await Comment.findOneAndUpdate({ blogId: blogId }, item, { new: true });
    await saveItem.save();
    res.json(saveItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// deletes one blogComments
router.delete('/:blogID', auth, async (req, res) => {
  try {
    await Comment.findOneAndDelete({ blogId: req.params.blogID });
    res.json(deleteItem);
  } catch (error) {
    console.log(error);
  }
});

// Find Comments connected to 1 blog post
router.get('/:blogID', async (req, res) => {
  try {
    const item = await Comment.findOne({ blogId: req.params.blogID });
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

// Remove blogId from User Comments
router.put('/remove-user-comment', userAuth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    user.comments = user.comments.filter((blogId) => blogId !== req.body.blogId);
    const item = await User.findOneAndUpdate({ _id: req.user.id }, user, {
      new: true,
    });
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

// Remove comment from Blog-Comments
router.put('/remove-blog-comment', userAuth, async (req, res) => {
  try {
    let blogComments = await Comment.findOne({ blogId: req.body.blogId });
    blogComments.comments = blogComments.comments.filter(
      (commentInfo) => commentInfo.userId !== req.user.id
    );
    const item = await Comment.findOneAndUpdate({ blogId: blogComments.blogId }, blogComments, {
      new: true,
    });
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
