import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBar';
import CustomScrollbar from './components/ScrollBar/CustomScrollbar';
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
import Resume from './pages/resume';
import Experimentation from './pages/experimentation';

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SlideLeftWrapper = styled.p`
  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;
`;

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchData = async () => {
    try {
      // Replace with your API endpoint and fetch data for the current page
      const response = await fetch(`/api/data?page=${page}`);
      const newData = await response.json();

      // Append new data to the existing data
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      // Load the next page of data
      setPage((prevPage) => prevPage + 1);
    }
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
            <RedirectResume navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
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