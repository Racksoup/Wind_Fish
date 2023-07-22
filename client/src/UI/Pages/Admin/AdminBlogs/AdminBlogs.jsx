import React, { useState, useEffect } from 'react';
import './AdminBlogs.scss';
import {
  selectBlogs,
  selectBlogType,
  getAllBlogs,
  removeBlog,
  setCurrBlog,
} from '../../../../Redux/Blog/blogSlice';
import DeleteModal from '../Modal/DeleteModal.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const blogType = useSelector(selectBlogType);
  const [thisBlog, setThisBlog] = useState('');
  const [modal, toggleModal] = useState(false);
  useEffect(() => {
    dispatch(getAllBlogs(blogType));
  }, []);

  const delClicked = (blog) => {
    setThisBlog(blog);
    toggleModal(true);
  };

  if (blogs) {
    return (
      <div className='AdminBlogs' key='AdminBlogs'>
        {modal && (
          <DeleteModal
            toggleModal={toggleModal}
            Func={removeBlog}
            State={thisBlog}
            title='Delete Blog?'
          />
        )}
        <div className='Title'>Blogs</div>
        {blogs.map((blog) => (
          <div className='Blog' key={blog._id}>
            <img
              className='Img'
              alt='dick'
              src={`/api/backend-blog/blogs/image/${blog.image_filename}`}
            />
            <div className='Info'>
              <h3 className='BlogTitle'>Title: {blog.title}</h3>
              <p className='Category'>Category: {blog.category}</p>
              <p className='Poster'>Poster: {blog.poster}</p>
              {blog.favorite && <div className='Favorite'>Fav</div>}
            </div>
            <div className='Btns'>
              <Link to='/admin/blogs/update-blog' className='Link'>
                <div className='Btn' onClick={() => dispatch(setCurrBlog(blog))}>
                  Update
                </div>
              </Link>
              <div className='Btn Btn-Delete' onClick={() => delClicked(blog)}>
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default AdminBlogs;
