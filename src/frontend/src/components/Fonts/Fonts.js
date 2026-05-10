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
    font-size: 19px;
    background: ${({ theme }) => theme.color.bg};
    cursor: url('/cursors/robot-default.svg') 16 3, default;
  }

  body {
    color: ${({ theme }) => theme.color.fg};
    font-family: ${({ theme }) => theme.font.sans};
    line-height: 1.6;
    background: transparent;
    transition:
      color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Layered backdrop (gradient blobs + dot grid) on a dedicated layer
     behind the particle canvas. */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background-image:
      radial-gradient(circle at 25% 15%, rgba(6, 182, 212, 0.07), transparent 55%),
      radial-gradient(circle at 80% 85%, rgba(245, 158, 11, 0.04), transparent 55%),
      radial-gradient(
        circle,
        ${({ theme }) => theme.color.fgSubtle} 0.8px,
        transparent 0.8px
      );
    background-size: 100% 100%, 100% 100%, 32px 32px;
  }

  /* Robot-claw cursor on clickable elements */
  a, button, [role="button"], summary, label, select,
  input[type="submit"], input[type="button"], input[type="reset"] {
    cursor: url('/cursors/robot-pointer.svg') 20 9, pointer;
  }

  /* Custom thin scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.surfaceAlt};
    border-radius: ${({ theme }) => theme.radius.pill};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.fgSubtle};
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      `${theme.color.surfaceAlt} transparent`};
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
