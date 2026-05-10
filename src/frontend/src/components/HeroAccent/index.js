import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DroneShape from './DroneShape';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 360px;
  height: 360px;
  z-index: 1;
  pointer-events: none;

  & canvas {
    pointer-events: auto;
  }

  @media screen and (max-width: 1024px) {
    width: 240px;
    height: 240px;
    right: 2%;
    opacity: 0.6;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HeroAccent = () => (
  <Wrapper aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 5]} intensity={0.7} />
        <DroneShape />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default HeroAccent;
