import React, { useEffect, useState } from 'react';
import './Contact.scss';
import { setView } from '../../../Redux/Actions/view.js';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import Modal from './Modal/Modal.jsx';

import { send } from 'emailjs-com';
import { connect } from 'react-redux';

const Contact = ({ setView }) => {
  useEffect(() => {
    setView('contact');
  }, []);

  const [modal, toggleModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [sentEmail, setSentEmail] = useState(false);
  const [form, setForm] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const { name, subject, email, message } = form;

  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (form.name !== '' && form.subject !== '' && form.email !== '' && form.message !== '') {
      const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegex.test(form.email)) {
        send(
          process.env.EMAILJS_SERVICE,
          process.env.EMAILJS_TEMPLATE,
          form,
          process.env.EMAILJS_USER
        ).then(
          (result) => {
            console.log('Success', result.status, result.text);
          },
          (error) => {
            console.log('Failed', error);
          }
        );
        setModalText('Message Sent');
        toggleModal(true);
        setSentEmail(true);
      } else {
        setModalText('Please enter a valid email');
        toggleModal(true);
      }
    } else {
      if (form.name === '') {
        setModalText('Please enter your name');
      }
      if (form.subject === '') {
        setModalText('Please enter a subject');
      }
      if (form.email === '') {
        setModalText('Please enter your email');
      }
      if (form.message === '') {
        setModalText('Please enter a name');
      }
      toggleModal(true);
    }
  };

  return (
    <div className='Contact'>
      {modal && <Modal toggleModal={toggleModal} text={modalText} />}
      <Navbar />
      <div className='Titlex'>Contact Me!</div>
      <div className='Content'>
        <div className='FirstLine'>
          <input
            type='text'
            className='FirstLineInput'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => formChange(e)}
          />
          <input
            type='text'
            className='FirstLineInput'
            placeholder='Subject'
            name='subject'
            value={subject}
            onChange={(e) => formChange(e)}
          />
        </div>
        <input
          type='text'
          className='Email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={(e) => formChange(e)}
        />
        <textarea
          type='text'
          className='Message'
          placeholder='Message'
          name='message'
          value={message}
          onChange={(e) => formChange(e)}
        />
        {!sentEmail && (
          <div className='Btn' onClick={() => submit()}>
            Submit
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { setView })(Contact);
