import React from 'react';
import './BusinessCard.scss';
import Signature from '../../../../../images/Signature.png';
import ProfileImage from '../../../../../images/ProfileImg.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGithub, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const BusinessCard = () => {
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
      <div className='Name'>Connor Rack</div>
      <div className='Text'>
        I'm a Web-Developer who likes to make tutorials that help other developers learn new
        technologies. I also document cool projects I've worked on and explain how I made them.
      </div>
      <img src={Signature} alt='Signature' className='Signature' />
    </div>
  );
};

export default BusinessCard;
