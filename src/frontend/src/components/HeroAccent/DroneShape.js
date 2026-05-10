import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshBasicMaterial, Box3, Vector3 } from 'three';
import { useTheme } from 'styled-components';

const DroneShape = () => {
  const ref = useRef();
  const theme = useTheme();
  const obj = useLoader(OBJLoader, '/drone/drone.obj');

  // Clone so multiple mounts don't share materials.
  const cloned = useMemo(() => {
    const c = obj.clone(true);

    // Auto-fit: compute bounding box, normalize to ~3 units, center on origin.
    const bbox = new Box3().setFromObject(c);
    const size = new Vector3();
    bbox.getSize(size);
    const center = new Vector3();
    bbox.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3 / maxDim;
    c.scale.setScalar(scale);
    c.position.sub(center.multiplyScalar(scale));
    return c;
  }, [obj]);

  // Replace every material with a wireframe in the accent color.
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
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
};

export default DroneShape;
