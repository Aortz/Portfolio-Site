import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useTheme } from 'styled-components';

const GearShape = () => {
  const ref = useRef();
  const theme = useTheme();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.0, 0.32, 16, 48]} />
      <meshBasicMaterial color={theme.color.bg} transparent opacity={0.05} />
      <Edges threshold={1} color={theme.color.accent} />
    </mesh>
  );
};

export default GearShape;
