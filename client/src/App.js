import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <div className='App-Content'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
