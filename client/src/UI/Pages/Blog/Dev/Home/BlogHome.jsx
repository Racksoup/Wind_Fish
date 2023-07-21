import React, { useState, useEffect } from 'react';
import './BlogHome.scss';
// import {
//   getThreeBlogs,
//   searchBlogs,
//   setCurrBlog,
//   getRecentBlogs,
// } from '../../../Redux/Actions/blogs.js';
// import { setView } from '../../../Redux/Actions/view.js';
// import { subToNewsletter, setUnsubbed } from '../../../Redux/Actions/mail.js';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import BlogView from '../../Components/BlogView/BlogView.jsx';
import BlogsGrid from '../../Components/BlogsGrid/BlogsGrid.jsx';
import BusinessCard from '../../Components/BusinessCard/BusinessCard.jsx';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen.jsx';
import useWindowDimensions from '../../useWindowDimensions.js';
import Modal from './Modal/Modal.jsx';

import {
  selectBlog,
  selectBlogs,
  selectContentImages,
  selectContentImagesLoaded,
  selectRecentBlogs,
  selectSearchedBlogs,
  selectBlogType,
  getThreeBlogs,
  getRecentBlogs,
  setCurrentBlog,
  searchBlogs,
} from '../../../../../Redux/Blog/blogSlice';
import { selectTags, getTags } from '../../../../../Redux/Blog/tagSlice';
import { selectCategories, getCategories } from '../../../../../Redux/Blog/categorySlice';

import { Navigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

const BlogHome = (
  {
    // blogs,
    // recentBlogs,
    // categories,
    // tags,
    // setView,
    // getThreeBlogs,
    // getCategories,
    // getTags,
    // searchBlogs,
    // setCurrBlog,
    // getRecentBlogs,
    // subToNewsletter,
    // setUnsubbed,
  }
) => {
  const dispatch = useDispatch();
  const blog = useSelector(selectBlog);
  const blogs = useSelector(selectBlogs);
  const contentImages = useSelector(selectContentImages);
  const contentImagesLoaded = useSelector(selectContentImagesLoaded);
  const recentBlogs = useSelector(selectRecentBlogs);
  const searchedBlogs = useSelector(selectSearchedBlogs);
  const tags = useSelector(selectTags);
  const categories = useSelector(selectCategories);
  const blogType = useSelector(selectBlogType);

  const { height, width } = useWindowDimensions();
  const [subValue, setSubValue] = useState('');
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modal, toggleModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [subscribed, setSubcribed] = useState(false);

  useEffect(() => {
    dispatch(getThreeBlogs(blogType));
    dispatch(getRecentBlogs(blogType));
    dispatch(getCategories(blogType));
    dispatch(getTags(blogType));
    // setView('home');
  }, [blogType]);

  const searchChange = (e) => {
    setSearchText(e.target.value);
  };
  const searchKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchSubmit();
    }
  };
  const searchSubmit = () => {
    searchBlogs(searchText);
    setSearched(true);
  };
  const categoryClicked = (category) => {
    searchBlogs(category);
    setSearched(true);
  };

  const subKeyDown = (e) => {
    if (e.keyCode === 13) {
      submitSub();
    }
  };

  const submitSub = () => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(subValue)) {
      subToNewsletter(subValue, 'Test-Name');
      setModalText('You have signed up for the newsletter!');
      toggleModal(true);
      setSubcribed(true);
    } else {
      setModalText('Please enter a valid email');
      toggleModal(true);
    }
  };

  if (!blogs) {
    return <LoadingScreen />;
  }

  return (
    <div className='BlogMain'>
      <div className='App-Background'></div>
      {modal && <Modal toggleModal={toggleModal} text={modalText} />}
      {searched && <Navigate to='/blogs' />}
      <Navbar />
      <div className='Content'>
        <div className='Blogs'>
          <BlogView blogs={blogs} />
          {width > 1150 && <BlogsGrid blogs={recentBlogs} setCurrentBlog={setCurrentBlog} />}
        </div>
        <div className='Sidebar'>
          {width > 767 && width < 1150 ? (
            <div className='CardAndSearch'>
              <div className='SearchHolder'>
                <input
                  placeholder='Search'
                  type='text'
                  className='SearchBar'
                  value={searchText}
                  onChange={(e) => searchChange(e)}
                  onKeyDown={(e) => searchKeyDown(e)}
                />
                <FontAwesomeIcon
                  className='SearchIcon'
                  icon={faSearch}
                  onClick={() => searchSubmit()}
                />
              </div>
              <BusinessCard />
            </div>
          ) : (
            <div className='CardAndSearch'>
              <BusinessCard />
              <div className='SearchHolder'>
                <input
                  placeholder='Search'
                  type='text'
                  className='SearchBar'
                  value={searchText}
                  onChange={(e) => searchChange(e)}
                  onKeyDown={(e) => searchKeyDown(e)}
                />
                <FontAwesomeIcon className='SearchIcon' icon={faSearch} />
              </div>
            </div>
          )}
          <div className='Newsletter'>
            <div className='Title'>Subscribe to our newsletter</div>
            <input
              placeholder='Your email here'
              type='text'
              className='Email'
              value={subValue}
              onChange={(e) => setSubValue(e.target.value)}
              onKeyDown={(e) => subKeyDown(e)}
            />
            <div className='Subscribe' onClick={() => submitSub()}>
              SUBSCRIBE
            </div>
          </div>
          {width > 1150 && (
            <div className='Box'>
              <div className='Label'>Tags</div>
              <div className='Tags'>
                {tags.map((tag, i) => (
                  <div className='Tag' key={i} onClick={() => categoryClicked(tag.tag)}>
                    {tag.tag}
                  </div>
                ))}
              </div>
            </div>
          )}
          {width > 767 && width < 1150 ? (
            <div className='Box'>
              <div className='Label'>Categories</div>
              <div className='TwoCategoryBox'>
                {categories.map((category, i) => (
                  <div
                    className='Category'
                    key={i}
                    onClick={() => categoryClicked(category.category)}
                  >
                    <img
                      src={`/api/backend-blog/blog-category/image/${category.image_filename}`}
                      alt='img'
                      className='Img'
                    />
                    <div className='Title'>{category.category}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='Box'>
              <div className='Label'>Categories</div>
              {categories.map((category, i) => (
                <div
                  className='Category'
                  key={i}
                  onClick={() => categoryClicked(category.category)}
                >
                  <img
                    src={`/api/backend-blog/blog-category/image/${category.image_filename}`}
                    alt='img'
                    className='Img'
                  />
                  <div className='Title'>{category.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='EndTags'>
        <div className='Title'>Tags</div>
        <div className='Box'>
          {tags.map((tag, i) => (
            <Link className='Link' to='/blogs' key={i}>
              <div className='EndTag'>{tag.tag}</div>
            </Link>
          ))}
        </div>
      </div>
      {/* {width < 1150 && width > 767 && (
        <BlogsGrid blogs={recentBlogs} setCurrentBlog={setCurrentBlog} />
      )} */}
      {/* <Footer /> */}
    </div>
  );
};

export default BlogHome;
