import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.55;

  & canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

const ParticleBg = () => (
  <Wrapper aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 12], fov: 65 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default ParticleBg;
