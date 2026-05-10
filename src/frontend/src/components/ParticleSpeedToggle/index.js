import React from 'react';
import styled from 'styled-components';
import { FiActivity } from 'react-icons/fi';
import { useThemeMode } from '../../theme/ThemeProvider';

const SPEED_LABEL = { slow: '0.5×', normal: '1×', fast: '2×' };

const ToggleButton = styled.button`
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: 0 ${({ theme }) => theme.space[3]};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.color.fgMuted};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.sm};
  font-weight: 500;
  letter-spacing: 0.04em;
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
    width: 16px;
    height: 16px;
  }
`;

const ParticleSpeedToggle = ({ className }) => {
  const { particleSpeed, cycleParticleSpeed } = useThemeMode();
  return (
    <ToggleButton
      className={className}
      type="button"
      onClick={cycleParticleSpeed}
      aria-label={`Particle speed: ${particleSpeed}. Click to cycle.`}
      title={`Particle speed: ${particleSpeed}`}
    >
      <FiActivity />
      {SPEED_LABEL[particleSpeed]}
    </ToggleButton>
  );
};

export default ParticleSpeedToggle;
