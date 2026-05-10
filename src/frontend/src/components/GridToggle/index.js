import React from 'react';
import styled from 'styled-components';
import { FiGrid } from 'react-icons/fi';
import { useThemeMode } from '../../theme/ThemeProvider';

const ToggleButton = styled.button`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid
    ${({ theme, $on }) => ($on ? theme.color.accent : theme.color.border)};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, $on }) => ($on ? theme.color.accent : theme.color.fgMuted)};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.fg};
    border-color: ${({ theme }) => theme.color.accent};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const GridToggle = ({ className }) => {
  const { gridVisible, toggleGrid } = useThemeMode();
  return (
    <ToggleButton
      className={className}
      type="button"
      $on={gridVisible}
      onClick={toggleGrid}
      aria-label={gridVisible ? 'Hide grid lines' : 'Show grid lines'}
      aria-pressed={gridVisible}
      title={gridVisible ? 'Hide grid lines' : 'Show grid lines'}
    >
      <FiGrid />
    </ToggleButton>
  );
};

export default GridToggle;
