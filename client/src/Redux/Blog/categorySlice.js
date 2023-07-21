import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
};

export const selectCategories = (state) => state.category.categories;

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryAdded: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    categoryDeleted: (state, action) => {
      state.categories = state.categories.filter((tag) => tag._id !== action.payload._id);
    },
    gotCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const addCategory = (category, blogType, file) => async (dispatch) => {
  let data = new FormData();
  if (file) {
    data.append('file', file);
  }
  data.append('category', category);
  data.append('blogType', blogType);
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  try {
    const res = await axios.post('/api/backend-blog/blog-category', data, config);
    dispatch(categoryAdded(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (category) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/backend-blog/blog-category/${category._id}`);
    dispatch(categoryDeleted(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = (blogType) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backend-blog/blog-category/${blogType}`);
    dispatch(gotCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const { categoryAdded, categoryDeleted, gotCategories } = categorySlice.actions;
export default categorySlice.reducer;
