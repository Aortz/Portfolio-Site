import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { useTeleop } from '../teleop/TeleopProvider';
import useWireframeGLTF from './models/useWireframeGLTF';
import { getPointAt, getTangentAt } from './path';

const HOVER_HEIGHT = 0.9;

const UP = new Vector3(0, 1, 0);
const _pos = new Vector3();
const _tan = new Vector3();
const _look = new Vector3();
const _m = new Matrix4();
const _q = new Quaternion();

/* Interpolate the recorded best run: samples are [elapsedSeconds, t]. */
const ghostT = (samples, at) => {
  if (at <= samples[0][0]) return samples[0][1];
  for (let i = 1; i < samples.length; i += 1) {
    if (samples[i][0] >= at) {
      const [a0, t0] = samples[i - 1];
      const [a1, t1] = samples[i];
      const f = (at - a0) / Math.max(1e-6, a1 - a0);
      return t0 + (t1 - t0) * f;
    }
  }
  return samples[samples.length - 1][1];
};

/* Translucent wireframe copy of RECON-2 replaying the stored best run while a
   time trial is active. */
const GhostRobot = () => {
  const group = useRef();
  const { mission, subscribePose } = useTeleop();
  const { invalidate } = useThree();
  const obj = useWireframeGLTF('/robots/scene.glb', { radius: 1.2, opacity: 0.22 });
  const runTRef = useRef(-1);

  useEffect(() => subscribePose((p) => {
    if (p.runT !== runTRef.current) {
      runTRef.current = p.runT;
      invalidate();
    }
  }), [subscribePose, invalidate]);

  const ghost = mission.ghost;

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const at = runTRef.current;
    const active = ghost && ghost.length > 1 && at >= 0;
    g.visible = !!active;
    if (!active) return;

    const t = ghostT(ghost, at);
    getPointAt(t, _pos);
    getTangentAt(t, _tan);
    _pos.y += HOVER_HEIGHT;
    g.position.copy(_pos);
    _look.copy(_pos).add(_tan);
    _m.lookAt(_look, _pos, UP);
    _q.setFromRotationMatrix(_m);
    g.quaternion.copy(_q);
  });

  if (!ghost || ghost.length < 2) return null;

  return (
    <group ref={group} visible={false}>
      <primitive object={obj} />
    </group>
  );
};

export default GhostRobot;
