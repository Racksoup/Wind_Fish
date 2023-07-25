import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import WindFishFavicon2 from '../../../images/WindFishFavicon2.png';
import { blogTypeChanged } from '../../../Redux/Blog/blogSlice';

import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const [nav, toggleNav] = useState(true);

  const pathname = window.location.pathname.split('/');
  pathname.map((x) => {
    if (x == 'dev-blog') {
      dispatch(blogTypeChanged('dev'));
    }
    if (x == 'history-blog') {
      dispatch(blogTypeChanged('history'));
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
          <div className='hamburger'>
            <div className='DropOuter'>
              <FontAwesomeIcon icon={faHamburger} className='icon'></FontAwesomeIcon>
              <div className='Drop Drop-hamburger'>
                <Link
                  to='/dev-blog'
                  onClick={() => {
                    dispatch(blogTypeChanged('dev'));
                  }}
                >
                  <p>Dev</p>
                </Link>
                <Link
                  to='/history-blog'
                  onClick={() => {
                    dispatch(blogTypeChanged('history'));
                  }}
                >
                  <p>History</p>
                </Link>
                <Link to='/schedule'>
                  <p>Schedule</p>
                </Link>
                <Link to='/bookclub'>
                  <p>Book Club</p>
                </Link>
                <Link to='/contests'>
                  <p>Code Contests</p>
                </Link>
                <Link to='/profile'>
                  <p>Profile</p>
                </Link>
                <Link to='/merch'>
                  <p>Merch</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Navbar;
