const auth = require('../../middleware/userAuth');
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
  try {
    let item = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${req.body.code}&grant_type=authorization_code&redirect_uri=http://localhost:8080`);
    // get twitch user data for email
    const config = {
      params: {
        'id': item.data.user_id
      },
      headers: {
        'Authorization': `Bearer ${item.data.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    }
    let twitchUser = await axios.get('https://api.twitch.tv/helix/users', config);
    const email = twitchUser.data.data[0].email

    // try to login
    const regex = new RegExp(['^', email, '$'].join(''), 'i');
    let user = await User.findOne({ email: regex });

    // if user exist update token
    if (user) {
      let newUser = await User.findOneAndUpdate({ '_id': user._id }, {$set: {token: item.data}}, {new: true});

    } else {
      // if user doesnt exist then create account (route)
      let name;
      if (!item.data.login) {name = item.data.display_name} else {name = item.data.login};
      user = new User({
        email,
        name,
        authProvider: 'twitch',
        comments: [],
        likes: [],
        token: item.data
      })
      await user.save();
    } 

    // get user token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.USER_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json(token)
    });

  } catch (err) {
    console.log(err.message);
  }
});

// revoke twitch token
router.post('/logout', auth, async (req, res) => {
  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$set: {token: null}})

    const logout = await axios.post(`https://id.twitch.tv/oauth2/revoke?client_id=${process.env.TWITCH_CLIENT_ID}&token=${user.data.token}`)
    console.log(logout.data);
  } catch (error) {
    console.log(error.message);
  }
})

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
