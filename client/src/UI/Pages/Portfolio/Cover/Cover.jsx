import React from 'react';
import './Cover.scss';
import Youtube from '../../../../images/youtube.png';
import Twitter from '../../../../images/twitter.png';
import Twitch from '../../../../images/twitch.png';
import Reddit from '../../../../images/reddit.png';
import Instagram from '../../../../images/Instagram.png';
import Tiktok from '../../../../images/Gigi.png';
import Discord from '../../../../images/discord.png';
import Desk from '../../../../images/Desk.png';
import DotArrow from '../../../../images/DotArrow.png';

const Cover = () => {
  const linkToRef = (ref) => {
    const linkOffset = 0;
    const refPosition = document.getElementById(ref).getBoundingClientRect().top;
    const offsetPosition = refPosition + window.pageYOffset - linkOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  return (
    <div className='Cover'>
      <div className='Container'>
        <div className='Header'>
          <h2>CONNOR RACK</h2>
          <div className='Links'>
            <a href='https://www.youtube.com/channel/UCUdf18IaDKXzIROmcYtp4SA' target='_blank'>
              <img src={Youtube} alt='Youtube' />
            </a>
            <a href='https://www.twitch.tv/windxfish' target='_blank'>
              <img src={Twitch} alt='Twitch' />
            </a>
            <a href='https://twitter.com/WindxFish' target='_blank'>
              <img src={Twitter} alt='Twitter' />
            </a>
            <a href='' target='_blank'>
              <img src={Instagram} alt='Instagram' />
            </a>
            <a href='https://www.tiktok.com/@windxfish' target='_blank'>
              <img src={Tiktok} alt='TikTok' />
            </a>
            <a href='https://www.reddit.com/r/WindxuFish/' target='_blank'>
              <img src={Reddit} alt='Reddit' />
            </a>
            <a href='https://discord.gg/Ugpf7E622H' target='_blank'>
              <img src={Discord} alt='Discord' />
            </a>
          </div>
        </div>

        <div className='Content'>
          <div className='Left'>
            <div className='Top'>
              <h1>Web Designer</h1>
              <h1>Game Dev</h1>
              <h1>Content Creator</h1>
            </div>
            <div className='Bottom'>
              <a href='https://www.connorrack.ca' target='_blank'>
                <button className='BusinessLink'>Need A Website?</button>
              </a>
              <div className='BlogLinks'>
                <a href='https://www.rackhistory.ca' target='_blank'>
                  <button className='Btn Btn-History'>History Blog</button>
                </a>
                <a href='https://www.rackdev.ca' target='_blank'>
                  <button className='Btn Btn-Dev'>Dev Blog</button>
                </a>
              </div>
            </div>
          </div>
          <div className='Right'>
            <img src={Desk} alt='Desk' />
          </div>
        </div>

        <div className='LeadButton'>
          <button onClick={() => linkToRef('About')}>Bio & Projects</button>
          <img src={DotArrow} alt='DotArrow' />
        </div>
      </div>
    </div>
  );
};

export default Cover;
