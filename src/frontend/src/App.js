import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import Telemetry from './components/Telemetry';
import TeleopRail from './components/TeleopRail';
import HintToast from './components/HintToast';
import MiniMap from './components/MiniMap';
import { RouteContainer } from './pages/Home/HomePageElements';
import { GlobalStyles } from './components/Fonts/Fonts';
import { ThemeProvider } from './theme/ThemeProvider';
import { TeleopProvider } from './teleop/TeleopProvider';
import useIsDesktop3D from './hooks/useIsDesktop3D';
import Home from './pages/Home/index';

const WorldCanvas = lazy(() => import('./world/WorldCanvas'));
const WorldGlobalStyles = lazy(() => import('./world/WorldGlobalStyles'));
const SectionDock = lazy(() => import('./components/SectionDock'));

export default function App() {
  const world = useIsDesktop3D();

  return (
    <ThemeProvider>
      <TeleopProvider mode={world ? 'world' : 'page'}>
        <Router>
          <GlobalStyles />
          <Navbar />
          <VerticalNavbar />
          {world ? (
            <Suspense fallback={null}>
              <WorldGlobalStyles />
              <WorldCanvas />
              <SectionDock />
              <TeleopRail />
              <HintToast />
              <MiniMap />
            </Suspense>
          ) : (
            <RouteContainer>
              <Routes>
                <Route path="*" element={<Home />} />
              </Routes>
            </RouteContainer>
          )}
          <Telemetry />
        </Router>
      </TeleopProvider>
    </ThemeProvider>
  );
}
