import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useTheme } from 'styled-components';

const OctahedronShape = () => {
  const ref = useRef();
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current || hovered) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1.3, 0]} />
      <meshBasicMaterial color={theme.color.bg} transparent opacity={0.05} />
      <Edges threshold={1} color={theme.color.accent} />
    </mesh>
  );
};

export default OctahedronShape;
