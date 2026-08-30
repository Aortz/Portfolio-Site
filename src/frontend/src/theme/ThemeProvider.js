import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { tokensFor } from './tokens';

const THEME_KEY = 'portfolio-theme';
const REDUCED_MOTION_KEY = 'portfolio-reduced-motion';
const QUALITY_KEY = 'portfolio-quality';

const ThemeModeContext = createContext({
  mode: 'dark',
  toggleMode: () => {},
  reducedMotion: false,
  toggleReducedMotion: () => {},
  quality: 'standard',
  toggleQuality: () => {},
});

const initialMode = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const initialReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  const stored = window.localStorage.getItem(REDUCED_MOTION_KEY);
  if (stored === 'on') return true;
  if (stored === 'off') return false;
  // Honor OS preference at first paint when no manual override exists.
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const initialQuality = () => {
  if (typeof window === 'undefined') return 'standard';
  return window.localStorage.getItem(QUALITY_KEY) === 'high' ? 'high' : 'standard';
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(initialMode);
  const [reducedMotion, setReducedMotion] = useState(initialReducedMotion);
  const [quality, setQuality] = useState(initialQuality);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion ? 'on' : 'off';
    window.localStorage.setItem(REDUCED_MOTION_KEY, reducedMotion ? 'on' : 'off');
  }, [reducedMotion]);

  useEffect(() => {
    window.localStorage.setItem(QUALITY_KEY, quality);
  }, [quality]);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
      reducedMotion,
      toggleReducedMotion: () => setReducedMotion((v) => !v),
      quality,
      toggleQuality: () => setQuality((q) => (q === 'high' ? 'standard' : 'high')),
    }),
    [mode, reducedMotion, quality]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <StyledThemeProvider theme={tokensFor(mode)}>{children}</StyledThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
