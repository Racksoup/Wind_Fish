import React, { useState, useEffect } from 'react';
import './LoginAdmin.scss';
import { login, selectUser, loadUser } from '../../../../Redux/Blog/adminSlice';

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formInput;
  useEffect(() => {
    dispatch(loadUser());
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
    dispatch(login(username, password));
  };

  if (user) {
    return <Navigate to='/admin' />;
  }

  return (
    <div className='LoginAdmin'>
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

export default LoginAdmin;
