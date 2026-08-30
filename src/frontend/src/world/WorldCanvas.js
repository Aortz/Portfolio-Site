import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';
import { useThemeMode } from '../theme/ThemeProvider';
import { useTeleop } from '../teleop/TeleopProvider';
import Starfield from './Starfield';
import Platform from './Platform';
import Landmarks from './Landmarks';
import Cores from './Cores';
import PlayerRobot from './PlayerRobot';
import ChaseCamera from './ChaseCamera';
import { PLATFORMS } from './path';

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  & canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

const WorldScene = () => {
  const { hud } = useTeleop();
  // Shared transform the robot writes and the camera reads, without React.
  const robotRef = useRef({
    position: new Vector3(),
    quaternion: new Quaternion(),
    tangent: new Vector3(0, 0, -1),
  });

  return (
    <>
      <Starfield />
      {PLATFORMS.map((p) => (
        <Platform key={p.id} platform={p} active={hud.waypointId === p.id} />
      ))}
      <Landmarks />
      <Cores />
      <Suspense fallback={null}>
        <PlayerRobot robotRef={robotRef} />
      </Suspense>
      <ChaseCamera robotRef={robotRef} />
    </>
  );
};

const WorldCanvas = () => {
  const { reducedMotion } = useThemeMode();
  return (
    <Root aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ fov: 50, near: 0.1, far: 220, position: [0, 4, 12] }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <WorldScene />
      </Canvas>
    </Root>
  );
};

export default WorldCanvas;
