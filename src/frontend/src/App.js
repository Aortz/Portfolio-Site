import React, { useState, useRef } from 'react';
// Remove Router imports and add smooth scroll polyfill if needed
import smoothscroll from 'smoothscroll-polyfill';
import Navbar from './components/NavBar';
import {
  repos,
} from "./editable-stuff/config.js";
import { RouteContainer } from './pages/Home/HomePageElements';
import {
  NavLink,
  NavMenu,
} from './components/NavBar/NavbarElements';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import { GlobalStyles } from './components/Fonts/Fonts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Home from './pages/Home/index';
import About from './pages/About/about';
import Project from './pages/Project/project.jsx';
import Resume from './pages/Resume/resume';

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SlideLeftWrapper = styled.div`
  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;
`;

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Create refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const resumeRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setNavbarOpen(false);
  };

  return (
    <Router>
      <GlobalStyles />
      {/* Pass the state and setState to NavBar component */}
      <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <>
        {navbarOpen ? (
          <NavMenu>
            <RedirectHome navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
            <RedirectAbout navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
            <RedirectProjects navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
            {/* <RedirectResume navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/> */}
            {/* <NavLink to='/experimentation' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"05. <EXPERIMENT/>"}</p>
            </NavLink> */}
          </NavMenu>) : 
          (
            // <CustomScrollbar></CustomScrollbar>
            <RouteContainer>
              <VerticalNavbar/>
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route
                  path='/projects'
                  element={
                    <Project
                      heading={repos.heading}
                      username={repos.gitHubUsername}
                      length={repos.reposLength}
                      specfic={repos.specificRepos}
                    />
                  }
                />
                <Route path='/resume' element={<Resume />} />
                {/* <Route path='/experimentation' element={<Experimentation />} /> */}
              </Routes>
            </RouteContainer>
          )
        }
      </>
    </Router>
  );
}

const RedirectHome = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
          <p>{"01. <HOME/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

const RedirectProjects = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/projects' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
        <p>{"03. <PROJECTS/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

const RedirectResume = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/resume' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
        <p>{"04. <RESUME/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

const RedirectAbout = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/about' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
        <p>{"02. <ABOUT/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};
