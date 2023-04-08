import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { login, loadUser } from '../../../Redux/Actions/auth.js';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Admin = ({ login, user, loadUser }) => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formInput;
  useEffect(() => {
    loadUser();
  }, []);

  const onChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (user) {
    return <Navigate to='/admin-dashboard' />;
  }

  return (
    <div className='Login'>
      <div className='Form'>
        <div className='Label'>Login</div>
        <input
          className='Input'
          placeholder='Username'
          autoComplete='false'
          name='username'
          onChange={(e) => onChange(e)}
        />
        <input
          className='Input'
          placeholder='Password'
          autoComplete='false'
          type='password'
          name='password'
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      </div>
      <div className='Btn' onClick={(e) => onSubmit(e)}>
        Submit
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { login, loadUser })(Admin);
