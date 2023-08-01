import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import { getUser, selectUser, twitchLogout, deleteUser } from '../../../Redux/userSlice';

import DeleteAccountModal from './Modal/DeleteAccountModal.jsx';
import Likes from './Likes/Likes.jsx';
import Comments from './Comments/Comments.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const [accountName, setAccountName] = useState('');
  useEffect(() => {
    if (user) {
      setAccountName(user.name);
    }
  }, [user]);

  const [deleteAccountModal, toggleDeleteAccountModal] = useState(false);
  const [view, setView] = useState('comments');

  return (
    <div className='Dashboard'>
      {deleteAccountModal && (
        <DeleteAccountModal toggleModal={toggleDeleteAccountModal} Func={dispatch(deleteUser())} />
      )}
      <div className='HeaderTitle'>Dashboard</div>
      <div className='Btn Logout' onClick={() => dispatch(twitchLogout())}>
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

      {view === 'comments' && <Comments user={user} />}
      {view === 'likes' && <Likes user={user} />}

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
            <div
              className='Btn'
              // onClick={() => changeAccountName(accountName)}
            >
              Update
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
