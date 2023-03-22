import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';
import Navbar from './UI/Components/Navbar/Navbar.jsx';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
