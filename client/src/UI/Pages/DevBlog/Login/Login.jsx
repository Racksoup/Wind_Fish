import React, { useState, useEffect } from 'react';
import './Login.scss';
import { loginAccount, loadAccount } from '../../../Redux/Actions/account.js';
import Navbar from '../../Components/Navbar/Navbar';

import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Login = ({ account, loginAccount, loadAccount }) => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formInput;
  useEffect(() => {
    loadAccount();
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
    loginAccount(email, password);
  };

  if (account) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='Loginx'>
      <Navbar />
      <div className='Form'>
        <div className='Label'>Login</div>
        <input
          className='Input'
          placeholder='Email'
          autoComplete='false'
          name='email'
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
      <Link to='/create-account' className='Link'>
        <div className='AccountLink'>Create Account</div>
      </Link>
      <Link to='/password-reset' className='Link'>
        <div className='AccountLink'>Forgot Password?</div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account.account,
});

export default connect(mapStateToProps, { loginAccount, loadAccount })(Login);
