import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';
import Admin from './UI/Pages/Admin/Admin.jsx';
import AdminDashboard from './UI/Pages/AdminDashboard/AdminDashboard.jsx';
import CreateBlog from './UI/Pages/CreateBlog/CreateBlog.jsx';
import UpdateBlog from './UI/Pages/UpdateBlog/UpdateBlog.jsx';
import About from './UI/Pages/About/About.jsx';
import Contact from './UI/Pages/Contact/Contact.jsx';
import SingleBlog from './UI/Pages/SingleBlog/SingleBlog.jsx';
import BlogDetails from './UI/Pages/BlogDetails/BlogDetails.jsx';
import Blogs from './UI/Pages/Blogs/Blogs.jsx';
import Login from './UI/Pages/Login/Login.jsx';
import Dashboard from './UI/Pages/Dashboard/Dashboard.jsx';
import CreateAccount from './UI/Pages/CreateAccount/CreateAccount.jsx';
import PasswordReset from './UI/Pages/PasswordReset/PasswordReset.jsx';

import { Route, Routes } from 'react-router-dom';

const Base = () => {
  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
        <Route exact path='/create-blog' element={<CreateBlog />} />
        <Route exact path='/update-blog' element={<UpdateBlog />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/update-blog-details' element={<BlogDetails />} />
        <Route exact path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/create-account' element={<CreateAccount />} />
        <Route exact path='/password-reset' element={<PasswordReset />} />
      </Routes>
    </div>
  );
};

export default Base;
