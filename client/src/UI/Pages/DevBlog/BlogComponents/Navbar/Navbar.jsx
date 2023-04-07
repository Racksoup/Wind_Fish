import React, { useEffect, useState } from 'react';
import './Navbar.scss';
// import { searchBlogs, getAllBlogs } from '../../../Redux/Actions/blogs';
// import { getCategories } from '../../../Redux/Actions/blogCategory';
import useWindowDimensions from '../../useWindowDimensions.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faHamburger, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Navbar = ({ screen, categories, searchBlogs, getCategories, getAllBlogs }) => {
  useEffect(() => {
    getCategories();
  }, []);

  const { width, height } = useWindowDimensions();
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState('');

  const searchChange = (e) => {
    setSearchText(e.target.value);
  };
  const searchKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchBlogs(searchText);
      setSearched(true);
    }
  };

  if (width > 767) {
    return (
      <div className='Blog-Navbar'>
        {searched && <Navigate to='/blogs' />}
        <div className='TopBar'>
          <div className='SocialLinks'>
            <a className='SocialLink Twitter' href='https://twitter.com/MrKruger16' target='_blank'>
              <FontAwesomeIcon icon={faTwitter} className='Icon' />
            </a>
            <a
              className='SocialLink Facebook'
              href='https://www.facebook.com/connor.rack/'
              target='_blank'
            >
              <FontAwesomeIcon icon={faFacebook} className='Icon' />
            </a>
            <a
              className='SocialLink Github'
              href='https://github.com/Racksoup?tab=repositories'
              target='_blank'
            >
              <FontAwesomeIcon icon={faGithub} className='Icon' />
            </a>
          </div>
          <Link to='/' className='Link'>
            <div className='Title'>Software Dev</div>
          </Link>
          <div className='SearchBox'>
            <div className='search'>
              <div>
                <input
                  type='text'
                  value={searchText}
                  placeholder='Search'
                  onChange={(e) => searchChange(e)}
                  onKeyDown={(e) => searchKeyDown(e)}
                />
              </div>
            </div>
            <Link to='/login' className='AccountLink'>
              <FontAwesomeIcon icon={faUser} className='Icon' />
            </Link>
          </div>
        </div>
        <div className='BottomBar'>
          {screen === 'home' ? (
            <div className='LinkTextActive'>Home</div>
          ) : (
            <Link className='Link' to='/'>
              <div className='LinkText'>Home</div>
            </Link>
          )}

          <div className='Dropdown LinkText'>
            Categories
            <div className='DropdownBox'>
              {categories.map((cat, i) => {
                return (
                  <Link className='Link' to='/blogs' key={i}>
                    <div className='DropLink' onClick={() => searchBlogs(cat.category)}>
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
            <Link className='Link' to='/about'>
              <div className='LinkText'>About</div>
            </Link>
          )}

          <Link className='Link' to='/blogs'>
            <div className='LinkText' onClick={() => getAllBlogs()}>
              Recent Blogs
            </div>
          </Link>

          {screen === 'contact' ? (
            <div className='LinkTextActive'>Contact</div>
          ) : (
            <Link className='Link' to='/contact'>
              <div className='LinkText'>Contact</div>
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (width <= 767) {
    return (
      <div className='Navbar'>
        {searched && <Navigate to='/blogs' />}
        <div className='TopBar'>
          <Link className='Link White' to='/'>
            <div className='Title'>Software Dev</div>
          </Link>
          <div className='search'>
            <div>
              <input
                type='text'
                value={searchText}
                placeholder='Search'
                onChange={(e) => searchChange(e)}
                onKeyDown={(e) => searchKeyDown(e)}
              />
            </div>
          </div>
        </div>
        <div className='BottomBar'>
          <div className='SearchBox'>
            <Link to='/login' className='Pink'>
              <FontAwesomeIcon icon={faUser} className='Icon' />
            </Link>

            <div className='Hamburger'>
              <FontAwesomeIcon icon={faSquareShareNodes} className='Icon' />
              <div className='SocialDrop'>
                <a
                  className='SocialLink Twitter'
                  href='https://twitter.com/MrKruger16'
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faTwitter} className='Icon' />
                </a>
                <a
                  className='SocialLink Facebook'
                  href='https://www.facebook.com/connor.rack/'
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faFacebook} className='Icon' />
                </a>
                <a
                  className='SocialLink Github'
                  href='https://github.com/Racksoup?tab=repositories'
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faGithub} className='Icon' />
                </a>
              </div>
            </div>

            <div className='Hamburger'>
              <FontAwesomeIcon icon={faHamburger} className='Icon' />
              <div className='DropdownBox'>
                <Link className='Link' to='/'>
                  <div className='DropLink'>
                    <div className='LinkText'>Home</div>
                  </div>
                </Link>

                <div className='DropLink HamburgerCategories  '>
                  Categories
                  <div className='DropdownBoxCategories'>
                    {categories.map((cat, i) => {
                      return (
                        <Link className='Link' to='/blogs' key={i}>
                          <div
                            className='DropLinkCategories'
                            onClick={() => searchBlogs(cat.category)}
                          >
                            {cat.category}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <Link className='Link' to='/about'>
                  <div className='DropLink'>
                    <div className='LinkText'>About</div>
                  </div>
                </Link>

                <Link className='Link' to='/blogs'>
                  <div className='DropLink' onClick={() => getAllBlogs()}>
                    <div className='LinkText'>Recent Blogs</div>
                  </div>
                </Link>

                <Link className='Link' to='/contact'>
                  <div className='DropLink'>
                    <div className='LinkText'>Contact</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// const mapStateToProps = (state) => ({
//   screen: state.view.screen,
//   categories: state.blogCategory.categories,
// });

// export default connect(mapStateToProps, { searchBlogs, getCategories, getAllBlogs })(Navbar);

export default Navbar;
