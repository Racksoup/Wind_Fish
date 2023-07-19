import React, { useState, useEffect } from 'react';
import './AdminBlogs.scss';
// import { getAllBlogs, removeBlog, setCurrBlog } from '../../../../Redux/Actions/blogs.js';
import {
  selectBlogs,
  getAllBlogs,
  removeBlog,
  setCurrBlog,
} from '../../../../../../Redux/Blog/blogSlice';
import DeleteModal from '../Modal/DeleteModal.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminBlogs = (
  {
    // blogs, getAllBlogs, removeBlog, setCurrBlog
  }
) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const [thisBlog, setThisBlog] = useState('');
  const [modal, toggleModal] = useState(false);
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const delClicked = (blog) => {
    setThisBlog(blog);
    toggleModal(true);
  };
  //removeBlog(blog)

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
            <img className='Img' alt='dick' src={`api/blogs/image/${blog.image_filename}`} />
            <div className='Info'>
              <div className='BlogTitle'>Title: {blog.title}</div>
              <div className='Category'>Category: {blog.category}</div>
              <div className='Poster'>Poster: {blog.poster}</div>
              {blog.favorite && <div className='Favorite'>Fav</div>}
            </div>
            <div className='Btns'>
              <Link to='/update-blog' className='Link'>
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
