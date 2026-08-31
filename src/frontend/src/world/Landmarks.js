import React, { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../theme/ThemeProvider';
import useWireframeGLTF, { DRACO_PATH } from './models/useWireframeGLTF';
import { PLATFORMS } from './path';

// Only the two models visible at spawn/HOME are preloaded; the others stream
// in inside their own Suspense boundary when their platform first renders.
useGLTF.preload('/drone/drone.glb', DRACO_PATH);

/* ---- Drone: orbits the HOME beacon ------------------------------------ */
const ORBIT_R = 4.2;
const ORBIT_SPEED = 0.3;
const Drone = () => {
  const ref = useRef();
  const obj = useWireframeGLTF('/drone/drone.glb', { radius: 1.4, opacity: 0.8 });
  const { reducedMotion } = useThemeMode();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = reducedMotion ? 0 : clock.elapsedTime * ORBIT_SPEED;
    ref.current.position.set(Math.cos(t) * ORBIT_R, 3.2 + Math.sin(t * 2) * 0.3, Math.sin(t) * ORBIT_R);
    ref.current.rotation.y = -t + Math.PI / 2;
  });
  return (
    <group ref={ref}>
      <primitive object={obj} />
    </group>
  );
};

/* ---- Industrial arm: parked on ABOUT ---------------------------------- */
const IndustrialRobot = () => {
  const ref = useRef();
  const obj = useWireframeGLTF('/ux3d_industrial_robot/scene.glb', { maxDim: 3.5 });
  const { reducedMotion } = useThemeMode();
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.18;
  });
  return (
    <group ref={ref} position={[0, 1.9, 0]}>
      <primitive object={obj} />
    </group>
  );
};

/* ---- Hands: floating over RESUME -------------------------------------- */
const Hands = () => {
  const ref = useRef();
  const obj = useWireframeGLTF('/hands/scene.glb', { maxDim: 2.5 });
  const { reducedMotion } = useThemeMode();
  useFrame(({ clock }, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.position.y = 2.0 + Math.sin(clock.elapsedTime * 0.8) * 0.15;
  });
  return (
    <group ref={ref} position={[0, 2.0, 0]}>
      <primitive object={obj} />
    </group>
  );
};

/* ---- Procedural: icosahedron (PROJECTS) / torus knot (GALLERY) --------- */
const ProceduralNode = ({ kind }) => {
  const ref = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x += delta * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 2.2, 0]}>
      {kind === 'knot' && <torusKnotGeometry args={[1.0, 0.32, 96, 12, 2, 3]} />}
      {kind === 'ico' && <icosahedronGeometry args={[1.6, 1]} />}
      {kind === 'dodeca' && <dodecahedronGeometry args={[1.4, 0]} />}
      <meshBasicMaterial color={theme.color.accent} wireframe transparent opacity={0.7} />
    </mesh>
  );
};

const LANDMARK_BY_ID = {
  signal: () => <ProceduralNode kind="dodeca" />,
  home: Drone,
  about: IndustrialRobot,
  projects: () => <ProceduralNode kind="ico" />,
  gallery: () => <ProceduralNode kind="knot" />,
  resume: Hands,
};

// Set pieces sit off the pad centre so they never overlap the parked robot.
const LANDMARK_OFFSET = [4.5, 0.5, -3.0];

const Landmarks = () => (
  <>
    {PLATFORMS.map((p) => {
      const L = LANDMARK_BY_ID[p.id];
      const pos = p.id === 'home'
        ? p.pos
        : [p.pos[0] + LANDMARK_OFFSET[0], p.pos[1] + LANDMARK_OFFSET[1], p.pos[2] + LANDMARK_OFFSET[2]];
      return (
        <group key={p.id} position={pos}>
          <Suspense fallback={null}>
            <L />
          </Suspense>
        </group>
      );
    })}
  </>
);

export default Landmarks;
