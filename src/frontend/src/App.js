import { Fragment, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from './components/Model.js'
import { Box } from './components/Box.js'
import Text from './components/TextGeometry.js'

export default function App() {
  return (
    <>
      {/* <Fragment> Hi There </Fragment> */}
      {/* Canvas 1 */}
      <Canvas>
        <Suspense fallback={null}>
            {/* <Model /> */}
            <OrbitControls autoRotate rotateSpeed={0.01}/>
            <Environment preset="forest" background />
        </Suspense>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* <Box position={[-2.4, 0, 0]}/> */}
        <Box position={[0, 0, 0]}/>
        {/* <Box position={[2.4, 0, 0]}/> */}
        {/* <Text position={[-2, 2.5, 0]}/> */}
        {/* <Box position={[-4.8, 0, 0]}/>
        <Box position={[4.8, 0, 0]}/> */}
      </Canvas>
      {/* Canvas 2
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} wireframe={true}/>
        <Box position={[-1.2, 0, 0]} wireframe={true}/>
        <Box position={[1.2, 0, 0]} wireframe={true}/>
        <Box position={[0, 0, 0]} wireframe={true}/>
        <Box position={[-2.4, 0, 0]} wireframe={true}/>
        <Box position={[2.4, 0, 0]} wireframe={true}/>
        <Box position={[-3.6, 0, 0]} wireframe={true}/>
        <Box position={[3.6, 0, 0]} wireframe={true}/>
        <Box position={[-4.8, 0, 0]} wireframe={true}/>
        <Box position={[4.8, 0, 0]} wireframe={true}/>
      </Canvas> */}
    </>
  )
}
