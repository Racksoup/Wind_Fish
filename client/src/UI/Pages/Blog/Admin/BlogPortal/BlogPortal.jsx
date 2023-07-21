import React from 'react';
import './BlogPortal.scss';

import { Link } from 'react-router-dom';

const BlogPortal = () => {
  return (
    <div className='BlogPortal'>
      <div className='TitleBox2'>
        <div />
        <h2>Choose Blog</h2>
        <Link to='/admin' className='Link'>
          <p>Back</p>
        </Link>
      </div>
      <div className='Selection'>
        <Link to='/admin/blogs' className='Link'>
          <p>History</p>
        </Link>
        <Link to='/admin/blogs' className='Link'>
          <p>Developer</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogPortal;
