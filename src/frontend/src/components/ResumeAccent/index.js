import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HandsModel from './HandsModel';

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

const ResumeAccent = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Wrapper
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.7} />
          <HandsModel hovered={hovered} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default ResumeAccent;
