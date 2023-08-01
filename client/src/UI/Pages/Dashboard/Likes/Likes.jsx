import React, { useState, useEffect } from 'react';
import './Likes.scss';
import { getAllBlogLikes, toggleLike, selectAllBlogLikes } from '../../../../Redux/Blog/likesSlice';

import { useDispatch, useSelector } from 'react-redux';

const Likes = ({ user }) => {
  const dispatch = useDispatch();
  const [myLikes, setMyLikes] = useState([]);
  const allBlogLikes = useSelector(selectAllBlogLikes);

  useEffect(() => {
    if (user) {
      dispatch(getAllBlogLikes(user.likes));
    }
  }, [user]);

  useEffect(() => {
    if (allBlogLikes) {
      let theLikes = [];
      allBlogLikes.map((blog) => {
        blog.likes.map((id) => {
          if (id === user._id) {
            let accountLike = {};
            accountLike.blogName = blog.blogName;
            accountLike.blogId = blog.blogId;
            theLikes.push(accountLike);
          }
        });
      });
      setMyLikes(theLikes);
    }
  }, [allBlogLikes]);

  return (
    <div className='Likes'>
      <div className='Title'>All Likes</div>
      <div className='AllLikes'>
        {myLikes &&
          myLikes.map((accountLike, i) => {
            return (
              <div className='Like' key={i}>
                <div className='BlogName'>Blog: {accountLike.blogName}</div>
                <div className='Btn Delete' onClick={() => toggleLike(accountLike.blogId)}>
                  Unlike
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Likes;
