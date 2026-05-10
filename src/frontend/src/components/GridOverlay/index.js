import React from 'react';
import styled from 'styled-components';
import { useThemeMode } from '../../theme/ThemeProvider';

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: ${({ $on }) => ($on ? 0.18 : 0)};
  transition: opacity ${({ theme }) => theme.motion.base}
    ${({ theme }) => theme.motion.ease};
  background-image:
    linear-gradient(
      to right,
      ${({ theme }) => theme.color.fgSubtle} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.color.fgSubtle} 1px,
      transparent 1px
    ),
    linear-gradient(
      to right,
      ${({ theme }) => theme.color.accent} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.color.accent} 1px,
      transparent 1px
    );
  background-size: 48px 48px, 48px 48px, 192px 192px, 192px 192px;
`;

const GridOverlay = () => {
  const { gridVisible } = useThemeMode();
  return <Layer aria-hidden="true" $on={gridVisible} />;
};

export default GridOverlay;
