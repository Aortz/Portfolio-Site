import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute } from 'three';
import { useTheme } from 'styled-components';

const COUNT = 600;
const TOP = 25;
const BOTTOM = -25;
const X_SPREAD = 60;
const Z_SPREAD = 30;

const randSpeed = () => 1.5 + Math.random() * 2.5; // 1.5..4 units/sec
const randX = () => (Math.random() - 0.5) * X_SPREAD;
const randZ = () => (Math.random() - 0.5) * Z_SPREAD;

const ParticleField = () => {
  const ref = useRef();
  const theme = useTheme();

  const { speeds, attr } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speedsArr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i += 1) {
      positions[i * 3] = randX();
      // Stagger initial vertical entry so the stream isn't a single sheet of dots
      positions[i * 3 + 1] = TOP - Math.random() * (TOP - BOTTOM);
      positions[i * 3 + 2] = randZ();
      speedsArr[i] = randSpeed();
    }
    const buf = new BufferAttribute(positions, 3);
    // 35048 = THREE.DynamicDrawUsage — flag the attribute as frequently updated
    buf.setUsage(35048);
    return { speeds: speedsArr, attr: buf };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < COUNT; i += 1) {
      let y = arr[i * 3 + 1] - delta * speeds[i];
      if (y < BOTTOM) {
        arr[i * 3] = randX();
        y = TOP;
        arr[i * 3 + 2] = randZ();
        speeds[i] = randSpeed();
      }
      arr[i * 3 + 1] = y;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={attr} />
      </bufferGeometry>
      <pointsMaterial
        color={theme.color.accent}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
};

export default ParticleField;
