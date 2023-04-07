import React, { useEffect } from 'react';
import './Blogs.scss';
import { setView } from '../../../Redux/Actions/view.js';
import { setCurrBlog } from '../../../Redux/Actions/blogs';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer.jsx';
import BlogsGrid from '../../Components/BlogsGrid/BlogsGrid';
import useWindowDimensions from '../../Components/useWindowDimensions';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Blogs = ({ blogs, setView, setCurrBlog }) => {
  useEffect(() => {
    setView('categories');
  }, []);
  const { width, height } = useWindowDimensions();

  const OneBlog = ({ blog, i }) => {
    return (
      <div className='Blog' key={i}>
        <Link className='Link' to={`/blog/${blog._id}`}>
          {(i + 4) % 5 !== 0 && (
            <img
              src={`/api/blogs/image/${blog.image_filename}`}
              alt='Blog Image'
              className='Img'
              onClick={() => setCurrBlog(blog)}
            />
          )}
          {(i + 4) % 5 === 0 && (
            <img
              src={`/api/blogs/image/${blog.image_filename}`}
              alt='Blog Image'
              className='BigImg'
              onClick={() => setCurrBlog(blog)}
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
        <Link className='Link' to={`/blog/${blog._id}`}>
          <div className='Readmore' onClick={() => setCurrBlog(blog)}>
            Read More
          </div>
        </Link>
      </div>
    );
  };

  if (blogs) {
    return (
      <div className='ManyBlogs'>
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
          <BlogsGrid blogs={blogs} setCurrBlog={setCurrBlog} />
        )}
        <Footer />
      </div>
    );
  } else return null;
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { setView, setCurrBlog })(Blogs);
