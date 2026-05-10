import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'styled-components';

const COUNT = 700;

const ParticleField = () => {
  const ref = useRef();
  const theme = useTheme();

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={theme.color.fgSubtle}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
};

export default ParticleField;
