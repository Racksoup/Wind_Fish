import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import WindFishFavicon2 from '../../../images/WindFishFavicon2.png';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, toggleNav] = useState(true);

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     if (window.scrollY > window.innerHeight) {
  //       toggleNav(true);
  //     }
  //     if (
  //       window.scrollY <= window.innerHeight &&
  //       window.location.href !== 'http://localhost:8080/'
  //     ) {
  //       toggleNav(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  if (nav) {
    return (
      <div className='Navbar'>
        <div className='Inner'>
          <h1>WIND FISH</h1>
          <div className='Nav'>
            <div className='Item Item-Dev'>
              <div className='DropOuter'>
                <p>Dev</p>
                <div className='Drop'>
                  <p>fdsfds</p>
                  <p>fdsfds</p>
                  <p>fdsfds</p>
                </div>
              </div>
            </div>
            <div className='Item Item-History'>
              <div className='DropOuter'>
                <p>History</p>
                <div className='Drop'>
                  <p>fdsfds</p>
                  <p>fdsfds</p>
                  <p>fdsfds</p>
                </div>
              </div>
            </div>
            <div className='Item'>
              <p>Schedule</p>
            </div>
            <div className='Item'>
              <p>Book Club</p>
            </div>
            <div className='Item'>
              <p>Code Contests</p>
            </div>
            <div className='Item Item-Profile'>
              <div className='DropOuter'>
                <p>Profile</p>
                <div className='Drop'>
                  <p>Ideo-Form</p>
                </div>
              </div>
            </div>
            <div className='Item'>
              <p>Merch</p>
            </div>
          </div>
          <div className='EndNav'>
            <button className='Login'>Login</button>
            <button className='Stream'></button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Navbar;
