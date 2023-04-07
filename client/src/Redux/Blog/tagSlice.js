import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tags: [],
};

export const selectTags = (state) => state.tag.tags;

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    tagAdded: (state, action) => {
      state.tags = [...state.tags, action.payload];
    },
    tagDeleted: (state, action) => {
      state.tags = state.tags.filter((tag) => tag._id !== action.payload._id);
    },
    gotTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const addTag = (tag) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ tag });

  try {
    const res = await axios.post('/api/backend-blog/tag', body, config);
    dispatch(tagAdded(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteTag = (tag) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/backend-blog/tag/${tag._id}`);
    dispatch(tagDeleted(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/backend-blog/tag');
    dispatch(gotTags(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const { tagAdded, tagDeleted, gotTags } = tagSlice.actions;
export default tagSlice.reducer;
