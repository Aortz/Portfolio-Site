import React, { useState } from 'react';
import Navbar from './components/NavBar';
import CustomScrollbar from './components/ScrollBar/CustomScrollbar';
import {
  repos,
} from "./editable-stuff/config.js";

import {
  NavLink,
  NavMenu,
  GlobalStyles
} from './components/NavBar/NavbarElements';
  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/index';
import About from './pages/about';
import Project from './pages/Project/project.jsx';
import Resume from './pages/resume';
import Experimentation from './pages/experimentation';


const Container = styled.div`
  /* Your main content container styles here */
  padding-top: 60px; /* Adjust the padding to create space for the fixed navbar */
`;

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <Router>
      <GlobalStyles />
      {/* Pass the state and setState to NavBar component */}
      <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <>
        {navbarOpen ? (
          <NavMenu>
            <NavLink to='/' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"01. <HOME/>"}</p>
            </NavLink>
            <NavLink to='/about' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"02. <ABOUT/>"}</p>
            </NavLink>
            <NavLink to='/projects' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"03. <PROJECTS/>"}</p>
            </NavLink>
            <NavLink to='/resume' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"04. <RESUME/>"}</p>
            </NavLink>
            <NavLink to='/experimentation' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"05. <EXPERIMENT/>"}</p>
            </NavLink>
          </NavMenu>) : 
          (<CustomScrollbar>
            <Container>
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
                    // <Cube/>
                  }
                />
                <Route path='/resume' element={<Resume />} />
                <Route path='/experimentation' element={<Experimentation />} />
              </Routes>
            </Container>
          </CustomScrollbar>
          )
        }
      </>
    </Router>
  );
}
