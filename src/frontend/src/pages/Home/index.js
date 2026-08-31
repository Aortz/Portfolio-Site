import React from 'react';
import { ParentContainer } from './HomePageElements';
import Hero from './Hero';
import About from '../About/about';
import Project from '../Project/project';
import Gallery from '../Gallery';
import ResumeSection from '../Resume/resume';

/* Page mode (phones, touch-only tablets, no WebGL): the plain vertical site. */
const Home = () => (
  <>
    <ParentContainer style={{ minHeight: '100vh' }}>
      <Hero />
    </ParentContainer>
    <About />
    <Project />
    <Gallery />
    <ResumeSection />
  </>
);

export default Home;
