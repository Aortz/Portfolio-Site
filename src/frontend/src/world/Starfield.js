import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../theme/ThemeProvider';

const STAR_COUNT = 3500;
const SPREAD = 420;      // cube edge, centred on the route
const ROT_SPEED = 0.005; // rad/sec

const Starfield = () => {
  const ref = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();

  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * SPREAD;
      arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD - 70; // bias along route
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * ROT_SPEED;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        fog={false}
        size={0.14}
        sizeAttenuation
        color={theme.color.fgSubtle}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Starfield;
