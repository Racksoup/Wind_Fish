import React, { useState, useEffect } from 'react';
import './Comments.scss';
import {
  getAllBlogComments,
  updateBlogComments,
  deleteComment,
  selectAllBlogComments,
} from '../../../../Redux/Blog/commentsSlice';
import DeleteModal from '../Modal/DeleteModal.jsx';
import UpdateModal from '../Modal/UpdateModal.jsx';

import { useDispatch, useSelector } from 'react-redux';

const Comments = ({ user }) => {
  const dispatch = useDispatch();
  const allBlogComments = useSelector(selectAllBlogComments);
  const [comment, setComment] = useState({});
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [updateModal, toggleUpdateModal] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getAllBlogComments(user.comments));
    }
  }, [user]);

  const [myComments, setMyComments] = useState([]);
  useEffect(() => {
    if (allBlogComments) {
      let theComments = [];
      allBlogComments.map((blog) => {
        blog.comments.map((userComment) => {
          if (userComment.userId === user._id) {
            const newComment = {
              blogName: blog.blogName,
              blogId: blog.blogId,
              comment: userComment.comment,
              userId: userComment.userId,
            };
            theComments.push(newComment);
          }
        });
      });
      setMyComments(theComments);
    }
  }, [allBlogComments]);

  const updateCommentClicked = (comment) => {
    setComment(comment);
    toggleUpdateModal(true);
  };
  const deleteCommentClicked = (comment) => {
    setComment(comment);
    toggleDeleteModal(true);
  };

  console.log(allBlogComments, myComments);

  return (
    <div className='Comments'>
      {deleteModal && (
        <DeleteModal
          state={comment}
          toggleModal={toggleDeleteModal}
          account={user}
          Func={deleteComment}
        />
      )}
      {updateModal && (
        <UpdateModal
          state={comment}
          toggleModal={toggleUpdateModal}
          account={user}
          Func={updateBlogComments}
        />
      )}
      <div className='Title'>All Comments</div>
      <div className='AllComments'>
        {myComments &&
          myComments.map((userComment, i) => {
            return (
              <div className='Comment' key={i}>
                {i < myComments.length - 1 && <div className='Border'></div>}
                <div className='Info'>
                  <div className='BlogName'>Blog: {userComment.blogName}</div>
                  <div className='Text'>{userComment.comment}</div>
                </div>
                <div className='Btns'>
                  <div className='Btn Update' onClick={() => updateCommentClicked(userComment)}>
                    Update
                  </div>
                  <div className='Btn Delete' onClick={() => deleteCommentClicked(userComment)}>
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
