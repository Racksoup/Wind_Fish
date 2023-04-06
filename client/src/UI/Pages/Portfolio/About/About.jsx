import React from 'react';
import './About.scss';
import Dogs from '../../../../images/Dogs.png';
import Condensation from '../../../../images/Condensation.png';
import PastelColorDecoration from '../../../../images/PastelColorDecoration.png';
import SelfieCircle from '../../../../images/SelfieCircle.png';

const About = () => {
  return (
    <div className='About' id='About'>
      <div className='Container'>
        <div className='Header'>
          <div />
          <div className='Center'>
            <h4>Sugar Spice & Everything Nice</h4>
            <div className='Underline' />
            <img src={Condensation} alt='Condensation' />
          </div>
          <img src={PastelColorDecoration} alt='Pastel Color Decoration' className='Pastel' />
        </div>
        <div className='Content'>
          <div className='Left'>
            <div className='Top'>
              <img src={SelfieCircle} alt='Selfie' />
              <div className='Hype'>
                <p>Mega-Mind, Lord Of Truth And Knowledge</p>
                <p>Code Monkey Very Simple Man</p>
                <p>Diamond In Starcraft 2</p>
                <p>Master-Debater</p>
                <p>Took Every Pill Now I Taste The Rainbow</p>
              </div>
            </div>
            <img src={Dogs} alt='Dogs' className='Dogs' />
          </div>
          <div className='Right'>
            <p>I build websites, make videos, blogs and live-stream.</p>
            <p>I’m a Canadian, born and raised in Ottawa.</p>
            <p>
              My websites have real character. I don't build anything unless I feel real
              inspiration. You can always see passion in my work.
            </p>
            <p>
              What is more fun than playing games? Making games! People who enjoy good developer
              content (which is rare) can watch me tinker with software and robotics.
            </p>
            <p>
              Politics and history have been attractive to me for a long time. I’m interested in
              understanding the causes and effects that influence the world. I make content out of
              interesting stuff I find while doing research.
            </p>
            <p>I’m a big fan of coffee, gaming, debates, tech, stories, dogs, and good weather.</p>
            <p>
              I’m a quiet person who likes to work independently. I’m happiest when I have time to
              start a new project.
            </p>
            <p>
              Stories that don't explain everything are my favorite. I can spend and eternity
              dissecting a good game, book, or show.
            </p>
            <p>
              I try to find unique people to talk to who will challenge my views and change my mind.
            </p>
            <p>Democratic capitalist.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
