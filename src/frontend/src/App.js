import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from './components/NavBar';
import { RouteContainer } from './pages/Home/HomePageElements';
import { NavLink, NavMenu } from './components/NavBar/NavbarElements';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import { GlobalStyles } from './components/Fonts/Fonts';
import { ThemeProvider } from './theme/ThemeProvider';
import Home from './pages/Home/index';
import About from './pages/About/about';
import Project from './pages/Project/project.jsx';
import Resume from './pages/Resume/resume';

const slideLeftAnimation = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
`;

const SlideLeftWrapper = styled.div`
  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;
`;

const MOBILE_LINKS = [
  { to: '/', label: '1. HOME', end: true },
  { to: '/about', label: '2. ABOUT ME' },
  { to: '/projects', label: '3. PROJECTS' },
  { to: '/resume', label: '4. RESUME' },
];

const MobileLink = ({ to, label, end, setNavbarOpen }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen(false);
      setAnimate(false);
    }, 600);
  };

  return (
    <NavLink to={to} end={end} onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        <p>{label}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        {navbarOpen ? (
          <NavMenu>
            {MOBILE_LINKS.map((link) => (
              <MobileLink
                key={link.to}
                to={link.to}
                label={link.label}
                end={link.end}
                setNavbarOpen={setNavbarOpen}
              />
            ))}
          </NavMenu>
        ) : (
          <RouteContainer>
            <VerticalNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </RouteContainer>
        )}
      </Router>
    </ThemeProvider>
  );
}
