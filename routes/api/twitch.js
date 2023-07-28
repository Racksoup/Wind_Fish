const express = require('express');
const router = express.Router();
const axios = require('axios');

let twitchToken = {
  access_token: null,
  expires_in: null,
  token_type: null,
};

router.post('/auth', async (req, res) => {
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
    let item = await axios.post('https://id.twitch.tv/oauth2/token', postItem, config);
    twitchToken = item.data;
    res.json('twitch auth acquired');
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/online', async (req, res) => {
  const config = {
    params: {
      user_id: process.env.TWITCH_WINDFISH_ID,
    },
    headers: {
      'Client-Id': process.env.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${twitchToken.access_token}`,
    },
  };

  try {
    let item = await axios.get(`https://api.twitch.tv/helix/streams`, config);
    if (item.data.data.length === 0) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/clips', async (req, res) => {
  const config = {
    params: {
      broadcaster_id: process.env.TWITCH_WINDFISH_ID,
    },
    headers: {
      'Client-Id': process.env.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${twitchToken.access_token}`,
    },
  };

  try {
    let item = await axios.get(`https://api.twitch.tv/helix/clips`, config);
    res.json(item.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/user-auth', async (req, res) => {
  const config = {
    headers: {
      'Authorization': `OAuth ${req.body.token}`
    }
  }

  try {
    let item = await axios.get('https://id.twitch.tv/oauth2/validate', config);
    if (item.data.client_id === process.env.TWITCH_CLIENT_ID) {
      // check if user exists
      // if they do login (here)
      // else create account (route)
      res.json({isAuth: true, ...item.data, token: req.body.token})
    }
  } catch (err) {
    res.json(false)
    console.log(err.message);
  }
});

module.exports = router;
