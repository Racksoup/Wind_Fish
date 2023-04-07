import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  blogComments: null,
  allBlogComments: [],
};

export const selectBlogComments = (state) => state.comments.blogComments;
export const selectAllBlogComments = (state) => state.comments.allBlogComments;

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    gotAllBlogComments: (state, action) => {
      state.allBlogComments = action.payload;
    },
    createdBlogComments: (state, action) => {
      state.blogComments = action.payload;
    },
    gotBlogComments: (state, action) => {
      state.blogComments = action.payload;
    },
    updatedBlogComments: (state, action) => {
      state.blogComments = action.payload;
      state.allBlogComments = [
        ...state.allBlogComments.filter(
          (blogComments) => blogComments.blogId !== action.payload.blogId
        ),
        action.payload,
      ];
    },
    deletedBlogComments: (state, action) => {
      state.blogComments = {};
    },
  },
});

export const deleteAccountComments = () => async (dispatch) => {
  try {
    await axios.delete(`api/backend-blog/comments/account`);
    dispatch(deletedBlogComments());
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogComments = (blogIDs) => async (dispatch) => {
  try {
    let reses = blogIDs.map((id, i) => {
      return axios.get(`/api/backend-blog/comments/${id}`);
    });

    let myData = await Promise.all(reses);
    let data = myData.map((res) => {
      return res.data;
    });

    dispatch(gotAllBlogComments(data));
  } catch (error) {
    console.log(error);
  }
};

export const createBlogComments = (blogId, blogName) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId, blogName });

  try {
    const res = await axios.post('/api/backend-blog/comments', body, config);
    dispatch(createdBlogComments(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getBlogComments = (blogId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backend-blog/comments/${blogId}`);
    dispatch(gotBlogComments(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateBlogComments = (blogId, commentText, accountName) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId, commentText, accountName });

  try {
    const res = await axios.put('/api/backend-blog/comments', body, config);
    dispatch(updateBlogComments(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = (blogId) => async (dispatch) => {
  try {
    dispatch(removeBlogIDFromAccountComments(blogId));
    dispatch(removeCommentFromBlogComments(blogId));
  } catch (error) {
    console.log(error);
  }
};

export const removeCommentFromBlogComments = (blogId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId });

  try {
    const res = await axios.put('/api/backend-blog/comments/remove-blog-comment', body, config);
    dispatch(updateBlogComments(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const removeBlogIDFromAccountComments = (blogId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ blogId });

  try {
    const res = await axios.put('/api/backend-blog/comments/remove-account-comment', body, config);
    // dispatch({ type: ACCOUNT_LOADED, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogComments = (blogId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/backend-blog/comments/${blogId}/${accountID}`);
    dispatch(deletedBlogComments(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const {
  gotAllBlogComments,
  createdBlogComments,
  gotBlogComments,
  updatedBlogComments,
  deletedBlogComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;
