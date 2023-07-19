import React, { useEffect } from 'react';
import './Blogs.scss';
// import { setCurrentBlog } from '../../../Redux/Actions/blogs';
import Navbar from '../../Components/Navbar/Navbar.jsx';
// import Footer from '../../Components/Footer/Footer.jsx';
import BlogsGrid from '../../Components/BlogsGrid/BlogsGrid.jsx';
import useWindowDimensions from '../../useWindowDimensions';

import { selectBlogs, setCurrentBlog } from '../../../../../Redux/Blog/blogSlice';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Blogs = (
  {
    // blogs, setCurrentBlog
  }
) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const blogs = useSelector(selectBlogs);

  const OneBlog = ({ blog, i }) => {
    return (
      <div className='Blog' key={i}>
        <Link className='Link' to={`/blog/${blog._id}`}>
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
        <Link className='Link' to={`/blog/${blog._id}`}>
          <div className='Readmore' onClick={() => dispatch(setCurrentBlog(blog))}>
            Read More
          </div>
        </Link>
      </div>
    );
  };

  if (blogs) {
    console.log(blogs);
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

// const mapStateToProps = (state) => ({
//   blogs: state.blogs.blogs,
// });

// export default connect(mapStateToProps, { setView, setCurrentBlog })(Blogs);

export default Blogs;
