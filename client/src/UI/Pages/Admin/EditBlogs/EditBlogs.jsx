import React from 'react';
import './EditBlogs.scss';

import { Link } from 'react-router-dom';
import AdminBlogs from '../AdminBlogs/AdminBlogs.jsx';

const EditBlogs = () => {
  return (
    <div className='EditBlogs'>
      <div className='TitleBox2'>
        <div />
        <h2>Developer Blog</h2>
        <Link to='/admin/blogs-portal' className='Link'>
          <p>Back</p>
        </Link>
      </div>
      <div className='HeaderBtns'>
        <Link className='Link' to='/admin/blogs/update-blog-details'>
          <div className='Btn TagsBtn'>Update Tags & Categories</div>
        </Link>
        <Link className='Link' to='/admin/blogs/create-blog'>
          <div className='Btn'>Create Blog</div>
        </Link>
      </div>
      <AdminBlogs />
    </div>
  );
};

export default EditBlogs;
