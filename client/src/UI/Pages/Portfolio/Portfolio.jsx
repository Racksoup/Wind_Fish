import React from 'react';
import './Portfolio.scss';
import About from './About/About.jsx';
import Cover from './Cover/Cover.jsx';
import Entertainment from './Entertainment/Entertainment.jsx';
import Projects from './Projects/Projects.jsx';
import Footer from './Footer/Footer.jsx';
import Navbar from '../../Components/Navbar/Navbar.jsx';

const Portfolio = () => {
  return (
    <div className='Portfolio'>
      <Navbar />
      <Cover />
      <About />
      <Entertainment />
      <Projects />
      <Footer />
    </div>
  );
};

export default Portfolio;
