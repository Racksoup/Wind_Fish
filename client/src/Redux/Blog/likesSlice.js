import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { updatedUser } from '../userSlice';

const initialState = {
  blogLikes: null,
  allBlogLikes: null,
};

export const selectBlogLikes = (state) => state.likes.blogLikes;
export const selectAllBlogLikes = (state) => state.likes.allBlogLikes;

export const tagSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    gotAllBlogLikes: (state, action) => {
      state.allBlogLikes = action.payload;
    },
    createdBlogLikes: (state, action) => {
      state.blogLikes = action.payload;
    },
    gotBlogLikes: (state, action) => {
      state.blogLikes = action.payload;
    },
    updatedBlogLikes: (state, action) => {
      state.blogLikes = action.payload;
    },
    deletedBlogLikes: (state, action) => {
      state.blogLikes = {};
    },
  },
});

export const deleteAccountLikes = () => async (dispatch) => {
  try {
    await axios.delete(`/api/backend-blog/likes/user`);
    dispatch(deletedBlogLikes());
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogLikes = (blogIDs) => async (dispatch) => {
  try {
    let reses = blogIDs.map((id) => {
      return axios.get(`/api/backend-blog/likes/${id}`);
    });

    let myData = await Promise.all(reses);
    let data = myData.map((res) => {
      return res.data;
    });

    dispatch(gotAllBlogLikes(data));
  } catch (error) {
    console.log(error);
  }
};

export const createBlogLikes = (blogId, blogName) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId, blogName });

  try {
    const res = await axios.post('/api/backend-blog/likes', body, config);
    dispatch(createdBlogLikes(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getBlogLikes = (blogId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backend-blog/likes/${blogId}`);
    dispatch(gotBlogLikes(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const toggleLike = (blogId) => async (dispatch) => {
  try {
    dispatch(updateBlogLikes(blogId));
    dispatch(updateUserLikes(blogId));
  } catch (error) {
    console.log(error);
  }
};

export const updateBlogLikes = (blogId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId });

  try {
    const res = await axios.put('/api/backend-blog/likes', body, config);
    dispatch(updatedBlogLikes(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUserLikes = (blogId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId });

  try {
    const res = await axios.put('/api/backend-blog/likes/user', body, config);
    dispatch(updatedUser(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBlogLikes = (blogId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/backend-blog/likes/${blogId}`);
    dispatch(deletedBlogLikes(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const {
  gotAllBlogLikes,
  createdBlogLikes,
  gotBlogLikes,
  updatedBlogLikes,
  deletedBlogLikes,
} = tagSlice.actions;
export default tagSlice.reducer;
