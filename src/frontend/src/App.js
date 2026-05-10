import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import { RouteContainer } from './pages/Home/HomePageElements';
import { NavAnchor, NavMenu } from './components/NavBar/NavbarElements';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import { GlobalStyles } from './components/Fonts/Fonts';
import { ThemeProvider } from './theme/ThemeProvider';
import Home from './pages/Home/index';

const MOBILE_LINKS = [
  { href: '#home', label: '1. HOME' },
  { href: '#about', label: '2. ABOUT ME' },
  { href: '#projects', label: '3. PROJECTS' },
  { href: '#resume', label: '4. RESUME' },
];

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const closeMenu = () => setNavbarOpen(false);

  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        {navbarOpen ? (
          <NavMenu>
            {MOBILE_LINKS.map((link) => (
              <NavAnchor key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </NavAnchor>
            ))}
          </NavMenu>
        ) : (
          <RouteContainer>
            <VerticalNavbar />
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </RouteContainer>
        )}
      </Router>
    </ThemeProvider>
  );
}
