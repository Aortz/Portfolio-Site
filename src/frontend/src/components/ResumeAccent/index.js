import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OctahedronShape from './OctahedronShape';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 6%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;

  & canvas {
    pointer-events: auto;
  }

  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
    left: 2%;
    opacity: 0.35;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ResumeAccent = () => (
  <Wrapper aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.7} />
        <OctahedronShape />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default ResumeAccent;
