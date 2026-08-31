import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../theme/ThemeProvider';
import { useTeleop } from '../teleop/TeleopProvider';
import { PLATFORMS } from './path';

// Hover height matches the robot's jump apex (ride 0.9 + apex ~1.56) so
// jumping while docked visibly passes through the core.
const CORE_Y = 2.6;

const Core = ({ platform, collected, docked }) => {
  const ref = useRef();
  const halo = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    if (reducedMotion) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y += delta * (docked ? 1.6 : 0.6);
    ref.current.rotation.x = Math.sin(t * 0.9) * 0.35;
    ref.current.position.y = CORE_Y + Math.sin(t * 1.7) * 0.12;
    if (halo.current) {
      const s = 1 + Math.sin(t * 3) * (docked ? 0.25 : 0.1);
      halo.current.scale.setScalar(s);
    }
  });

  if (collected) return null;

  return (
    <group position={platform.pos}>
      <mesh ref={ref} position={[0, CORE_Y, 0]}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshBasicMaterial color={theme.color.accent} wireframe transparent opacity={0.95} />
      </mesh>
      <mesh ref={halo} position={[0, CORE_Y, 0]}>
        <sphereGeometry args={[0.32, 10, 10]} />
        <meshBasicMaterial
          color={theme.color.accent}
          transparent
          opacity={docked ? 0.5 : 0.25}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/* One data core per platform. Collected by jumping while docked. */
const Cores = () => {
  const { mission, hud } = useTeleop();
  return (
    <>
      {PLATFORMS.filter((p) => !p.hidden).map((p) => (
        <Core
          key={p.id}
          platform={p}
          collected={mission.cores.includes(p.id)}
          docked={hud.waypointId === p.id}
        />
      ))}
    </>
  );
};

export default Cores;
