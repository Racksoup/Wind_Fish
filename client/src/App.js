import React from 'react';
import './App.scss';
import { store } from './Redux/store';
import Home from './UI/Pages/Home/Home.jsx';
import Portfolio from './UI/Pages/Portfolio/Portfolio.jsx';

import DevBlog from './UI/Pages/DevBlog/Home/DevBlog.jsx';
import SingleBlog from './UI/Pages/DevBlog/SingleBlog/SingleBlog.jsx';

import { Provider } from 'react-redux';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<Portfolio />} />

            <Route path='/dev-blog' element={<DevBlog />} />
            <Route path='/dev-blog/single-blog/:id' element={<SingleBlog />} />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
