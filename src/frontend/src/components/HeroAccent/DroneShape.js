import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3, MeshBasicMaterial } from 'three';
import { useTheme } from 'styled-components';

useGLTF.preload('/drone/drone.glb');

const DroneShape = ({ hovered }) => {
  const ref = useRef();
  const theme = useTheme();
  const { scene } = useGLTF('/drone/drone.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    const bbox = new Box3().setFromObject(c);
    const size = new Vector3();
    const center = new Vector3();
    bbox.getSize(size);
    bbox.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 6 / maxDim;
    c.scale.setScalar(scale);
    c.position.sub(center.multiplyScalar(scale));
    return c;
  }, [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshBasicMaterial({
          color: theme.color.accent,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
      }
    });
  }, [cloned, theme.color.accent]);

  useFrame((_, delta) => {
    if (!ref.current || hovered) return;
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.15;
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
};

export default DroneShape;
