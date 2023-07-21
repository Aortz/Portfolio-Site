import React from 'react';
import { Canvas } from '@react-three/fiber';
import CubeFace from './CubeFace';

const Cube = () => {
  return (
    <>
        <Canvas>
        {/* Add lighting and other 3D scene setup if needed */}
        <CubeFace position={[0, 0, 1]} color="red" />
        <CubeFace position={[0, 0, -1]} color="green" />
        <CubeFace position={[1, 0, 0]} color="blue" />
        <CubeFace position={[-1, 0, 0]} color="yellow" />
        <CubeFace position={[0, 1, 0]} color="purple" />
        <CubeFace position={[0, -1, 0]} color="orange" />
        </Canvas>
    </>
  );
};

export default Cube;
