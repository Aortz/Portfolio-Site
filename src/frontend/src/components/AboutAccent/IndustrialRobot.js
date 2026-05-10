import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

useGLTF.preload('/ux3d_industrial_robot/scene.gltf');

const IndustrialRobot = ({ hovered }) => {
  const ref = useRef();
  const { scene } = useGLTF('/ux3d_industrial_robot/scene.gltf');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    const bbox = new Box3().setFromObject(c);
    const size = new Vector3();
    const center = new Vector3();
    bbox.getSize(size);
    bbox.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3 / maxDim;
    c.scale.setScalar(scale);
    c.position.sub(center.multiplyScalar(scale));
    return c;
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current || hovered) return;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
};

export default IndustrialRobot;
