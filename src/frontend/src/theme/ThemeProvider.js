import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { tokensFor } from './tokens';

const THEME_KEY = 'portfolio-theme';
const GRID_KEY = 'portfolio-grid';
const PARTICLE_SPEED_KEY = 'portfolio-particle-speed';

const SPEED_ORDER = ['slow', 'normal', 'fast'];

const ThemeModeContext = createContext({
  mode: 'dark',
  toggleMode: () => {},
  gridVisible: false,
  toggleGrid: () => {},
  particleSpeed: 'normal',
  cycleParticleSpeed: () => {},
});

const initialMode = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const initialGrid = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(GRID_KEY) === 'on';
};

const initialParticleSpeed = () => {
  if (typeof window === 'undefined') return 'normal';
  const stored = window.localStorage.getItem(PARTICLE_SPEED_KEY);
  return SPEED_ORDER.includes(stored) ? stored : 'normal';
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(initialMode);
  const [gridVisible, setGridVisible] = useState(initialGrid);
  const [particleSpeed, setParticleSpeed] = useState(initialParticleSpeed);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  useEffect(() => {
    window.localStorage.setItem(GRID_KEY, gridVisible ? 'on' : 'off');
  }, [gridVisible]);

  useEffect(() => {
    window.localStorage.setItem(PARTICLE_SPEED_KEY, particleSpeed);
  }, [particleSpeed]);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
      gridVisible,
      toggleGrid: () => setGridVisible((v) => !v),
      particleSpeed,
      cycleParticleSpeed: () =>
        setParticleSpeed((s) => {
          const idx = SPEED_ORDER.indexOf(s);
          return SPEED_ORDER[(idx + 1) % SPEED_ORDER.length];
        }),
    }),
    [mode, gridVisible, particleSpeed]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <StyledThemeProvider theme={tokensFor(mode)}>{children}</StyledThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
