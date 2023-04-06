import React from 'react';
import './Projects.scss';
import FitnessStore from '../../../../images/FitnessStore.png';
import GameRoom from '../../../../images/GameRoom.png';
import PandaNFTs from '../../../../images/PandaNFTs.png';
import PetStore from '../../../../images/PetStore.png';
import StefanosFamilyPizzeria from '../../../../images/StefanosFamilyPizzeria.png';
import XPChart from '../../../../images/XPChart.png';

const Projects = () => {
  return (
    <div className='Projects'>
      <h2>Projects</h2>
      <h4>Looking for a unique website with style?</h4>
      <a href='https://www.connorrack.ca' target='_blank'>
        <button className='Start'>Get Started</button>
      </a>
      <div className='Line'>
        <p>Need to see the code?</p>
        <a href='https://github.com/Racksoup' target='_blank'>
          <button className='Github'>GitHub</button>
        </a>
      </div>
      <div className='Section'>
        <h3>Websites</h3>
        <div className='Underline' />
        <div className='Items'>
          <a href='https://fitness-store.onrender.com/' target='_blank'>
            <h5>Fitness Store</h5>
            <img src={FitnessStore} alt='Fitness Store' />
          </a>
          <a href='https://nft-website.onrender.com/' target='_blank'>
            <h5>Panda NFT's</h5>
            <img src={PandaNFTs} alt='Panda NFTs' />
          </a>
          <a href='https://pet-store.onrender.com/' target='_blank'>
            <h5>Pet Store</h5>
            <img src={PetStore} alt='Pet Store' />
          </a>
          <a href='https://stefanos-family-pizzeria.onrender.com/' target='_blank'>
            <h5>Stefanos Family Pizzeria</h5>
            <img src={StefanosFamilyPizzeria} alt='Stefanos Family Pizzeria' />
          </a>
        </div>
      </div>
      <div className='Section'>
        <h3>Game Addons</h3>
        <div className='Underline' />
        <div className='Items'>
          <a href='https://www.curseforge.com/wow/addons/game-room' target='_blank'>
            <h5>Game Room</h5>
            <img src={GameRoom} alt='Game Room' />
          </a>
          <a href='https://www.curseforge.com/wow/addons/xp-chart' target='_blank'>
            <h5>XP Chart</h5>
            <img src={XPChart} alt='XP Chart' />
          </a>
          <div className='PlaceHolder'></div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
