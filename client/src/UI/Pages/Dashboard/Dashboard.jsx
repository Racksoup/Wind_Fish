import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import { getUser, selectUser, twitchLogout } from '../../../Redux/userSlice';

import Likes from './Likes/Likes.jsx';
import Comments from './Comments/Comments.jsx';
import Settings from './Settings/Settings.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [view, setView] = useState('comments');

  return (
    <div className='Dashboard'>
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
      {view === 'settings' && <Settings user={user} />}
    </div>
  );
};

export default Dashboard;
