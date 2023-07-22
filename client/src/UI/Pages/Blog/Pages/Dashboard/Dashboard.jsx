import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import {
  loadAccount,
  logoutAccount,
  deleteAccount,
  changeAccountName,
} from '../../../Redux/Actions/account';
import {
  getAllBlogComments,
  updateBlogComments,
  removeComment,
} from '../../../Redux/Actions/comments';
import { getAllBlogLikes, toggleLike } from '../../../Redux/Actions/likes';
import DeleteModal from './Modal/DeleteModal.jsx';
import UpdateModal from './Modal/UpdateModal.jsx';
import DeleteAccountModal from './Modal/DeleteAccountModal.jsx';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = ({
  account,
  allBlogComments,
  allBlogLikes,
  logoutAccount,
  getAllBlogComments,
  loadAccount,
  updateBlogComments,
  removeComment,
  getAllBlogLikes,
  toggleLike,
  deleteAccount,
  changeAccountName,
}) => {
  useEffect(() => {
    loadAccount();
  }, []);
  const [accountName, setAccountName] = useState('');
  useEffect(() => {
    if (account) {
      getAllBlogComments(account.comments);
      getAllBlogLikes(account.likes);
      setAccountName(account.name);
    }
  }, [account]);

  const [myComments, setMyComments] = useState([]);
  useEffect(() => {
    if (allBlogComments) {
      let theComments = [];
      allBlogComments.map((blog) => {
        blog.comments.map((accountComment) => {
          if (accountComment.accountId === account._id) {
            accountComment.blogName = blog.blogName;
            accountComment.blogId = blog.blogId;
            theComments.push(accountComment);
          }
        });
      });
      setMyComments(theComments);
    }
  }, [allBlogComments]);
  const [myLikes, setMyLikes] = useState([]);
  useEffect(() => {
    if (allBlogLikes) {
      let theLikes = [];
      allBlogLikes.map((blog) => {
        blog.likes.map((id) => {
          if (id === account._id) {
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

  const [deleteModal, toggleDeleteModal] = useState(false);
  const [updateModal, toggleUpdateModal] = useState(false);
  const [deleteAccountModal, toggleDeleteAccountModal] = useState(false);
  const [comment, setComment] = useState({});
  const [view, setView] = useState('comments');

  const updateCommentClicked = (comment) => {
    setComment(comment);
    toggleUpdateModal(true);
  };
  const deleteCommentClicked = (comment) => {
    setComment(comment);
    toggleDeleteModal(true);
  };

  return (
    <div className='Dashboard'>
      {deleteModal && (
        <DeleteModal
          state={comment}
          toggleModal={toggleDeleteModal}
          account={account}
          Func={removeComment}
        />
      )}
      {updateModal && (
        <UpdateModal
          state={comment}
          toggleModal={toggleUpdateModal}
          account={account}
          Func={updateBlogComments}
        />
      )}
      {deleteAccountModal && (
        <DeleteAccountModal toggleModal={toggleDeleteAccountModal} Func={deleteAccount} />
      )}
      <div className='HeaderTitle'>Dashboard</div>
      <div className='Btn Logout' onClick={() => logoutAccount()}>
        Logout
      </div>
      <Link className='Link Btn Back' to='/'>
        Back
      </Link>

      <div className='Nav'>
        {view === 'comments' && (
          <div className='NavItem Selected' onClick={() => setView('comments')}>
            Comments
          </div>
        )}
        {view !== 'comments' && (
          <div className='NavItem' onClick={() => setView('comments')}>
            Comments
          </div>
        )}
        {view === 'likes' && (
          <div className='NavItem Selected' onClick={() => setView('likes')}>
            Likes
          </div>
        )}
        {view !== 'likes' && (
          <div className='NavItem' onClick={() => setView('likes')}>
            Likes
          </div>
        )}
        {view === 'settings' && (
          <div className='NavItem Selected' onClick={() => setView('settings')}>
            Settings
          </div>
        )}
        {view !== 'settings' && (
          <div className='NavItem' onClick={() => setView('settings')}>
            Settings
          </div>
        )}
      </div>

      {view === 'comments' && (
        <div className='CommentsBox'>
          <div className='Title'>All Comments</div>
          <div className='AllComments'>
            {myComments &&
              myComments.map((accountComment, i) => {
                return (
                  <div className='Comment' key={i}>
                    {i < myComments.length - 1 && <div className='Border'></div>}
                    <div className='Info'>
                      <div className='BlogName'>Blog: {accountComment.blogName}</div>
                      <div className='Text'>{accountComment.comment}</div>
                    </div>
                    <div className='Btns'>
                      <div
                        className='Btn Update'
                        onClick={() => updateCommentClicked(accountComment)}
                      >
                        Update
                      </div>
                      <div
                        className='Btn Delete'
                        onClick={() => deleteCommentClicked(accountComment)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {view === 'likes' && (
        <div className='LikesBox'>
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
      )}

      {view === 'settings' && (
        <div className='Settings'>
          <div className='Item'>
            <div className='Label'>Delete Account?</div>
            <div className='Btn Delete' onClick={() => toggleDeleteAccountModal(true)}>
              Delete
            </div>
          </div>
          <div className='Item'>
            <div className='Label'>Change Account</div>
            <input
              className='Input'
              onChange={(e) => setAccountName(e.target.value)}
              value={accountName}
            />
            <div className='Btn' onClick={() => changeAccountName(accountName)}>
              Update
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account.account,
  allBlogComments: state.comments.allBlogComments,
  allBlogLikes: state.likes.allBlogLikes,
});

export default connect(mapStateToProps, {
  logoutAccount,
  getAllBlogComments,
  loadAccount,
  updateBlogComments,
  removeComment,
  getAllBlogLikes,
  toggleLike,
  deleteAccount,
  changeAccountName,
})(Dashboard);
