import React from 'react';
import styled from 'styled-components';
import { FiPauseCircle, FiPlayCircle } from 'react-icons/fi';
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

const ReducedMotionToggle = ({ className }) => {
  const { reducedMotion, toggleReducedMotion } = useThemeMode();
  const Icon = reducedMotion ? FiPauseCircle : FiPlayCircle;
  return (
    <ToggleButton
      className={className}
      type="button"
      $on={reducedMotion}
      onClick={toggleReducedMotion}
      aria-label={reducedMotion ? 'Resume motion' : 'Pause motion'}
      aria-pressed={reducedMotion}
      title={reducedMotion ? 'Motion paused' : 'Motion playing'}
    >
      <Icon />
    </ToggleButton>
  );
};

export default ReducedMotionToggle;
