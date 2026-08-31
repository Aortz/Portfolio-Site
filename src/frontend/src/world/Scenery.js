import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Matrix4, Object3D, Vector3 } from 'three';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../theme/ThemeProvider';
import { useTeleop } from '../teleop/TeleopProvider';
import { getPointAt, getTangentAt, VIA_T } from './path';

const ASTEROID_COUNT = 120;
const ASTEROID_MIN_R = 8;    // corridor offset range (world units)
const ASTEROID_MAX_R = 30;
const DUST_COUNT = 800;
const DUST_MAX_R = 12;
const GATE_RADIUS = 4;
const GATE_PULSE_T = 0.02;   // |robotT - gateT| for the bright state

// Deterministic PRNG so the field is stable across reloads/themes.
const mulberry32 = (seed) => () => {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let z = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
  return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
};

const UP = new Vector3(0, 1, 0);
const _tan = new Vector3();
const _side = new Vector3();
const _vup = new Vector3();

/* Sample a point in the corridor around the route at parameter t. */
const corridorPoint = (rand, minR, maxR, out) => {
  const t = rand();
  getPointAt(t, out);
  getTangentAt(t, _tan);
  _side.crossVectors(_tan, UP).normalize();
  _vup.crossVectors(_side, _tan).normalize();
  const ang = rand() * Math.PI * 2;
  const r = minR + rand() * (maxR - minR);
  out.addScaledVector(_side, Math.cos(ang) * r);
  out.addScaledVector(_vup, Math.sin(ang) * r);
  return out;
};

const Asteroids = () => {
  const ref = useRef();
  const theme = useTheme();

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const rand = mulberry32(1337);
    const dummy = new Object3D();
    for (let i = 0; i < ASTEROID_COUNT; i += 1) {
      corridorPoint(rand, ASTEROID_MIN_R, ASTEROID_MAX_R, dummy.position);
      dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
      dummy.scale.setScalar(0.5 + rand() * 2.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, ASTEROID_COUNT]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={theme.color.fgSubtle} wireframe transparent opacity={0.35} />
    </instancedMesh>
  );
};

const Dust = () => {
  const ref = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();

  const positions = useMemo(() => {
    const rand = mulberry32(4242);
    const arr = new Float32Array(DUST_COUNT * 3);
    const v = new Vector3();
    for (let i = 0; i < DUST_COUNT; i += 1) {
      corridorPoint(rand, 0, DUST_MAX_R, v);
      arr[i * 3] = v.x; arr[i * 3 + 1] = v.y; arr[i * 3 + 2] = v.z;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.003;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={DUST_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation color={theme.color.accent} transparent opacity={0.5} depthWrite={false} />
    </points>
  );
};

/* Race-checkpoint rings at the via points; brighten as the robot threads them. */
const Gates = () => {
  const theme = useTheme();
  const { subscribePose } = useTeleop();
  const { invalidate } = useThree();
  const tRef = useRef(0);
  const mats = useRef([]);

  useEffect(() => subscribePose((p) => {
    if (Math.abs(p.t - tRef.current) > 0.0005) {
      tRef.current = p.t;
      invalidate();
    }
  }), [subscribePose, invalidate]);

  const gates = useMemo(() => VIA_T.map((t) => {
    const pos = getPointAt(t, new Vector3());
    const look = getTangentAt(t, new Vector3()).add(pos);
    const m = new Matrix4().lookAt(pos, look, UP);
    return { t, pos, m };
  }), []);

  useFrame(() => {
    mats.current.forEach((mat, i) => {
      if (!mat) return;
      const near = Math.abs(tRef.current - gates[i].t) < GATE_PULSE_T;
      const target = near ? 0.85 : 0.3;
      mat.opacity += (target - mat.opacity) * 0.15;
    });
  });

  return (
    <>
      {gates.map((g, i) => (
        <mesh
          key={g.t}
          position={g.pos}
          quaternion={undefined}
          onUpdate={(m) => m.quaternion.setFromRotationMatrix(g.m)}
        >
          <torusGeometry args={[GATE_RADIUS, 0.08, 8, 40]} />
          <meshBasicMaterial
            ref={(el) => { mats.current[i] = el; }}
            color={theme.color.accent}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
};

const Scenery = () => (
  <>
    <Asteroids />
    <Dust />
    <Gates />
  </>
);

export default Scenery;
