import { createGlobalStyle } from 'styled-components';

/* Applied only in world mode: the document itself must not scroll — the
   SectionDock is the single scrollable surface, and the wheel elsewhere
   drives the robot. */
const WorldGlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }
`;

export default WorldGlobalStyles;
