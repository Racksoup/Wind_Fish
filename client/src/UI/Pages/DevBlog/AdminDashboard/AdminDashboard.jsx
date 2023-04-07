import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import { loadUser, logout } from '../../../Redux/Actions/auth.js';
import AdminBlogs from './AdminBlogs/AdminBlogs';

import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = ({ isAuthenticated, logout, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  if (!isAuthenticated) return <Navigate to='/admin' />;

  return (
    <>
      <div className='AdminDashboard'>
        <div className='TitleBox'>
          <div />
          <div className='Title'>Admin Dashboard</div>
          <Link className='Link' to='/admin'>
            <div className='Btn' onClick={() => logout()}>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
  loadUser,
  logout,
})(AdminDashboard);
