import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className='Home'>
      <div className='Content'>
        <div className='Top'>
          <div className='Section'>
            <div className='Videos'>
              <div className='Video Dev'></div>
              <div className='Video Dev'></div>
            </div>
            <div className='Blog Blog-Dev'></div>
          </div>
          <div className='Section'>
            <div className='Videos'>
              <div className='Video History'></div>
              <div className='Video History'></div>
            </div>
            <div className='Blog Blog-History'></div>
          </div>
        </div>
        <div className='Middle'>
          <div className='Section'></div>
          <div className='Section'></div>
          <div className='Section'></div>
        </div>
        <div className='Bottom'></div>
      </div>
    </div>
  );
};

export default Home;
