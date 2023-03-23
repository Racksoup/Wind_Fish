import React, { useEffect, useState } from 'react';
import './Home.scss';
import { selectVideos, getYoutube } from '../../../Redux/youtubeSlice';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getYoutube());
  }, []);

  const videos = useSelector(selectVideos);

  return (
    <div className='Home'>
      <div className='Content'>
        <div className='Top'>
          <div className='Section'>
            <div className='Videos'>
              <VideoWidget type='Dev' index={0} videos={videos} />
              <VideoWidget type='Dev' index={1} videos={videos} />
            </div>
            <div className='Blog Blog-Dev'>
              <a href=''>
                <h4>The First Dev Blog</h4>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            </div>
          </div>
          <div className='Section'>
            <div className='Videos'>
              <VideoWidget type='History' index={2} videos={videos} />
              <VideoWidget type='History' index={3} videos={videos} />
            </div>
            <div className='Blog Blog-History'>
              <a href=''>
                <h4>The First Dev Blog</h4>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
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
