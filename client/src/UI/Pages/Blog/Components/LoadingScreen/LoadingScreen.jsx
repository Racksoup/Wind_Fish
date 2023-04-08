import React from 'react';
import './LoadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className='LoadingScreen'>
      <div className='App-Background'></div>
      <div className='center'>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
