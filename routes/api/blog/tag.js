const Tag = require('../../../models/Tag');
const auth = require('../../../middleware/auth');

const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { tag } = req.body;
  const postItem = { tag };

  try {
    const item = new Tag(postItem);
    await item.save();
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const tag = await Tag.findOneAndRemove({ _id: req.params._id });
    res.json(tag);
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
