import React from 'react';
import './BlogsGrid.scss';
import useWindowDimensions from '../../useWindowDimensions';

import { Link } from 'react-router-dom';

const BlogsGrid = ({ blogs, setCurrentBlog }) => {
  const { width, height } = useWindowDimensions();
  const OneBlog = ({ blog, i }) => {
    return (
      <div className='Blog' key={i}>
        {width > 475 ? (
          <Link className='ImgLink' to={`/blog/${blog._id}`}>
            {(i + 4) % 5 !== 0 && (
              <img
                src={`http://localhost:5000/api/backend-blog/blogs/image/${blog.image_filename}`}
                alt='Blog Image'
                className='Img'
                onClick={() => setCurrentBlog(blog)}
              />
            )}
            {(i + 4) % 5 === 0 && (
              <img
                src={`api/backend-blog/blogs/image/${blog.image_filename}`}
                alt='Blog Image'
                className='BigImg'
                onClick={() => setCurrentBlog(blog)}
              />
            )}
          </Link>
        ) : (
          <Link className='ImgLink' to={`/blog/${blog._id}`}>
            <img
              src={`api/backend-blog/blogs/image/${blog.image_filename}`}
              alt='Blog Image'
              className='Img'
              onClick={() => setCurrentBlog(blog)}
            />
          </Link>
        )}
        <div className='Title'>{blog.title}</div>
        <div className='BlogInfo'>
          <div className='Datex'>Date</div>
          <hr />
          <div className='BlogCategory'>{blog.category}</div>
        </div>
        <div className='Text'>{blog.text[0].content}</div>
        <Link className='Link' to={`/blog/${blog._id}`}>
          <div className='Readmorex' onClick={() => setCurrentBlog(blog)}>
            Read More
          </div>
        </Link>
      </div>
    );
  };

  if (blogs) {
    if (width > 475) {
      return (
        <div className='BlogsGrid'>
          <div className='ContentRow RowLeft'>
            {blogs.map((blog, i) => {
              if (i % 2 === 0) {
                return <OneBlog blog={blog} key={i} />;
              }
            })}
          </div>
          <div className='ContentRow RowRight'>
            {blogs.map((blog, i) => {
              if (i % 2 === 1) {
                return <OneBlog blog={blog} key={i} />;
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className='BlogsGrid'>
          {blogs.map((blog, i) => {
            return <OneBlog blog={blog} key={i} />;
          })}
        </div>
      );
    }
  } else return null;
};

export default BlogsGrid;
