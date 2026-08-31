import React, { useEffect, useMemo, useRef } from 'react';
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
const BOB_AMP = 0.03;       // body bob — the legs sell most of the motion now
const BOB_HZ = 12;
const SWAY_AMP = 0.03;
const SWAY_HZ = 6;

// Procedural trot gait (the GLB is rigged but ships no animation clips).
// Diagonal leg pairs swing in anti-phase; knees bend on the back-swing.
const GAIT_HZ = 2.2;        // strides per second at full weight
const HIP_AMP = 0.35;       // rad
const KNEE_AMP = 0.45;      // rad
const HEAD_AMP = 0.06;      // rad
const JUMP_TUCK = 0.3;      // rad — legs tuck while airborne
const GAIT_TAU = 0.15;      // s — gait weight ease in/out

const UP = new Vector3(0, 1, 0);
const X_AXIS = new Vector3(1, 0, 0);
const _pos = new Vector3();
const _tan = new Vector3();
const _look = new Vector3();
const _side = new Vector3();
const _m = new Matrix4();
const _q = new Quaternion();
const _qSwing = new Quaternion();

/* Find the gait bones by name. Hip = first segment of each leg chain,
   knee = second. Phase +1 and -1 are the two diagonal pairs of a trot. */
const rigLegs = (root) => {
  const legs = [];
  let head = null;
  const specs = [
    { hip: 'LF1 L', knee: 'LF2 L', phase: 1 },
    { hip: 'LB1 R', knee: 'LB2 R', phase: 1 },
    { hip: 'LF1 R', knee: 'LF2 R', phase: -1 },
    { hip: 'LB1 L', knee: 'LB2 L', phase: -1 },
  ];
  root.traverse((o) => {
    if (!o.isBone) return;
    if (o.name.startsWith('Head')) head = o;
    specs.forEach((spec) => {
      if (o.name.startsWith(spec.hip)) legs.push({ ...spec, hipBone: o, base: o.quaternion.clone() });
    });
  });
  // Second pass for knees (child lookup by prefix keeps it robust to suffixes).
  legs.forEach((leg) => {
    leg.hipBone.traverse((o) => {
      if (o.isBone && o.name.startsWith(leg.knee) && !leg.kneeBone) {
        leg.kneeBone = o;
        leg.kneeBase = o.quaternion.clone();
      }
    });
  });
  return { legs, head, headBase: head ? head.quaternion.clone() : null };
};

const PlayerRobot = ({ robotRef }) => {
  const group = useRef();
  // Real textured model — the one non-wireframe object in the world.
  const obj = useWireframeGLTF('/robots/scene.glb', { radius: TARGET_RADIUS, textured: true });
  const { reducedMotion } = useThemeMode();
  const { subscribePose, skin } = useTeleop();
  const { invalidate } = useThree();

  const rig = useMemo(() => rigLegs(obj), [obj]);

  // Konami ghost skin: flip the real materials to wireframe and back.
  useEffect(() => {
    obj.traverse((o) => {
      if (o.isMesh && o.material) o.material.wireframe = skin === 'ghost';
    });
    invalidate();
  }, [obj, skin, invalidate]);
  const poseRef = useRef({ t: 0, yaw: 0, strafe: 0, moving: false, jumpY: 0, roll: 0 });
  const gaitWeight = useRef(0);

  useEffect(() => subscribePose((p) => {
    const mine = poseRef.current;
    const changed = mine.t !== p.t || mine.yaw !== p.yaw || mine.strafe !== p.strafe || mine.moving !== p.moving || mine.jumpY !== p.jumpY || mine.roll !== p.roll;
    mine.t = p.t; mine.yaw = p.yaw; mine.strafe = p.strafe; mine.moving = p.moving; mine.jumpY = p.jumpY; mine.roll = p.roll;
    if (changed) invalidate();
  }), [subscribePose, invalidate]);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const p = poseRef.current;
    const time = clock.elapsedTime;

    getPointAt(p.t, _pos);
    getTangentAt(p.t, _tan);
    _side.crossVectors(_tan, UP).normalize();

    _pos.addScaledVector(_side, p.strafe);
    _pos.y += HOVER_HEIGHT + p.jumpY;
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
    // Barrel roll: pose carries signed progress; ease it here.
    if (p.roll !== 0 && !reducedMotion) {
      const x = Math.abs(p.roll);
      const eased = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      g.rotateZ(Math.sign(p.roll) * eased * Math.PI * 2);
    }

    // ---- Gait ----------------------------------------------------------
    const airborne = p.jumpY > 0.05;
    const wantWeight = reducedMotion ? 0 : (walking ? 1 : 0);
    const k = 1 - Math.exp(-delta / GAIT_TAU);
    gaitWeight.current += (wantWeight - gaitWeight.current) * k;
    const w = gaitWeight.current;

    if (rig.legs.length) {
      const phase = time * GAIT_HZ * Math.PI * 2;
      rig.legs.forEach((leg) => {
        const swing = Math.sin(phase + (leg.phase > 0 ? 0 : Math.PI)) * HIP_AMP * w;
        const tuck = airborne ? JUMP_TUCK : 0;
        _qSwing.setFromAxisAngle(X_AXIS, swing + tuck);
        leg.hipBone.quaternion.copy(leg.base).multiply(_qSwing);
        if (leg.kneeBone) {
          const backSwing = Math.max(0, -Math.sin(phase + (leg.phase > 0 ? 0 : Math.PI)));
          _qSwing.setFromAxisAngle(X_AXIS, backSwing * KNEE_AMP * w + tuck * 0.5);
          leg.kneeBone.quaternion.copy(leg.kneeBase).multiply(_qSwing);
        }
      });
      if (rig.head) {
        _qSwing.setFromAxisAngle(X_AXIS, Math.sin(phase * 0.5) * HEAD_AMP * w);
        rig.head.quaternion.copy(rig.headBase).multiply(_qSwing);
      }
      if (w > 0.001 || airborne) invalidate();
    }
  });

  return (
    <group ref={group}>
      <primitive object={obj} />
    </group>
  );
};

export default PlayerRobot;
