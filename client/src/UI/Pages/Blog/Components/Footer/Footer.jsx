import React, { useState } from 'react';
import './Footer.scss';
import Modal from './Modal/Modal.jsx';
// import { searchBlogs, getAllBlogs } from '../../../Redux/Actions/blogs';
// import { subToNewsletter } from '../../../Redux/Actions/mail';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = ({ categories, searchBlogs, getAllBlogs, subToNewsletter }) => {
  const [email, setEmail] = useState('');
  const [modal, toggleModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [subscribed, setSubcribed] = useState(false);

  const subKeyDown = (e) => {
    if (e.keyCode === 13) {
      submitSub();
    }
  };

  const submitSub = () => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(email)) {
      subToNewsletter(email, 'Test-Name');
      setModalText('You have signed up for the newsletter!');
      toggleModal(true);
      setSubcribed(true);
    } else {
      setModalText('Please enter a valid email');
      toggleModal(true);
    }
  };

  return (
    <div className='Footer'>
      {modal && <Modal toggleModal={toggleModal} text={modalText} />}
      <div className='FooterContent'>
        <div className='QuickLinks'>
          <div className='Column'>
            <div className='Title'>QUICK LINKS</div>
            <hr />
            <Link to='/' className='Link'>
              <div className='Text'>Home</div>
            </Link>
            <Link to='/blogs' className='Link'>
              <div className='Text' onClick={() => getAllBlogs()}>
                Blogs
              </div>
            </Link>
            <Link to='/about' className='Link'>
              <div className='Text'>About</div>
            </Link>
            <Link to='/contact' className='Link'>
              <div className='Text'>Contact</div>
            </Link>
          </div>
          <div className='Column'>
            <div className='Title'>CATEGORIES</div>
            <hr />
            {categories.map((cat, i) => (
              <Link className='Link' key={i} to='/blogs'>
                <div className='Text QuickLink' onClick={() => searchBlogs(cat.category)}>
                  {cat.category}
                </div>
              </Link>
            ))}
          </div>
          <div className='Column'>
            <div className='Title'>SOCIAL</div>
            <hr />
            <a href='https://twitter.com/MrKruger16' target='_blank' className='Link'>
              <div className='Text QuickLink'>Twitter</div>
            </a>
            <a href='https://www.facebook.com/connor.rack/' target='_blank' className='Link'>
              <div className='Text QuickLink'>Facebook</div>
            </a>
            <a href='https://github.com/Racksoup?tab=repositories' target='_blank' className='Link'>
              <div className='Text QuickLink'>Github</div>
            </a>
          </div>
        </div>
        <div className='Newsletter'>
          <div className='Title'>Newsletter</div>
          <hr />
          <div className='Text NewsText'>
            Sign up to the newsletter for an email notification whenever a new post is released
          </div>
          <div className='InputBox'>
            <input
              type='text'
              className='Input'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => subKeyDown(e)}
            />
            {!subscribed && (
              <div className='InputBtn' onClick={() => submitSub()}>
                SEND
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='EndBG' />
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   categories: state.blogCategory.categories,
// });

// export default connect(mapStateToProps, { searchBlogs, getAllBlogs, subToNewsletter })(Footer);

export default Footer;
