import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { useThemeMode } from '../theme/ThemeProvider';
import { useTeleop } from '../teleop/TeleopProvider';
import useWireframeGLTF, { DRACO_PATH } from './models/useWireframeGLTF';
import { getPointAt, getTangentAt } from './path';

useGLTF.preload('/robots/scene.glb', DRACO_PATH);

const TARGET_RADIUS = 1.2;
const HOVER_HEIGHT = 0.9;   // ride height above the spline
const BOB_AMP = 0.06;
const BOB_HZ = 12;
const SWAY_AMP = 0.03;
const SWAY_HZ = 6;

const UP = new Vector3(0, 1, 0);
const _pos = new Vector3();
const _tan = new Vector3();
const _look = new Vector3();
const _side = new Vector3();
const _m = new Matrix4();
const _q = new Quaternion();

/* The player. Reads {t, yaw, strafe, moving} from the teleop pose stream and
   places itself on the spline: position from t, heading from the tangent,
   then the user's yaw applied on top. Exposes its world transform through
   `robotRef` for the chase camera. */
const PlayerRobot = ({ robotRef }) => {
  const group = useRef();
  const obj = useWireframeGLTF('/robots/scene.glb', { radius: TARGET_RADIUS, opacity: 0.8 });
  const { reducedMotion } = useThemeMode();
  const { subscribePose } = useTeleop();
  const { invalidate } = useThree();

  const poseRef = useRef({ t: 0, yaw: 0, strafe: 0, moving: false });

  useEffect(() => subscribePose((p) => {
    const mine = poseRef.current;
    const changed = mine.t !== p.t || mine.yaw !== p.yaw || mine.strafe !== p.strafe || mine.moving !== p.moving;
    mine.t = p.t; mine.yaw = p.yaw; mine.strafe = p.strafe; mine.moving = p.moving;
    if (changed) invalidate();
  }), [subscribePose, invalidate]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const p = poseRef.current;
    const time = clock.elapsedTime;

    getPointAt(p.t, _pos);
    getTangentAt(p.t, _tan);
    _side.crossVectors(_tan, UP).normalize();

    _pos.addScaledVector(_side, p.strafe);
    _pos.y += HOVER_HEIGHT;
    const walking = p.moving && !reducedMotion;
    if (walking) _pos.y += Math.sin(time * BOB_HZ) * BOB_AMP;
    g.position.copy(_pos);

    // Face along the route, then apply user yaw.
    _look.copy(_pos).add(_tan);
    _m.lookAt(_look, _pos, UP);
    _q.setFromRotationMatrix(_m);
    g.quaternion.copy(_q);
    // The chase camera follows the route heading, not the user's yaw, so
    // yawing the robot turns it in place instead of orbiting the camera.
    if (robotRef) {
      robotRef.current.position.copy(g.position);
      robotRef.current.quaternion.copy(_q);
      robotRef.current.tangent.copy(_tan);
    }
    g.rotateY(p.yaw);
    if (walking) g.rotateZ(Math.sin(time * SWAY_HZ) * SWAY_AMP);
  });

  return (
    <group ref={group}>
      <primitive object={obj} />
    </group>
  );
};

export default PlayerRobot;
