import React from 'react'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const Model = () => {
  const gltf = useLoader(GLTFLoader, '/Poimandres.gltf'); // Make sure the path is correct
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
};

