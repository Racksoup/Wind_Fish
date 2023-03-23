const express = require('express');
const router = express.Router();
const axios = require('axios');

// get one task
router.get('/', async (req, res) => {
  key = process.env.YOUTUBEV3;
  vidIds = ['WdlIKy2lJ_g', 'EzNhaLUT520', '2ekLO8BwxwE', '1Q39yGLPkMY'];
  try {
    let data = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vidIds[0]}&id=${vidIds[1]}&id=${vidIds[2]}&id=${vidIds[3]}&key=${key}`
    );
    res.json(data.data.items);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
