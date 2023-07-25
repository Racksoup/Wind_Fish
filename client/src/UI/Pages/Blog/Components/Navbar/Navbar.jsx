import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import useWindowDimensions from '../../useWindowDimensions.js';
import { selectCategories, getCategories } from '../../../../../Redux/Blog/categorySlice';
import { searchBlogs, getAllBlogs, selectBlogType } from '../../../../../Redux/Blog/blogSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faHamburger, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const blogType = useSelector(selectBlogType);
  const { width, height } = useWindowDimensions();
  const screen = window.location.pathname;
  const categories = useSelector(selectCategories);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const searchChange = (e) => {
    setSearchText(e.target.value);
  };
  const searchKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(searchBlogs(searchText));
      setSearched(true);
    }
  };

  return (
    <div className='Blog-Navbar'>
      {searched && <Navigate to={`/${blogType}-blog/blogs`} />}
      <div className='BottomBar'>
        <div className='Left'></div>
        <div className='Center'>
          {screen === 'home' ? (
            <div className='LinkTextActive'>Home</div>
          ) : (
            <Link className='Link' to={`/${blogType}-blog`}>
              <div className={`${blogType == 'dev' ? 'LinkText-Dev' : 'LinkText-History'}`}>
                Home
              </div>
            </Link>
          )}

          <div
            className={`${
              blogType == 'dev' ? 'LinkText-Dev Dropdown' : 'LinkText-History Dropdown'
            }`}
          >
            Categories
            <div className='DropdownBox'>
              {categories.map((cat, i) => {
                return (
                  <Link className='Link' to={`/${blogType}-blog/blogs`} key={i}>
                    <div
                      className={`${blogType == 'dev' ? 'DropLink-Dev' : 'DropLink-History'}`}
                      onClick={() => dispatch(searchBlogs(cat.category))}
                    >
                      {cat.category}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {screen === 'about' ? (
            <div className='LinkTextActive'>About</div>
          ) : (
            <Link className='Link' to={`/${blogType}-blog/about`}>
              <div className={`${blogType == 'dev' ? 'LinkText-Dev' : 'LinkText-History'}`}>
                About
              </div>
            </Link>
          )}

          <Link className='Link' to={`/${blogType}-blog/blogs`}>
            <div
              className={`${blogType == 'dev' ? 'LinkText-Dev' : 'LinkText-History'}`}
              onClick={() => dispatch(getAllBlogs(blogType))}
            >
              Recent Blogs
            </div>
          </Link>

          {screen === 'contact' ? (
            <div className='LinkTextActive'>Contact</div>
          ) : (
            <Link className='Link' to={`/${blogType}-blog/contact`}>
              <div className={`${blogType == 'dev' ? 'LinkText-Dev' : 'LinkText-History'}`}>
                Contact
              </div>
            </Link>
          )}
        </div>
        <div className='Right'>
          <div className='SearchBox'>
            <div className='search'>
              <div className={`${blogType == 'dev' ? 'Inner-Dev' : 'Inner-History'}`}>
                <input
                  type='text'
                  className={`${blogType == 'dev' ? 'SearchInput-Dev' : 'SearchInput-History'}`}
                  value={searchText}
                  placeholder='Search'
                  onChange={(e) => searchChange(e)}
                  onKeyDown={(e) => searchKeyDown(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
