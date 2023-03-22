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
  //     if (window.scrollY <= window.innerHeight) {
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
        <div className='Content'>
          <h1>WIND FISH</h1>
          <div className='Nav'>
            <p>Dev</p>
            <p>History</p>
            <p>Schedule</p>
            <p>Book Club</p>
            <p>Ideo-Form</p>
            <p>Profile</p>
            <p>Merch</p>
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
