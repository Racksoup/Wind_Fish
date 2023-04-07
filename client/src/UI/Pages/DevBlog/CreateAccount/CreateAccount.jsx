import React, { useState, useEffect } from 'react';
import './CreateAccount.scss';
import { createAccount, loadAccount } from '../../../Redux/Actions/account.js';
import Navbar from '../../Components/Navbar/Navbar';
import FailModal from './FailModal/FailModal';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CreateAccount = ({ account, createAccount, loadAccount }) => {
  const [failModal, setFailModal] = useState(false);
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { email, password, name } = formInput;
  useEffect(() => {
    loadAccount();
  }, []);

  const onChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const isEmail = emailRegex.test(email);
    if (isEmail) {
      createAccount(email, password, name);
    } else {
      setFailModal(true);
    }
  };

  if (account) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='CreateAccount'>
      <Navbar />
      {failModal && <FailModal toggleModal={setFailModal} />}
      <div className='Form'>
        <div className='Label'>Create Account</div>
        <input
          className='Input'
          placeholder='Email'
          autoComplete='false'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className='Input'
          placeholder='Name'
          autoComplete='false'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          className='Input'
          placeholder='Password'
          autoComplete='false'
          type='password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className='Btn' onClick={(e) => onSubmit(e)}>
        Submit
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account.account,
});

export default connect(mapStateToProps, { createAccount, loadAccount })(CreateAccount);
