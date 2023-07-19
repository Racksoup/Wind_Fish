import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { createBlogLikes, deleteBlogLikes } from './likesSlice';
import { createBlogComments, deleteBlogComments } from './commentsSlice';

const initialState = {
  recentBlogs: [],
  blogs: null,
  blog: null,
  searchedBlogs: null,
  contentImages: null,
  contentImagesLoaded: false,
};

export const selectRecentBlogs = (state) => state.blog.recentBlogs;
export const selectBlogs = (state) => state.blog.blogs;
export const selectBlog = (state) => state.blog.blog;
export const selectSearchedBlogs = (state) => state.blog.searchedBlogs;
export const selectContentImages = (state) => state.blog.contentImages;
export const selectContentImagesLoaded = (state) => state.blog.contentImagesLoaded;

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    gotRecentBlogs: (state, action) => {
      state.recentBlogs = action.payload;
    },
    gotSearch: (state, action) => {
      state.blogs = [...action.payload[0], ...action.payload[1], ...action.payload[2]];
    },
    updatedContentImage: (state, action) => {
      state.contentImages = state.contentImages.map((img) => {
        if (img._id !== action.payload._id) {
          return img;
        } else {
          return action.payload;
        }
      });
    },
    createdContentImage: (state, action) => {
      state.contentImages = [...state.contentImages, action.payload];
    },
    deletedContentImages: (state, action) => {
      state.contentImages = state.contentImages.filter(
        (img) => img.filename !== action.payload[0].filename
      );
    },
    gotBlogImages: (state, action) => {
      state.contentImages = action.payload;
      state.contentImagesLoaded = true;
    },
    gotAllBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    updatedBlog: (state, action) => {
      state.blogs = [
        ...state.blogs.filter((item) => item._id !== action.payload._id),
        action.payload,
      ];
    },
    gotCurrentBlog: (state, action) => {
      state.blog = action.payload;
      state.contentImagesLoaded = false;
    },
    removedBlog: (state, aciton) => {
      state.blogs = state.blogs.filter((item) => item._id !== action.payload._id);
    },
    createdBlog: (state, action) => {
      state.blogs = [...state.blogs, action.payload];
    },
    gotOneBlog: (state, action) => {
      state.blog = action.payload;
    },
    gotThreeBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    hasSetCurrBlog: (state, action) => {
      state.blog = action.payload;
      state.contentImagesLoaded = false;
    },
  },
});

export const getThreeBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get('api/backend-blog/blogs/get-three');
    dispatch(gotThreeBlogs(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getRecentBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/backend-blog/blogs/recent-blogs');
    dispatch(gotRecentBlogs(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentBlog = (blog) => (dispatch) => {
  localStorage.setItem('blogID', blog._id);
  dispatch(gotCurrentBlog(blog));
};

export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/backend-blog/blogs/');
    dispatch(gotAllBlogs(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getCurrBlog = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backend-blog/blogs/${localStorage.blogID}`);
    dispatch(getBlogImages(localStorage.blogID));
    dispatch(gotOneBlog(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getSingleBlog = (blogID) => async (dispatch) => {
  try {
    let res;
    res = await axios.get(`/api/backend-blog/blogs/${blogID}`);
    localStorage.setItem('blogID', blogID);
    // if (!localStorage.blogID) {
    // } else {
    //   res = await axios.get(`/api/backend-blog/blogs/${localStorage.blogID}`);
    // }

    dispatch(getBlogImages(localStorage.blogID));
    dispatch(gotOneBlog(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = (item, file) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let data = new FormData();
    Object.entries(item).map((k) => {
      if (k[0] === 'text' || k[0] === 'tags') {
        data.append(k[0], JSON.stringify(k[1]));
      } else {
        data.append(k[0], k[1]);
      }
    });

    if (file !== '' && file !== null && file !== undefined) {
      data.append('file', file);
      config = {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      };
    }
    const res = await axios.put(`/api/backend-blog/blogs/${item._id}`, data, config);
    dispatch(updatedBlog(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const removeBlog = (item) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/backend-blog/blogs/${item._id}`);
    dispatch(deleteBlogLikes(item._id));
    dispatch(deleteBlogComments(item._id));
    dispatch(removeBlog(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const createBlog = (item, file, files) => async (dispatch) => {
  let data = new FormData();
  data.append('title', item.title);
  data.append('text', JSON.stringify(item.text));
  data.append('category', item.category);
  data.append('poster', item.poster);
  data.append('date', item.date);
  data.append('favorite', item.favorite);
  data.append('tags', JSON.stringify(item.tags));
  if (file) {
    data.append('link', item.link);
    data.append('caption', item.caption);
    data.append('file', file);
  }

  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = await axios.post('api/backend-blog/blogs', data, config);
    dispatch(createContentImages(files, res.data));
    dispatch(createBlogLikes(res.data._id, res.data.title));
    dispatch(createBlogComments(res.data._id, res.data.title));
    dispatch(createBlog(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const createContentImages = (files, blog) => async (dispatch) => {
  let data = new FormData();
  if (files) {
    files.map((v) => {
      data.append('link', v.link);
      data.append('caption', v.caption);
      data.append('file', v.file, v.name);
    });
  }
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  try {
    await axios.post(`api/backend-blog/blogs/content-images/${blog._id}`, data, config);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogImages = (blogID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backend-blog/blogs/content-images/data/${blogID}`);
    dispatch(gotBlogImages(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteContentImage = (img) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/backend-blog/blogs/content-image/${img.filename}`);
    dispatch(deletedContentImages(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const createContentImage = (img, name, blogID, link, caption) => async (dispatch) => {
  let data = new FormData();

  data.append('link', link);
  data.append('caption', caption);
  data.append('file', img, name);

  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  try {
    const res = await axios.post(`/api/backend-blog/blogs/content-image/${blogID}`, data, config);
    dispatch(createdContentImage(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateImageName = (img, name, blogID, link, caption) => async (dispatch) => {
  let data = new FormData();
  data.append('name', name);
  data.append('blogID', blogID);
  data.append('link', link);
  data.append('caption', caption);
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  try {
    const res = await axios.put(
      `/api/backend-blog/blogs/content-image/${img.filename}/${name}/${blogID}`,
      data,
      config
    );
    dispatch(updatedContentImage(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const searchBlogs = (search) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backend-blog/blogs/search/${search}`);
    dispatch(gotSearch(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const setCurrBlog = (blog) => (dispatch) => {
  localStorage.setItem('blogID', blog._id);
  dispatch(blogSet(res.data));
};

export const {
  gotRecentBlogs,
  gotSearch,
  updatedContentImage,
  createdContentImage,
  deletedContentImages,
  gotBlogImages,
  gotAllBlogs,
  updatedBlog,
  gotCurrentBlog,
  removedBlog,
  createdBlog,
  gotOneBlog,
  gotThreeBlogs,
} = blogSlice.actions;
export default blogSlice.reducer;
