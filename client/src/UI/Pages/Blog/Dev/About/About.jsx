import React from 'react';
import './About.scss';
import { selectBlogType } from '../../../../../Redux/Blog/blogSlice';
import Navbar from '../../Components/Navbar/Navbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import useWindowDimensions from '../../useWindowDimensions';
import Iphone from '../../../../../images/Iphone.png';
import Printer from '../../../../../images/3dprinter.jpg';
import AI from '../../../../../images/AI.jpg';
import Bitcoin from '../../../../../images/Bitcoin.jpg';
import Computer from '../../../../../images/Computer.jpg';
import Drone from '../../../../../images/Drone.jpg';
import GameBoy from '../../../../../images/GameBoy.png';
import Hoverboard from '../../../../../images/Hoverboard.jpg';
import Internet from '../../../../../images/Internet.jpg';
import Ironman from '../../../../../images/Ironman.png';
import Rocket from '../../../../../images/Rocket.jpg';
import Chariots from '../../../../../images/Chariots.jpg';
import EasterIslands from '../../../../../images/EasterIslands.jpg';
import FirstComputer from '../../../../../images/FirstComputer.jpg';
import IndustrialRevolution from '../../../../../images/IndustrialRevolution.jpg';
import LightBulb from '../../../../../images/LightBulb.jpg';
import MoonLanding from '../../../../../images/MoonLanding.jpg';
import Sphinx from '../../../../../images/Sphinx.jpg';
import TankMan from '../../../../../images/TankMan.jpg';
import VikingBoat from '../../../../../images/VikingBoat.jpg';
import WrightBrothers from '../../../../../images/WrightBrothers.jpg';
import FordModelT from '../../../../../images/FordModelT.jpg';

import { useSelector } from 'react-redux';

const About = () => {
  const { width, height } = useWindowDimensions();
  const blogType = useSelector(selectBlogType);

  return (
    <div className='About'>
      <div className='App-Background'></div>
      <Navbar />
      <div className='Content'>
        {blogType == 'dev' ? (
          <>
            <div className='Title'>Big Ideas</div>
            <div className='Top'>
              <img src={Iphone} alt='Iphone' className='Img' />
              <div className='Right'>
                <div className='TopTitle'>Past & Present</div>
                <div className='TopText'>
                  Software Development is all about thinking big. The sky's the limit. There are
                  lots of new possibilities, some more useful than others. Ideas like the iphone, or
                  making a digital clock out of a sundial.
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='Title'>History & Tech</div>
            <div className='Top'>
              <img src={IndustrialRevolution} alt='Iphone' className='Img' />
              <div className='Right'>
                <div className='TopTitle'>Past & Present</div>
                <div className='TopText'>
                  History is a very deep and broad topic. This blog focuses on advancing
                  technologies and there impacts on society. Contrasting past events with current
                  events, and seeing how new inventions will change outcomes.
                </div>
              </div>
            </div>
          </>
        )}
        <hr />
        {blogType == 'dev' ? (
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
        ) : (
          <div className='Images'>
            {width > 1150 && <img src={Chariots} alt='Chariots' className='Img' />}
            <img src={EasterIslands} alt='EasterIslands' className='Img' />
            <img src={FirstComputer} alt='FirstComputer' className='Img' />
            {width > 1150 && <img src={LightBulb} alt='LightBulb' className='Img' />}
            <img src={MoonLanding} alt='MoonLanding' className='Img' />
            <img src={Sphinx} alt='Sphinx' className='Img' />
            <img src={TankMan} alt='TankMan' className='Img' />
            {width > 1150 && <img src={VikingBoat} alt='VikingBoat' className='Img' />}
            <img src={WrightBrothers} alt='WrightBrothers' className='Img' />
            {width > 1150 && <img src={FordModelT} alt='FordModelT' className='Img' />}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

// export default connect(null, { setView })(About);

export default About;
