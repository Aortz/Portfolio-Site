import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3, MeshBasicMaterial } from 'three';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../../theme/ThemeProvider';
import { useTeleop } from '../../teleop/TeleopProvider';

useGLTF.preload('/drone/drone.glb');

const DroneShape = ({ hovered }) => {
  const ref = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();
  const { armed, subscribePose } = useTeleop();
  const poseRef = useRef({ x: 0, y: 0, yaw: 0 });
  const armedRef = useRef(false);
  const { scene } = useGLTF('/drone/drone.glb');

  // Mirror armed into a ref so useFrame doesn't need it as a dep.
  useEffect(() => { armedRef.current = armed; }, [armed]);

  // Subscribe once to the pose stream; updates are written into a ref so the
  // frame loop reads them without provoking renders.
  useEffect(() => {
    return subscribePose((p) => {
      poseRef.current.x = p.x;
      poseRef.current.y = p.y;
      poseRef.current.yaw = p.yaw;
    });
  }, [subscribePose]);

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
    if (!ref.current) return;

    // Idle drift: lazy yaw + gentle bob — paused while hovered, while OS/user
    // reduced-motion is on, or while teleop is armed (the user is flying).
    if (!hovered && !reducedMotion && !armedRef.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.15;
    }

    // Teleop pose always applies (zeroed when disarmed/idle).
    const p = poseRef.current;
    ref.current.position.set(p.x, p.y, 0);
    if (armedRef.current) {
      ref.current.rotation.y = p.yaw;
      ref.current.rotation.x = 0;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
};

export default DroneShape;
