import React, { useRef } from 'react';
import { Helmet } from "react-helmet";
import { repos } from "./editable-stuff/config.js";
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import { GlobalStyles } from './components/Fonts/Fonts';
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home/index';
import About from './pages/About/about';
import Project from './pages/Project/project.jsx';
import Navbar from './components/NavBar';

export default function App() {
  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const mainContentRef = useRef(null); // Ref for MainContent

  const scrollToSection = (ref) => {
    if (mainContentRef.current && ref.current) {
      const navbarHeight = 70; // Adjust based on your navbar height
      const sectionTop = ref.current.offsetTop - navbarHeight;
      mainContentRef.current.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AppContainer>
      <Helmet>
        <title>Lee Junwei</title>
      </Helmet>
      {/* <SpeedInsights /> */}
      <GlobalStyles />
      <VerticalNavbar />
      <Navbar 
        scrollToSection={scrollToSection} 
        refs={{ homeRef, aboutRef, projectsRef }}
      />
      <MainContent ref={mainContentRef}>
        <Section ref={homeRef} id="home">
          <Home ref={homeRef} />
        </Section>
        <Section ref={aboutRef} id="about">
          <About />
        </Section>
        <Section ref={projectsRef} id="projects">
          <Project
            heading={repos.heading}
            username={repos.gitHubUsername}
            length={repos.reposLength}
            specfic={repos.specificRepos}
          />
        </Section>
      </MainContent>
    </AppContainer>
  );
}

// Styled component for sections
const Section = styled.section`
  min-height: 100vh;
  height: auto; // Allow content to determine height
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

// Add a styled component for the main content
const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  height: calc(100vh - 70px); // Account for navbar height
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// Add a styled component for the app container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  position: relative;
`;
