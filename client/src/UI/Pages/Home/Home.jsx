import React, { useEffect } from 'react';
import './Home.scss';
import { selectVideos, getYoutube } from '../../../Redux/youtubeSlice';
import { getClips, selectClips } from '../../../Redux/twitchSlice';
import { twitchLogout } from '../../../Redux/userSlice';
import Youtube from '../../../images/youtube.png';
import Twitter from '../../../images/twitter.png';
import Twitch from '../../../images/twitch.png';
import Reddit from '../../../images/reddit.png';
import Instagram from '../../../images/Instagram.png';
import Tiktok from '../../../images/Gigi.png';
import Discord from '../../../images/discord.png';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getYoutube());
    dispatch(getClips());
  }, []);

  const videos = useSelector(selectVideos);
  const clips = useSelector(selectClips);

  //Tough Sincere Duck De Illuminati

  return (
    <div className='Home'>
      <div className='Content'>
        <div className='pre-top'>
          <div className='clips'>
            <h3>Recent Clips</h3>
            <div className='inner'>
              {clips &&
                clips.map((x) => {
                  return (
                    <a href={x.url} target='_blank' className='clip' key={x.id}>
                      <img src={x.thumbnail_url} alt={x.url} />
                      <h4>{x.title}</h4>
                    </a>
                  );
                })}
            </div>
          </div>
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
            <button onClick={() => {dispatch(twitchLogout())}}>X</button>
          </div>
        </div>
        <div className='Top'>
          <div className='Section'>
            <div className='Videos'>
              <VideoWidget type='Dev' index={0} videos={videos} />
              <VideoWidget type='Dev' index={1} videos={videos} />
            </div>
            <div className='Blog Blog-Dev'>
              <Link to='/dev-blog/single-blog/63a38e70dbfb10af243784a5'>
                <h4>So You Want To Be A Programmer?</h4>
              </Link>
              <p>
                When you start out programming you have no idea what you are going to be doing. All
                you know is that you want to build apps/programs. You might have an idea to build,
                but you wont know how to build it. But before you even think of what language(s) you
                are going to use, you should know some fundamentals.
              </p>
            </div>
          </div>
          <div className='Section'>
            <div className='Videos'>
              <VideoWidget type='History' index={2} videos={videos} />
              <VideoWidget type='History' index={3} videos={videos} />
            </div>
            <div className='Blog Blog-History'>
              <Link to='/history-blog/single-blog/64bafeb548ff0218468f5fb2'>
                <h4>Taiwan History</h4>
              </Link>
              <p>
                I want to describe the situation of the Taiwanese people and their history. Why does
                Taiwan keep showing up in our news? Who wants something from Taiwan? Why is Taiwan
                special? I want to give historical context to the geopolitical situation of
                Taiwanese independence.
              </p>
            </div>
          </div>
        </div>
        <div className='Middle'>
          <div className='Section'>
            <h4>Code Contests</h4>
            <p>MAKE A TEXT-BASED GAME WHERE THE GOAL IS TO SAVE THE PRINCESS</p>
          </div>
          <div className='Section'>
            <h4>Up Coming</h4>
            <p>STARCRAFT 2 GAMEPLAY</p>
            <p>STARCRAFT 2 GAMEPLAY</p>
            <p>STARCRAFT 2 GAMEPLAY</p>
          </div>
          <div className='Section'>
            <h4>Book Club</h4>
            <p>MARCH / APRIL - SHOGUN (JAMES CLAVELL)</p>
          </div>
        </div>
        <div className='Bottom'></div>
      </div>
    </div>
  );
};

const VideoWidget = ({ type, index, videos }) => {
  const getTime = (ogTime) => {
    const years = Math.floor(Math.abs(new Date() - new Date(ogTime)) / 86400000 / 365);
    if (years > 1) {
      return `${years} years ago`;
    }

    const months = Math.floor(Math.abs(new Date() - new Date(ogTime)) / 86400000 / 12);
    if (months > 1) {
      return `${months} months ago`;
    }

    const days = Math.floor(Math.abs(new Date() - new Date(ogTime)) / 86400000);
    if (days > 1) {
      return `${days} days ago`;
    }

    const hours = Math.floor(Math.abs(new Date() - new Date(ogTime)) / (86400000 / 24));
    if (hours > 1) {
      return `${hours} hours ago`;
    }
  };

  const views = (viewCount) => {
    if (viewCount > 1000000) {
      return `${Math.floor(viewCount / 1000000)}M views`;
    }
    if (viewCount > 1000) {
      return `${Math.floor(viewCount / 1000)}K views`;
    }
    return `${viewCount} views`;
  };

  let side = 'Video-Right';
  if (index == 0 || index == 2) {
    side = 'Video-Left';
  }

  let linkClass = `Video ${type} ${side}`;

  return (
    <a
      className={linkClass}
      href={videos ? `https://www.youtube.com/watch?v=${videos[index].id}` : ''}
    >
      {videos ? <img src={videos[index].snippet.thumbnails.high.url} alt='' /> : null}
      <div className='Info'>
        {videos ? <h4>{videos[index].snippet.title}</h4> : null}
        <div className='Misc'>
          {videos ? <p>{views(videos[index].statistics.viewCount)}</p> : null}
          <div className='Dot'></div>
          {videos ? <p>{getTime(videos[index].snippet.publishedAt)}</p> : null}
        </div>
      </div>
    </a>
  );
};

export default Home;
