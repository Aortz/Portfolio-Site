import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import OctahedronShape from './OctahedronShape';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 6%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  z-index: 0;
  pointer-events: none;

  & canvas {
    pointer-events: auto;
  }

  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
    right: 2%;
    opacity: 0.4;
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
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default ResumeAccent;
