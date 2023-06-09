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
import Navbar from './UI/Components/Navbar/Navbar.jsx';

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
          </Routes>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
