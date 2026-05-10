import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useTheme } from 'styled-components';

const GearShape = () => {
  const ref = useRef();
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current || hovered) return;
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[1.0, 0.32, 16, 48]} />
      <meshBasicMaterial color={theme.color.bg} transparent opacity={0.05} />
      <Edges threshold={1} color={theme.color.accent} />
    </mesh>
  );
};

export default GearShape;
