import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import WindFishFavicon2 from '../../../images/WindFishFavicon2.png';
import { blogTypeChanged } from '../../../Redux/Blog/blogSlice';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
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

  const pathname = window.location.pathname.split('/');
  pathname.map((x) => {
    if (x == 'dev-blog') {
      dispatch(blogTypeChanged('dev'));
      // variables.cyanColor = `rgb(0, 255, 234)`;
    }
    if (x == 'history-blog') {
      dispatch(blogTypeChanged('history'));
      // variables.cyanColor = `rgb(185, 126, 67)`;
    }
  });

  if (nav) {
    return (
      <div className='Navbar'>
        <div className='Inner'>
          <Link to='/'>
            <h1>WIND FISH</h1>
          </Link>
          <div className='Nav'>
            <div className='Item Item-Dev'>
              <div className='DropOuter'>
                <Link
                  to='/dev-blog'
                  onClick={() => {
                    dispatch(blogTypeChanged('dev'));
                  }}
                >
                  <p>Dev</p>
                </Link>
                <div className='Drop'>
                  <p>fdsfds</p>
                  <p>fdsfds</p>
                  <p>fdsfds</p>
                </div>
              </div>
            </div>
            <div className='Item Item-History'>
              <div className='DropOuter'>
                <Link
                  to='/history-blog'
                  onClick={() => {
                    dispatch(blogTypeChanged('history'));
                  }}
                >
                  <p>History</p>
                </Link>
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
                <Link to='/portfolio'>
                  <p>Profile</p>
                </Link>
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
