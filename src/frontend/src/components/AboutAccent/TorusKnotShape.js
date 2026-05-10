import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useTheme } from 'styled-components';

const TorusKnotShape = ({ hovered }) => {
  const ref = useRef();
  const theme = useTheme();

  useFrame((_, delta) => {
    if (!ref.current || hovered) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y -= delta * 0.18;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.9, 0.28, 120, 16]} />
      <meshBasicMaterial color={theme.color.bg} transparent opacity={0.05} />
      <Edges threshold={5} color={theme.color.accent} />
    </mesh>
  );
};

export default TorusKnotShape;
