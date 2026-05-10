import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useTheme } from 'styled-components';

const OctahedronShape = () => {
  const ref = useRef();
  const theme = useTheme();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.08;
      ref.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.3, 0]} />
      <meshBasicMaterial color={theme.color.bg} transparent opacity={0.05} />
      <Edges threshold={1} color={theme.color.accent} />
    </mesh>
  );
};

export default OctahedronShape;
