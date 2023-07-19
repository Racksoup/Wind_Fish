import React, { useEffect } from 'react';
import './AdminDashboard.scss';
import { loadUser, logout, selectIsAuthenticated } from '../../../../../Redux/Blog/adminSlice.js';
import AdminBlogs from './AdminBlogs/AdminBlogs.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (!isAuthenticated) return <Navigate to='/admin' />;

  return (
    <>
      {console.log('here')}
      <div className='AdminDashboard'>
        <div className='TitleBox'>
          <div />
          <div className='Title'>Admin Dashboard</div>
          <Link className='Link' to='/admin'>
            <div className='Btn' onClick={() => dispatch(logout())}>
              Logout
            </div>
          </Link>
        </div>
        <div className='HeaderBtns'>
          <Link className='Link' to='/update-blog-details'>
            <div className='Btn TagsBtn'>Update Tags & Categories</div>
          </Link>
          <Link className='Link' to='/create-blog'>
            <div className='Btn'>Create Blog</div>
          </Link>
        </div>
        <AdminBlogs />
      </div>
    </>
  );
};

export default AdminDashboard;
