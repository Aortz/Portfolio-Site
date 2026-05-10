import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import Telemetry from './components/Telemetry';
import GridOverlay from './components/GridOverlay';
import { RouteContainer } from './pages/Home/HomePageElements';
import { GlobalStyles } from './components/Fonts/Fonts';
import { ThemeProvider } from './theme/ThemeProvider';
import Home from './pages/Home/index';

const ParticleBg = lazy(() => import('./components/ParticleBg'));

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <Suspense fallback={null}>
          <ParticleBg />
        </Suspense>
        <GridOverlay />
        <Navbar />
        <VerticalNavbar />
        <RouteContainer>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </RouteContainer>
        <Telemetry />
      </Router>
    </ThemeProvider>
  );
}
