const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const ip = require('ip');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extend: false }));

// routes
app.use('/api/youtubev3', require('./routes/api/youtubev3'));
app.use('/api/backend-blog/blogs', require('./routes/api/blog/blogs'));
app.use('/api/backend-blog/tag', require('./routes/api/blog/tag'));
app.use('/api/backend-blog/blog-category', require('./routes/api/blog/blogCategory'));
// app.use('/api/backend-blog/accounts', require('./routes/api/blog/accounts'));
app.use('/api/backend-blog/likes', require('./routes/api/blog/likes'));
app.use('/api/backend-blog/comments', require('./routes/api/blog/comments'));
app.use('/api/backend/admin', require('./routes/api/admin'));
app.use('/api/twitch', require('./routes/api/twitch'));
app.use('/api/user', require('./routes/api/user'));
// app.use('/api/backend-blog/mailing', require('./routes/api/blog/mailing'));

// app.use(express.static(path.join(__dirname, './routes/api/blog/blogs/image')));

// production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// get twitch auth
const twitchLoop = () => {
  axios.post(`http://0.0.0.0:${PORT}/api/twitch/auth`)
  setTimeout(() => {
    twitchLoop()
  }, 86400000)
}
twitchLoop()