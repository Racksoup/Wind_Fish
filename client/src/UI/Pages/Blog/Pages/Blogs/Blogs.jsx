import React, { useEffect } from 'react';
import './Blogs.scss';
import { selectBlogs, selectBlogType, setCurrentBlog } from '../../../../../Redux/Blog/blogSlice';
import Navbar from '../../Components/Navbar/Navbar.jsx';
// import Footer from '../../Components/Footer/Footer.jsx';
import BlogsGrid from '../../Components/BlogsGrid/BlogsGrid.jsx';
import useWindowDimensions from '../../useWindowDimensions';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Blogs = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const blogs = useSelector(selectBlogs);
  const blogType = useSelector(selectBlogType);

  const OneBlog = ({ blog, i }) => {
    return (
      <div className={`${blogType == 'dev' ? 'Blog-Dev' : 'Blog-History'}`} key={i}>
        <Link className='Link' to={`/${blogType}-blog/single-blog/${blog._id}`}>
          {(i + 4) % 5 !== 0 && (
            <img
              src={`/api/backend-blog/blogs/image/${blog.image_filename}`}
              alt='Blog Image'
              className='Img'
              onClick={() => dispatch(setCurrentBlog(blog))}
            />
          )}
          {(i + 4) % 5 === 0 && (
            <img
              src={`/api/backend-blog/blogs/image/${blog.image_filename}`}
              alt='Blog Image'
              className='BigImg'
              onClick={() => dispatch(setCurrentBlog(blog))}
            />
          )}
        </Link>
        <div className='Title'>{blog.title}</div>
        <div className='BlogInfo'>
          <div className='Date'>Date</div>
          <hr />
          <div className='BlogCategory'>{blog.category}</div>
        </div>
        <div className='Text'>{blog.text[0].content}</div>
        <Link className='Link' to={`/${blogType}-blog/single-blog/${blog._id}`}>
          <div
            className={`${blogType == 'dev' ? 'Readmore-Dev' : 'Readmore-History'}`}
            onClick={() => dispatch(setCurrentBlog(blog))}
          >
            Read More
          </div>
        </Link>
      </div>
    );
  };

  if (blogs) {
    return (
      <div className='ManyBlogs'>
        <div className='App-Background'></div>
        <Navbar />
        {width > 1150 ? (
          <div className='Content'>
            <div className='ContentRow RowLeft'>
              {blogs.map((blog, i) => {
                if (i % 3 === 0) {
                  return <OneBlog blog={blog} i={i} />;
                }
              })}
            </div>
            <div className='ContentRow'>
              {blogs.map((blog, i) => {
                if (i % 3 === 1) {
                  return <OneBlog blog={blog} i={i} />;
                }
              })}
            </div>
            <div className='ContentRow RowRight'>
              {blogs.map((blog, i) => {
                if (i % 3 === 2) {
                  return <OneBlog blog={blog} i={i} />;
                }
              })}
            </div>
          </div>
        ) : (
          <BlogsGrid blogs={blogs} setCurrentBlog={setCurrentBlog} />
        )}
        {/* <Footer /> */}
      </div>
    );
  } else return null;
};

export default Blogs;
