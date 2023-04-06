import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';
import Portfolio from './UI/Pages/Portfolio/Portfolio.jsx';
import { store } from './Redux/store';

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
          </Routes>
        </Provider>
      </div>
    </Router>
  );
};

export default App;
