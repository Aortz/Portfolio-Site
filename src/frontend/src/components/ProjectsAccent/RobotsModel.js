import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Sphere, MeshBasicMaterial } from 'three';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../../theme/ThemeProvider';

useGLTF.preload('/robots/scene.glb');

const RobotsModel = ({ hovered }) => {
  const ref = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();
  const { scene } = useGLTF('/robots/scene.glb');

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    // Scale by bounding-sphere radius instead of longest-axis: the sphere is
    // rotation-invariant, so the model is guaranteed to fit at every angle.
    // Visible vertical half-extent at z=0 with cam z=5.5 fov=50° is ~2.57, so a
    // target radius of 2.0 leaves a comfortable ~22% margin around the model.
    const bbox = new Box3().setFromObject(c);
    const sphere = new Sphere();
    bbox.getBoundingSphere(sphere);
    const TARGET_RADIUS = 2.0;
    const scale = TARGET_RADIUS / (sphere.radius || 1);
    c.scale.setScalar(scale);
    c.position.sub(sphere.center.clone().multiplyScalar(scale));
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
    if (!ref.current || hovered || reducedMotion) return;
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
};

export default RobotsModel;
