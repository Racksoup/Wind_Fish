import React, { useEffect } from 'react';
import './About.scss';
import { setView } from '../../../Redux/Actions/view.js';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import useWindowDimensions from '../../Components/useWindowDimensions';
import Iphone from '../../../images/Iphone.png';
import Printer from '../../../images/3dprinter.jpg';
import AI from '../../../images/AI.jpg';
import Bitcoin from '../../../images/Bitcoin.jpg';
import Computer from '../../../images/Computer.jpg';
import Drone from '../../../images/Drone.jpg';
import GameBoy from '../../../images/GameBoy.png';
import Hoverboard from '../../../images/Hoverboard.jpg';
import Internet from '../../../images/Internet.jpg';
import Ironman from '../../../images/Ironman.png';
import Rocket from '../../../images/Rocket.jpg';

import { connect } from 'react-redux';

const About = ({ setView }) => {
  useEffect(() => {
    setView('about');
  }, []);
  const { width, height } = useWindowDimensions();
  return (
    <div className='About'>
      <Navbar />
      <div className='Content'>
        <div className='Title'>Big Ideas</div>
        <div className='Top'>
          <img src={Iphone} alt='Iphone' className='Img' />
          <div className='Right'>
            <div className='TopTitle'>Past & Present</div>
            <div className='TopText'>
              Software Development is all about thinking big. The sky's the limit. There are lots of
              new possibilities, some more useful than others. Ideas like the iphone, or making a
              digital clock out of a sundial.
            </div>
          </div>
        </div>
        <hr />
        <div className='Images'>
          {width > 1150 && <img src={AI} alt='AI' className='Img' />}
          <img src={Printer} alt='Printer' className='Img' />
          <img src={Computer} alt='Computer' className='Img' />
          {width > 1150 && <img src={Bitcoin} alt='Bitcoin' className='Img' />}
          <img src={Internet} alt='Internet' className='Img' />
          <img src={Drone} alt='Drone' className='Img' />
          <img src={GameBoy} alt='GameBoy' className='Img' />
          {width > 1150 && <img src={Hoverboard} alt='Hoverboard' className='Img' />}
          <img src={Rocket} alt='Rocket' className='Img' />
          {width > 1150 && <img src={Ironman} alt='Ironman' className='Img' />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { setView })(About);
