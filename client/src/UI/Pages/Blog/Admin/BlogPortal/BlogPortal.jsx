import React from 'react';
import './BlogPortal.scss';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { blogTypeChanged } from '../../../../../Redux/Blog/blogSlice';

const BlogPortal = () => {
  const dispatch = useDispatch();
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
        <Link
          to='/admin/blogs'
          className='Link'
          onClick={() => {
            dispatch(blogTypeChanged('history'));
          }}
        >
          <p>History</p>
        </Link>
        <Link
          to='/admin/blogs'
          className='Link'
          onClick={() => {
            dispatch(blogTypeChanged('dev'));
          }}
        >
          <p>Developer</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogPortal;
