import React, { useEffect, useState } from 'react';
import './BlogView.scss';
import {
  selectBlogs,
  setCurrentBlog,
  searchBlogs,
  selectBlogType,
} from '../../../../../Redux/Blog/blogSlice';
import { selectAllBlogLikes, getAllBlogLikes } from '../../../../../Redux/Blog/likesSlice';
import { selectAllBlogComments, getAllBlogComments } from '../../../../../Redux/Blog/commentsSlice';

import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faComment } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const BlogView = () => {
  const dispatch = useDispatch();
  const blogType = useSelector(selectBlogType);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [searched, setSearched] = useState(false);
  const blogs = useSelector(selectBlogs);
  const allBlogLikes = useSelector(selectAllBlogLikes);
  const allBlogComments = useSelector(selectAllBlogComments);

  const categoryClicked = (category) => {
    dispatch(searchBlogs(category));
    dispatch(setSearched(true));
  };

  useEffect(() => {
    if (blogs.length > 0) {
      const blogIDs = blogs.map((blog) => {
        return blog._id;
      });
      dispatch(getAllBlogLikes(blogIDs));
      dispatch(getAllBlogComments(blogIDs));
    }
  }, [blogs]);

  if (searched) {
    return <Navigate to='/backend-blog/blogs' />;
  }

  return blogs.map((blog, l) => {
    const date = new Date(blog.date);
    let blogLikes;
    let x = {
      _id: '',
      blogId: '',
      likes: [],
    };
    if (allBlogLikes !== null) {
      blogLikes = allBlogLikes.filter((item, i) => {
        if (item.blogId === blog._id) {
          return item;
        }
      });
      x = blogLikes[0];
    }

    if (x) {
      return (
        <div key={l} className='Blog'>
          <Link className='Link' to={`/dev-blog/single-blog/${blog._id}`}>
            <img
              src={`api/backend-blog/blogs/image/${blog.image_filename}`}
              alt='img'
              className='Image'
              onClick={() => dispatch(setCurrentBlog(blog))}
            />
          </Link>
          <div className='TopBox'>
            <div
              className={`${blogType == 'dev' ? 'Category-Dev' : 'Category-History'}`}
              onClick={() => categoryClicked(blog.category)}
            >
              {blog.category}
            </div>
            <div className='BlogLinks'>
              <div
                className='ShareBox'
                onClick={() =>
                  navigator.share({
                    title: blog.title,
                    text: blog.text[0],
                    url: `http://localhost:8080/#/blog/${blog._id}`,
                  })
                }
              >
                <FontAwesomeIcon icon={faShare} className='Icon' />
                <div className='BlogLinkText'>Share</div>
              </div>
              <div className='HeartBox'>
                <FontAwesomeIcon icon={faHeart} className='Icon' />
                <div className='BlogLinkText'>{x.likes.length}</div>
              </div>
              <div className='CommentBox'>
                <FontAwesomeIcon icon={faComment} className='Icon' />
              </div>
            </div>
          </div>
          <div className='Date'>
            {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
          </div>
          <div className='Title'>{blog.title}</div>
          <div className='Text'>
            {blog.text.map((textSegment, i) => {
              if (textSegment.type !== 'image') {
                let newText = textSegment.content.split('\n').filter((x) => x !== '');
                return (
                  <div key={i}>
                    {newText.map((lastText, j) => {
                      return (
                        <div key={j} className='TextSegment'>
                          {lastText}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })}
          </div>
          <Link className='Link' to={`/dev-blog/single-blog/${blog._id}`}>
            <div
              className={`${blogType == 'dev' ? 'Readmore-Dev' : 'Readmore-History'}`}
              onClick={() => dispatch(setCurrentBlog(blog))}
            >
              READ MORE
            </div>
          </Link>
        </div>
      );
    }
  });
};

// const mapStateToProps = (state) => ({
//   allBlogLikes: state.likes.allBlogLikes,
//   allBlogComments: state.comments.allBlogComments,
// });

// export default connect(mapStateToProps, {
//   setCurrBlog,
//   searchBlogs,
//   getAllBlogLikes,
//   getAllBlogComments,
// })(BlogView);

export default BlogView;
