import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './youtubeSlice';
import blogReducer from './Blog/blogSlice';
import tagReducer from './Blog/tagSlice';
import categoryReducer from './Blog/categorySlice';
import likesReducer from './Blog/likesSlice';
import commentsReducer from './Blog/commentsSlice';
import adminReducer from './Blog/adminSlice';

export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    blog: blogReducer,
    tag: tagReducer,
    category: categoryReducer,
    likes: likesReducer,
    comments: commentsReducer,
    admin: adminReducer,
  },
});
