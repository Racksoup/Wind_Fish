const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

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

// code flow
router.post('/user-auth', async (req, res) => {
  const config = {
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    }
  }

  try {
    // let item = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${req.body.token}&grant_type=authorization_code&redirect_uri=http://localhost:8080`, config);
    let item = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${req.body.token}&grant_type=authorization_code&redirect_uri=http://localhost:8080`);
    console.log(item.data);
    // if (item.data.client_id === process.env.TWITCH_CLIENT_ID) {
    //   // get twitch user data for email
    //   const config2 = {
    //     params: {
    //       'id': item.data.user_id
    //     },
    //     headers: {
    //       'Authorization': `Bearer ${req.body.token}`,
    //       'Client-Id': process.env.TWITCH_CLIENT_ID
    //     }
    //   }
    //   let twitchUser = await axios.get('https://api.twitch.tv/helix/users', config2);
    //   const email = twitchUser.data.data[0].email

    //   // try to login
    //   const regex = new RegExp(['^', email, '$'].join(''), 'i');
    //   let user = await User.findOne({ email: regex });

    //   // if user doesnt exist then create account (route)
    //   if (!user) {
    //     let name;
    //     if (!item.data.login) {name = item.data.display_name} else {name = item.data.login};
    //     user = new User({
    //       email,
    //       name,
    //       authProvider: 'twitch',
    //       comemnts: [],
    //       likes: [],
    //     })
    //     await user.save();
    //   } 

    //   // get user token
    //   const payload = {
    //     user: {
    //       id: user.id,
    //     },
    //   };
    //   jwt.sign(payload, process.env.USER_SECRET, { expiresIn: '7d' }, (err, token) => {
    //     if (err) throw err;
    //     res.json({isAuth: true, ...item.data, token: req.body.token,})
    //   });

    // }
  } catch (err) {
    res.json(false)
    console.log(err.response.data);
  }
});

// // implicit flow 
// router.post('/user-auth', async (req, res) => {
//   const config = {
//     headers: {
//       'Authorization': `OAuth ${req.body.token}`
//     }
//   }


//   try {
//     let item = await axios.get('https://id.twitch.tv/oauth2/validate', config);
//     if (item.data.client_id === process.env.TWITCH_CLIENT_ID) {
//       // get twitch user data for email
//       const config2 = {
//         params: {
//           'id': item.data.user_id
//         },
//         headers: {
//           'Authorization': `Bearer ${req.body.token}`,
//           'Client-Id': process.env.TWITCH_CLIENT_ID
//         }
//       }
//       let twitchUser = await axios.get('https://api.twitch.tv/helix/users', config2);
//       const email = twitchUser.data.data[0].email

//       // try to login
//       const regex = new RegExp(['^', email, '$'].join(''), 'i');
//       let user = await User.findOne({ email: regex });

//       // if user doesnt exist then create account (route)
//       if (!user) {
//         let name;
//         if (!item.data.login) {name = item.data.display_name} else {name = item.data.login};
//         user = new User({
//           email,
//           name,
//           authProvider: 'twitch',
//           comemnts: [],
//           likes: [],
//         })
//         await user.save();
//       } 

//       // get user token
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };
//       jwt.sign(payload, process.env.USER_SECRET, { expiresIn: '7d' }, (err, token) => {
//         if (err) throw err;
//         res.json({isAuth: true, ...item.data, token: req.body.token,})
//       });

//     }
//   } catch (err) {
//     res.json(false)
//     console.log(err.message);
//   }
// });

module.exports = router;
