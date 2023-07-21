import React, { useEffect, useState } from 'react';
import './SingleBlog.scss';
import Navbar from '../../Components/Navbar/Navbar.jsx';
// import Footer from '../../Components/Footer/Footer.jsx';
import {
  selectBlog,
  getSingleBlog,
  selectContentImages,
  getBlogImages,
} from '../../../../../Redux/Blog/blogSlice';
import { selectBlogLikes, getBlogLikes, toggleLike } from '../../../../../Redux/Blog/likesSlice';
import {
  selectBlogComments,
  getBlogComments,
  updateBlogComments,
} from '../../../../../Redux/Blog/commentsSlice';

import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faComment } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const SingleBlog = () => {
  const dispatch = useDispatch();
  const blog = useSelector(selectBlog);
  const blogLikes = useSelector(selectBlogLikes);
  const blogComments = useSelector(selectBlogComments);
  const contentImages = useSelector(selectContentImages);
  const [commentText, setCommentText] = useState('');
  const [commentBox, toggleCommentBox] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const account = null;

  let { id } = useParams();
  useEffect(() => {
    // loadAccount();
    dispatch(getSingleBlog(id));
    dispatch(getBlogLikes(id));
    dispatch(getBlogComments(id));
  }, []);

  useEffect(() => {
    if (blog) {
      dispatch(getBlogImages(blog._id));
    }
  }, [blog]);

  useEffect(() => {
    if (account && blogComments) {
      blogComments.comments.map((accountComment) => {
        if (accountComment.accountId === account._id) {
          setCommentText(accountComment.comment);
        }
      });
    }
  }, [blogComments]);

  useEffect(() => {
    let inLikes = false;
    if (blogLikes && account) {
      blogLikes.likes.map((id) => {
        if (id === account._id) {
          inLikes = true;
        }
      });

      if (inLikes) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
    }
  }, [blogLikes]);

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

  const commentSection = document.getElementById('CommentSection');

  const topCommentBoxClicked = () => {
    toggleCommentBox(!commentBox);
    commentSection.scrollIntoView({ behavior: 'smooth' });
  };

  if (blog && contentImages && blogLikes) {
    const date = new Date(blog.date);

    return (
      <div className='SingleBlogSection'>
        <div className='App-Background'></div>
        <Navbar />
        <div className='SingleBlog'>
          <div className='Title'>{blog.title}</div>
          <div className='HeaderBox'>
            <div className='Date'>
              {`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
            </div>
            <div className='Category'>In {blog.category}</div>
          </div>
          {/* <img src={`/api/backend-blog/blogs/image/${blog.image_filename}`} alt='img' className='Image' /> */}

          <div className='ContentImgBox ContentImgBox-Header'>
            <img
              src={`/api/backend-blog/blogs/image/${blog.image_filename}`}
              alt='contentImg'
              className='Image ContentImg'
            />
            <div className='Caption'>
              <a href={`https://${blog.link}`} target='_blank'>
                <p>{blog.caption}</p>
              </a>
            </div>
          </div>

          <div className='BlogLinks'>
            <button
              className='ButtonBox'
              onClick={() =>
                navigator.share({
                  title: blog.title,
                  text: blog.text[0],
                  url: `http://localhost:8080/#/blog/${blog._id}`,
                })
              }
            >
              <FontAwesomeIcon icon={faShare} className='Icon' />
              <div className='ButtonBoxText Share'>Share</div>
            </button>

            {hasLiked && (
              <div className='ButtonBox' onClick={() => dispatch(toggleLike(blog._id))}>
                <FontAwesomeIcon className='Icon HasLiked' icon={faHeart} />
                <div className='ButtonBoxText'>{blogLikes.likes.length}</div>
              </div>
            )}
            {!hasLiked && (
              <div className='ButtonBox' onClick={() => dispatch(toggleLike(blog._id))}>
                <FontAwesomeIcon className='Icon' icon={faHeart} />
                <div className='ButtonBoxText'>{blogLikes.likes.length}</div>
              </div>
            )}

            <div className='ButtonBox' onClick={() => topCommentBoxClicked()}>
              <FontAwesomeIcon icon={faComment} className='Icon' />
            </div>
          </div>

          <div className='Text'>
            {blog.text.map((textSegment, i) => {
              if (textSegment.type === 'text') {
                let newText = textSegment.content.split('\n').filter((x) => x !== '');
                return (
                  <div className='TextSegmentHolder' key={i}>
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
              if (textSegment.type === 'image') {
                let imgFilename;
                let imgCaption;
                let imgLink;

                contentImages.map((img, i) => {
                  if (img.metadata.imgName === textSegment.content) {
                    imgFilename = img.filename;
                    imgCaption = img.metadata.caption;
                    imgLink = img.metadata.link;
                  }
                });
                return (
                  <div className='ContentImgBox'>
                    <img
                      src={`/api/backend-blog/blogs/content-image/${imgFilename}`}
                      alt='contentImg'
                      className='ContentImg'
                    />
                    <div className='Caption'>
                      <a href={`https://${imgLink}`} target='_blank'>
                        <p>{imgCaption}</p>
                      </a>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        {account && (
          <div className='CommentSection' id='CommentSection'>
            <div className='BlogLinks'>
              <div className='ButtonBox' onClick={() => toggleCommentBox(!commentBox)}>
                <FontAwesomeIcon icon={faComment} className='Icon' />
                Comment
              </div>
              <button
                className='ButtonBox'
                onClick={() =>
                  navigator.share({
                    title: blog.title,
                    text: blog.text[0],
                    url: `http://localhost:8080/#/blog/${blog._id}`,
                  })
                }
              >
                <FontAwesomeIcon icon={faShare} className='Icon' /> Share
              </button>
              <div className='ButtonBox' onClick={() => dispatch(toggleLike(blog._id))}>
                {hasLiked && <FontAwesomeIcon className='Icon HasLiked' icon={faHeart} />}
                {!hasLiked && <FontAwesomeIcon className='Icon' icon={faHeart} />}
                Like
              </div>
            </div>
            {commentBox && (
              <div className='CreateComment'>
                <div className='Title'>Leave A Comment!</div>
                <div className='Title2'>All Comments Are Appreciated</div>
                <textarea
                  placeholder='Comment'
                  name='text'
                  id='text'
                  className='Text'
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <div
                  className='Btn'
                  onClick={() => dispatch(updateBlogComments(blog._id, commentText, account.name))}
                >
                  Submit
                </div>
              </div>
            )}
            {blogComments && blogComments.comments.length > 0 && (
              <div className='Comments'>
                <div className='Title'>Comments</div>
                {blogComments.comments.map((accountComment, i) => (
                  <div className='Comment' key={i}>
                    <div className='Name'>- {accountComment.accountName}</div>
                    <div className='Text'>{accountComment.comment}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* <Footer /> */}
      </div>
    );
  } else return null;
};

// const mapStateToProps = (state) => ({
//   blog: state.blogs.blog,
//   contentImages: state.blogs.contentImages,
//   account: state.account.account,
//   blogLikes: state.likes.blogLikes,
//   blogComments: state.comments.blogComments,
// });

// export default connect(mapStateToProps, {
//   getSingleBlog,
//   setView,
//   getBlogImages,
//   getBlogLikes,
//   toggleLike,
//   loadAccount,
//   updateBlogComments,
//   getBlogComments,
// })(SingleBlog);

export default SingleBlog;
