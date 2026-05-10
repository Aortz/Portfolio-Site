import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import { RouteContainer } from './pages/Home/HomePageElements';
import { GlobalStyles } from './components/Fonts/Fonts';
import { ThemeProvider } from './theme/ThemeProvider';
import Home from './pages/Home/index';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <Navbar />
        <RouteContainer>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </RouteContainer>
      </Router>
    </ThemeProvider>
  );
}
