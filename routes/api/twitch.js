const express = require('express');
const router = express.Router();
const axios = require('axios');

let twitchToken = {
  access_token: null,
  expires_in: null,
  token_type: null,
};

router.get('/auth', async (req, res) => {
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
    console.log('auth')
    let item = await axios.post('https://id.twitch.tv/oauth2/token', postItem, config);
    twitchToken = item.data;
    console.log('---maybe---')
    res.json('success');
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/online', async (req, res) => {
  const config = {
    params: {
      user_id: process.env.TWITCH_WINDFISH_ID
    },
    headers: {
      'Client-Id': process.env.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${twitchToken.access_token}`,
    },
  };

  try {
    console.log('getOnline')
    let item = await axios.get(`https://api.twitch.tv/helix/streams`, config);
    if (item.data.data.length === 0) {
      res.json(false);
    } else {
      res.json(true)
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
