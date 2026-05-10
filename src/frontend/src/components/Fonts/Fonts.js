import { createGlobalStyle } from 'styled-components';
import IBMPlexMonoBold from '../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
  /* Google Fonts: JetBrains Mono (primary), Inter (sans), Kolker Brush (accent — Easter-egg only) */
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&family=Kolker+Brush&display=swap');

  /* Local IBM Plex Mono Bold kept as a monospace fallback */
  @font-face {
    font-family: 'IBMPlexMonoBold';
    src: url(${IBMPlexMonoBold}) format('truetype');
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 100px;
  }

  html,
  body {
    background: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.fg};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.size.base};
    line-height: 1.6;
    transition:
      background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
      color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${({ theme }) => theme.color.accent};
    color: ${({ theme }) => theme.color.onAccent};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
