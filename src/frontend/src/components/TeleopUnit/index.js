import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { useTeleop } from '../../teleop/TeleopProvider';
import { useThemeMode } from '../../theme/ThemeProvider';
import RobotWalker from './RobotWalker';

/* Fixed bottom-left display box for the RECON-2 field unit. Pure display —
   pointer-events are off so wheel scrolling over it still reaches the page
   (and the provider's manual-scroll detector). */
const UnitRoot = styled.div`
  position: fixed;
  left: 16px;
  bottom: 16px;
  width: 180px;
  height: 180px;
  z-index: 997;
  pointer-events: none;

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.surface};
  overflow: hidden;

  & canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: ${({ theme }) => theme.color.accent};
    opacity: 0.65;
    pointer-events: none;
    z-index: 2;
  }
  &::before {
    top: 8px;
    left: 8px;
    border-top: 1.5px solid;
    border-left: 1.5px solid;
  }
  &::after {
    bottom: 8px;
    right: 8px;
    border-bottom: 1.5px solid;
    border-right: 1.5px solid;
  }

  @media screen and (max-height: 720px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const UnitBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 8px 10px 10px;
  background: linear-gradient(
    ${({ theme }) => theme.color.surface} 55%,
    transparent
  );
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 10px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.fgSubtle};
  z-index: 3;
  pointer-events: none;

  & .wp {
    color: ${({ theme, $armed }) =>
      $armed ? theme.color.accent : theme.color.fgMuted};
    font-weight: 600;
  }
`;

const TeleopUnit = () => {
  const { expanded, armed, hud } = useTeleop();
  const { reducedMotion } = useThemeMode();

  if (!expanded) return null;

  return (
    <UnitRoot aria-hidden="true">
      <UnitBadge $armed={armed}>
        <span>{'// FIELD UNIT — RECON-2'}</span>
        <span className="wp">{`WPT ${hud.waypoint}`}</span>
      </UnitBadge>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={armed && !reducedMotion ? 'always' : 'demand'}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.7} />
          <RobotWalker />
        </Suspense>
      </Canvas>
    </UnitRoot>
  );
};

export default TeleopUnit;
