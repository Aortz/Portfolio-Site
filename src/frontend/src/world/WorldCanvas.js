import React, { Suspense, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
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
import Scenery from './Scenery';
import Sonar from './Sonar';
import GhostRobot from './GhostRobot';
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
  const { hud, mission } = useTeleop();
  const theme = useTheme();
  // Shared transform the robot writes and the camera reads, without React.
  const robotRef = useRef({
    position: new Vector3(),
    quaternion: new Quaternion(),
    tangent: new Vector3(0, 0, -1),
  });

  return (
    <>
      {/* Nebula depth fade; the starfield opts out so distant stars survive. */}
      <fog attach="fog" args={[theme.color.bg, 120, 480]} />
      {/* Lights only matter to the textured player robot; every wireframe
          uses MeshBasicMaterial and ignores them. */}
      <hemisphereLight args={['#e6fbff', '#233138', 1.8]} />
      <directionalLight position={[6, 10, 4]} intensity={2.2} />
      <directionalLight position={[-8, 4, -6]} intensity={0.8} color={'#22d3ee'} />
      <Starfield />
      {PLATFORMS.map((p) => (
        <Platform
          key={p.id}
          platform={p}
          active={hud.waypointId === p.id}
          discovered={!p.hidden || mission.visited.includes(p.id)}
        />
      ))}
      <Scenery />
      <Sonar />
      <Suspense fallback={null}>
        <GhostRobot />
      </Suspense>
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
        camera={{ fov: 50, near: 0.1, far: 500, position: [0, 4, 12] }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <WorldScene />
      </Canvas>
    </Root>
  );
};

export default WorldCanvas;
