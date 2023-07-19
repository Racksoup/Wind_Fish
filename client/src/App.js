import React from 'react';
import './App.scss';
import { store } from './Redux/store';
import Home from './UI/Pages/Home/Home.jsx';
import Portfolio from './UI/Pages/Portfolio/Portfolio.jsx';

import BlogHome from './UI/Pages/Blog/Pages/Home/BlogHome.jsx';
import About from './UI/Pages/Blog/Pages/About/About.jsx';
import Contact from './UI/Pages/Blog/Pages/Contact/Contact.jsx';
import SingleBlog from './UI/Pages/Blog/Pages/SingleBlog/SingleBlog.jsx';
import Blogs from './UI/Pages/Blog/Pages/Blogs/Blogs.jsx';
import Admin from './UI/Pages/Blog/Pages/Admin/Admin.jsx';
import Navbar from './UI/Components/Navbar/Navbar.jsx';
import AdminDashboard from './UI/Pages/Blog/Pages/AdminDashboard/AdminDashboard.jsx';
import CreateBlog from './UI/Pages/Blog/Pages/CreateBlog/CreateBlog.jsx';
import UpdateBlog from './UI/Pages/Blog/Pages/UpdateBlog/UpdateBlog.jsx';
import BlogDetails from './UI/Pages/Blog/Pages/BlogDetails/BlogDetails.jsx';

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
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/create-blog' element={<CreateBlog />} />
            <Route path='/update-blog' element={<UpdateBlog />} />
            <Route path='/update-blog-details' element={<BlogDetails />} />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
