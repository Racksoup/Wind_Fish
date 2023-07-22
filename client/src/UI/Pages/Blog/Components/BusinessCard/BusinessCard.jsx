import React from 'react';
import './BusinessCard.scss';
import Signature from '../../../../../images/Signature.png';
import ProfileImage from '../../../../../images/ProfileImg.jpg';
import { selectBlogType } from '../../../../../Redux/Blog/blogSlice';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const BusinessCard = () => {
  const blogType = useSelector(selectBlogType);
  return (
    <div className='BusinessCard'>
      <img src={ProfileImage} alt='Profile Image' className='ProfileImg' />
      <div className='SocialLinks'>
        <a className='SocialLink' href='https://twitter.com/MrKruger16' target='_blank'>
          <FontAwesomeIcon icon={faTwitter} className='Icon' />
        </a>
        <a className='SocialLink' href='https://www.facebook.com/connor.rack/' target='_blank'>
          <FontAwesomeIcon icon={faFacebook} className='Icon' />
        </a>
        <a
          className='SocialLink'
          href='https://github.com/Racksoup?tab=repositories'
          target='_blank'
        >
          <FontAwesomeIcon icon={faGithub} className='Icon' />
        </a>
      </div>
      <h3 className='Name'>Connor Rack</h3>
      {blogType == 'dev' ? (
        <p className='Text'>
          I'm a Web-Developer who likes to make tutorials that help other developers learn new
          technologies. I also document cool projects I've worked on and explain how I made them.
        </p>
      ) : (
        <p className='Text'>
          I am a Web-Developer who likes to study history in my free time. I love to look at how
          changes in technology affect the flow of history
        </p>
      )}
      <img src={Signature} alt='Signature' className='Signature' />
    </div>
  );
};

export default BusinessCard;
