import React, { useEffect } from 'react';
import './AdminDashboard.scss';
import { loadUser, logout, selectIsAuthenticated } from '../../../Redux/adminSlice.js';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (!isAuthenticated) return <Navigate to='/login-admin' />;

  return (
    <>
      <div className='AdminDashboard'>
        <div className='TitleBox'>
          <div />
          <h2 className='Title'>Admin Dashboard</h2>
          <Link className='Link' to='/login-admin'>
            <div className='Btn' onClick={() => dispatch(logout())}>
              Logout
            </div>
          </Link>
        </div>
        <div className='Selection'>
          <Link to='/admin/blogs-portal' className='Link'>
            <p>Blogs</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
