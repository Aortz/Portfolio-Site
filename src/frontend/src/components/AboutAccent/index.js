import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import IndustrialRobot from './IndustrialRobot';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

const AboutAccent = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Wrapper
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.0} />
          <IndustrialRobot hovered={hovered} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default AboutAccent;
