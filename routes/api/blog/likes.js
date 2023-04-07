const Like = require('../../../models/Like');
const Account = require('../../../models/Account');
const accountAuth = require('../../../middleware/accountAuth');
const auth = require('../../../middleware/auth');

const express = require('express');
const router = express.Router();

//  Delete all likes from one account on all blog-likes
router.delete('/account', accountAuth, async (req, res) => {
  try {
    let likes = await Like.find({ likes: [req.account.id] });
    likes = likes.map((blogLike) => {
      let x = blogLike.likes.filter((id) => id !== req.account.id);
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
router.put('/', accountAuth, async (req, res) => {
  const accountId = req.account.id;
  const { blogId } = req.body;
  try {
    let accountIDFound = false;
    // Get Like
    let item = await Like.findOne({ blogId: blogId });
    // check if accountId is in item.likes
    item.likes.forEach((id) => {
      if (id === accountId) {
        accountIDFound = true;
      }
    });
    // if id is in item.likes remove it
    item.likes = item.likes.filter((id) => {
      if (id !== accountId) {
        return id;
      }
    });
    // if id was not found, add it
    if (!accountIDFound) {
      item.likes.push(accountId);
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

//  Update likes on account
router.put('/account', accountAuth, async (req, res) => {
  const accountId = req.account.id;
  const { blogId } = req.body;
  try {
    // Update account.likes
    let account = await Account.findOne({ _id: accountId });
    let inlikes = false;
    if (account.likes.length > 0) {
      account.likes.map((id) => {
        if (blogId === id) {
          inlikes = true;
        }
      });
    }
    if (!inlikes) {
      account.likes.push(blogId);
    } else {
      account.likes = account.likes.filter((id) => id !== blogId);
    }
    const item = await Account.findOneAndUpdate({ _id: accountId }, account, { new: true });
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
