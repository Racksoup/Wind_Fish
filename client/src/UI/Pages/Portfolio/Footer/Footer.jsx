import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='Content'>
        <div className='Contact'>
          <div>
            <h6>Contact</h6>
            <div className='Underline' />
          </div>
          <div className='Info'>
            <a href='https://discord.gg/Ugpf7E622H' target='_blank'>
              <p>Discord</p>
            </a>
            <a href='https://twitter.com/WindxFish' target='_blank'>
              <p>Twitter</p>
            </a>
            <p>Windfish26@outlook.com</p>
          </div>
        </div>

        <div className='Links'>
          <p>Assets</p>
          <div className='Linksx'>
            <p>
              <a
                target='_blank'
                href='https://www.freepik.com/free-vector/error-404-concept-landing-page_5060709.htm#page=2&query=desk&position=30&from_view=search&track=sph'
              >
                Image by pikisuperstar
              </a>{' '}
              on Freepik
            </p>
            <p>
              <a
                target='_blank'
                href='https://www.freepik.com/free-vector/happy-small-dog-set-cute-funny-puppy-practicing-different-activities-hunting-playing-eating-sleeping_11235563.htm#query=dog&position=3&from_view=search&track=sph'
              >
                Image by pch.vector
              </a>{' '}
              on Freepik
            </p>
            <p>
              <a
                target='_blank'
                href='https://www.freepik.com/free-vector/cute-husky-dog-different-poses-flat-set_12698391.htm#query=border%20collie&position=8&from_view=search&track=ais'
              >
                Image by pch.vector
              </a>{' '}
              on Freepik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
