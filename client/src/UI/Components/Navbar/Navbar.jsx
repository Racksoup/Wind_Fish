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
          <div className='Group'>
            <div className='EndNav'>
              <button className='Login'>Login</button>
              <button className='Stream'></button>
            </div>
            <ul className='menu'>
              <li>
                <FontAwesomeIcon icon={faHamburger} className='icon'></FontAwesomeIcon>
                <ul className='submenu'>
                  <li>
                    <Link to='/dev-blog' className='link'>
                      Dev
                    </Link>
                    <ul className='submenu2'>
                      <li>
                        <Link to='/dev-blog' className='link'>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to='/dev-blog/blogs' className='link'>
                          Recent Blogs
                        </Link>
                      </li>
                      <li>
                        <Link to='/dev-blog/about' className='link'>
                          About
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to='/history-blog' className='link'>
                      History
                    </Link>
                    <ul className='submenu2'>
                      <li>
                        <Link to='/history-blog' className='link'>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to='/history-blog/blogs' className='link'>
                          Recent Blogs
                        </Link>
                      </li>
                      <li>
                        <Link to='/history-blog/about' className='link'>
                          About
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Navbar;
