const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const postItem = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let res = await axios.post('https://id.twitch.tv/oauth2/token', postItem, config);
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
