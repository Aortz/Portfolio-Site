import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import Telemetry from './components/Telemetry';
import GridOverlay from './components/GridOverlay';
import ScrollToTop from './components/ScrollToTop';
import TeleopRail from './components/TeleopRail';
import { RouteContainer } from './pages/Home/HomePageElements';
import { GlobalStyles } from './components/Fonts/Fonts';
import { ThemeProvider } from './theme/ThemeProvider';
import { TeleopProvider } from './teleop/TeleopProvider';
import Home from './pages/Home/index';

const ParticleBg = lazy(() => import('./components/ParticleBg'));

export default function App() {
  return (
    <ThemeProvider>
      <TeleopProvider>
        <Router>
          <GlobalStyles />
          <Suspense fallback={null}>
            <ParticleBg />
          </Suspense>
          <GridOverlay />
          <Navbar />
          <VerticalNavbar />
          <TeleopRail />
          <RouteContainer>
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </RouteContainer>
          <Telemetry />
          <ScrollToTop />
        </Router>
      </TeleopProvider>
    </ThemeProvider>
  );
}
