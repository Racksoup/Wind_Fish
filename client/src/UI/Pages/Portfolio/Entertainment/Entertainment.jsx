import React from 'react';
import './Entertainment.scss';
import Vector1 from '../../../../images/Vector 1.png';
import Vector2 from '../../../../images/Vector 2.png';
import Vector3 from '../../../../images/Vector 3.png';
import TaiwanLandscape from '../../../../images/TaiwanLandscape.jpg';
import Computer from '../../../../images/Computer.jpg';
import Reddit from '../../../../images/reddit.png';
import Discord from '../../../../images/discord.png';

const Entertainment = () => {
  return (
    <div className='Entertainment'>
      <div className='Container'>
        <h3>Stream</h3>
        <div className='Content'>
          <img src={Vector3} alt='Vector' className='Img-1' />
          <div className='FlavorText'>
            <h5>
              Prime Content, History, News, Politics, Gaming. Giga-Chad Stream. Elephant, Where?
            </h5>
            <a href='https://www.twitch.tv/windxfish' target='_blank'>
              <button className='Twitch'>Twitch</button>
            </a>
          </div>
          <iframe width='465' height='331' src='https://www.youtube.com/embed/tgbNymZ7vqY'></iframe>
        </div>
        <h3>Videos</h3>
        <div className='Content'>
          <img src={Vector2} alt='Vector' className='Img-2' />
          <iframe width='465' height='331' src='https://www.youtube.com/embed/tgbNymZ7vqY'></iframe>
          <div className='FlavorText'>
            <h5>
              Welcome to a destination unknown. Join the club! Stay up to date with my newest
              videos!
            </h5>
            <a href='https://www.youtube.com/channel/UCUdf18IaDKXzIROmcYtp4SA' target='_blank'>
              <button className='Youtube'>Youtube</button>
            </a>
          </div>
        </div>
        <h3>Blogs</h3>
        <h4>Relevant history and development topics</h4>
        <div className='Blogs'>
          <img src={Vector1} alt='Vector' className='Vector' />
          <div className='Blogsx'>
            <a href='https://www.rackhistory.ca/#/blog/63a242b30a1ea0d32740d12e/' target='_blank'>
              <div className='Card'>
                <div className='CardHeader CardHeader-2'>
                  <h4>History Blog</h4>
                </div>
                <img src={TaiwanLandscape} alt='History Blog' />

                <div className='CardContent'>
                  <div className='TimeRow'>
                    {/* <Icon icon='ic:baseline-access-time' className='Icon' /> */}
                    <p className='Text'>12/19/2023</p>
                  </div>
                  <h4>Taiwan History</h4>
                </div>
              </div>
            </a>

            <a href='https://rackdev.ca/#/blog/63a38e70dbfb10af243784a5/' target='_blank'>
              <div className='Card'>
                <div className='CardHeader CardHeader-1'>
                  <h4>Developer Blog</h4>
                </div>
                <img src={Computer} alt='DevBlog' />

                <div className='CardContent'>
                  <div className='TimeRow'>
                    {/* <Icon icon='ic:baseline-access-time' className='Icon' /> */}
                    <p className='Text'>12/20/2023</p>
                  </div>
                  <h4>So You Want To Be A Programmer?</h4>
                </div>
              </div>
            </a>
          </div>
          <div className='Reddit'>
            <p className='Label'>Check out the subreddit!</p>
            <a href='https://www.reddit.com/r/WindxFish/' target='_blank'>
              <button>
                <img src={Reddit} alt='Reddit' className='Img' />
                <p>Reddit</p>
              </button>
            </a>
          </div>
          <div className='Discord'>
            <a href='https://discord.gg/Ugpf7E622H' target='_blank'>
              <button>
                <img src={Discord} alt='Discord' className='Img' />
                <p>Discord</p>
              </button>
            </a>
            <p className='Label'>Join the discord!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
