import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import TorusKnotShape from './TorusKnotShape';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translateY(-50%);
  width: 360px;
  height: 360px;
  z-index: 0;
  pointer-events: none;

  & canvas {
    pointer-events: auto;
  }

  @media screen and (max-width: 1024px) {
    width: 240px;
    height: 240px;
    right: 2%;
    opacity: 0.45;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const AboutAccent = () => (
  <Wrapper aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 5]} intensity={0.7} />
        <TorusKnotShape />
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default AboutAccent;
