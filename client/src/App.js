import React from 'react';
import './App.scss';
import { store } from './Redux/store';
import Home from './UI/Pages/Home/Home.jsx';
import Portfolio from './UI/Pages/Portfolio/Portfolio.jsx';
import BlogHome from './UI/Pages/Blog/Dev/Home/BlogHome.jsx';
import About from './UI/Pages/Blog/Dev/About/About.jsx';
import Contact from './UI/Pages/Blog/Dev/Contact/Contact.jsx';
import SingleBlog from './UI/Pages/Blog/Dev/SingleBlog/SingleBlog.jsx';
import Blogs from './UI/Pages/Blog/Dev/Blogs/Blogs.jsx';
import Navbar from './UI/Components/Navbar/Navbar.jsx';
import LoginAdmin from './UI/Pages/Admin/LoginAdmin/LoginAdmin.jsx';
import AdminDashboard from './UI/Pages/Admin/AdminDashboard.jsx';
import CreateBlog from './UI/Pages/Admin/CreateBlog/CreateBlog.jsx';
import UpdateBlog from './UI/Pages/Admin/UpdateBlog/UpdateBlog.jsx';
import BlogDetails from './UI/Pages/Admin/BlogDetails/BlogDetails.jsx';
import EditBlogs from './UI/Pages/Admin/EditBlogs/EditBlogs.jsx';
import BlogPortal from './UI/Pages/Admin/BlogPortal/BlogPortal.jsx';

import { Provider } from 'react-redux';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/dev-blog' element={<BlogHome />} />
            <Route path='/dev-blog/single-blog/:id' element={<SingleBlog />} />
            <Route path='/dev-blog/blogs' element={<Blogs />} />
            <Route path='/dev-blog/about' element={<About />} />
            <Route path='/dev-blog/contact' element={<Contact />} />
            <Route path='/history-blog' element={<BlogHome />} />
            <Route path='/history-blog/single-blog/:id' element={<SingleBlog />} />
            <Route path='/history-blog/blogs' element={<Blogs />} />
            <Route path='/history-blog/about' element={<About />} />
            <Route path='/history-blog/contact' element={<Contact />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/login-admin' element={<LoginAdmin />} />
            <Route path='/admin/blogs' element={<EditBlogs />} />
            <Route path='/admin/blogs-portal' element={<BlogPortal />} />
            <Route path='/admin/blogs/create-blog' element={<CreateBlog />} />
            <Route path='/admin/blogs/update-blog' element={<UpdateBlog />} />
            <Route path='/admin/blogs/update-blog-details' element={<BlogDetails />} />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
