import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Sphere, MeshBasicMaterial } from 'three';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../../theme/ThemeProvider';
import { useTeleop } from '../../teleop/TeleopProvider';

useGLTF.preload('/robots/scene.glb');

const IDLE_SPIN = 0.2;   // rad/sec when disarmed
const BOB_AMP = 0.06;    // walk bob amplitude (units)
const BOB_HZ = 12;       // walk bob frequency (rad/sec)
const SWAY_AMP = 0.03;   // roll sway amplitude (rad)
const SWAY_HZ = 6;       // roll sway frequency (rad/sec)

const RobotWalker = () => {
  const ref = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();
  const { armed, subscribePose } = useTeleop();
  const { invalidate } = useThree();
  const { scene } = useGLTF('/robots/scene.glb');

  const poseRef = useRef({ strafe: 0, yaw: 0, moving: false });
  const armedRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => { armedRef.current = armed; invalidate(); }, [armed, invalidate]);
  useEffect(() => { reducedRef.current = reducedMotion; invalidate(); }, [reducedMotion, invalidate]);

  // Subscribe once to the pose stream; updates go into a ref so the frame
  // loop reads them without provoking renders. `invalidate` wakes the
  // on-demand render loop when the canvas is idle (disarmed).
  useEffect(() => {
    return subscribePose((p) => {
      const mine = poseRef.current;
      const changed = mine.strafe !== p.strafe || mine.yaw !== p.yaw || mine.moving !== p.moving;
      mine.strafe = p.strafe;
      mine.yaw = p.yaw;
      mine.moving = p.moving;
      if (changed) invalidate();
    });
  }, [subscribePose, invalidate]);

  const cloned = useMemo(() => {
    // The GLB is rigged (one skin). A plain `scene.clone()` leaves the copy's
    // SkinnedMesh bound to the *original* skeleton, so it renders at the
    // source's world transform — not ours — and looks wildly mis-sized.
    // SkeletonUtils.clone rebinds bones to the copy.
    const c = skeletonClone(scene);
    c.updateMatrixWorld(true);
    // Skinned meshes report geometry bounds in bind space unless asked to
    // compute them through the skeleton.
    c.traverse((o) => { if (o.isSkinnedMesh) o.computeBoundingBox(); });
    // Scale by bounding-sphere radius instead of longest-axis: the sphere is
    // rotation-invariant, so the model is guaranteed to fit at every yaw.
    // Visible vertical half-extent at z=0 with cam z=5.5 fov=50° is ~2.57. A
    // target radius of 1.9 occupies ~74% of the frame; the badge strip at the
    // top is cleared by the outer group's downward offset.
    const bbox = new Box3().setFromObject(c);
    const sphere = new Sphere();
    bbox.getBoundingSphere(sphere);
    const TARGET_RADIUS = 1.9;
    const scale = TARGET_RADIUS / (sphere.radius || 1);
    c.scale.setScalar(scale);
    c.position.sub(sphere.center.clone().multiplyScalar(scale));
    c.updateMatrixWorld(true);
    return c;
  }, [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshBasicMaterial({
          color: theme.color.accent,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
      }
    });
    invalidate();
  }, [cloned, theme.color.accent, invalidate]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const p = poseRef.current;
    const t = state.clock.elapsedTime;
    const reduced = reducedRef.current;

    if (armedRef.current) {
      g.rotation.y = p.yaw;
    } else if (!reduced) {
      g.rotation.y += delta * IDLE_SPIN;
    }

    g.position.x = p.strafe;

    const walking = p.moving && !reduced;
    g.position.y = walking ? Math.sin(t * BOB_HZ) * BOB_AMP : 0;
    g.rotation.z = walking ? Math.sin(t * SWAY_HZ) * SWAY_AMP : 0;
  });

  // Outer group drops the model below the badge strip at the top of the box.
  return (
    <group position={[0, -0.35, 0]}>
      <group ref={ref}>
        <primitive object={cloned} />
      </group>
    </group>
  );
};

export default RobotWalker;
