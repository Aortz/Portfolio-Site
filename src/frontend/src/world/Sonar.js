import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useTheme } from 'styled-components';
import { useTeleop } from '../teleop/TeleopProvider';
import { getPointAt, PLATFORMS } from './path';

const WAVE_DURATION = 1.2;
const WAVE_MAX_R = 28;
const ECHO_RANGE = 35;       // world units — targets beyond this stay silent
const ECHO_SPEED = 25;       // units/sec — delay = distance / speed
const ECHO_DURATION = 0.6;
const ECHO_MAX_R = 4;

const _robot = new Vector3();
const _target = new Vector3();

/* H-key sonar: one ring expands from the robot; platforms (and the hidden
   one especially) within range answer with a delayed echo ring. All driven
   by refs — no React state churn. */
const Sonar = () => {
  const theme = useTheme();
  const { subscribePose } = useTeleop();
  const { invalidate } = useThree();

  const wave = useRef();          // expanding ring mesh
  const echoes = useRef([]);      // echo ring meshes, one per platform
  const state = useRef({ lastPing: 0, waveStart: -1, echoStarts: [] });
  const tRef = useRef(0);

  const platformPos = useMemo(
    () => PLATFORMS.map((p) => new Vector3(p.pos[0], p.pos[1] + 1, p.pos[2])),
    []
  );

  useEffect(() => subscribePose((p) => {
    tRef.current = p.t;
    const st = state.current;
    if (p.ping && p.ping !== st.lastPing) {
      st.lastPing = p.ping;
      st.waveStart = performance.now() / 1000;
      getPointAt(p.t, _robot);
      _robot.y += 1;
      if (wave.current) wave.current.position.copy(_robot);
      st.echoStarts = platformPos.map((pos) => {
        const d = _target.copy(pos).distanceTo(_robot);
        return d < ECHO_RANGE ? st.waveStart + d / ECHO_SPEED : -1;
      });
      invalidate();
    }
  }), [subscribePose, invalidate, platformPos]);

  useFrame(() => {
    const now = performance.now() / 1000;
    const st = state.current;
    let live = false;

    const w = wave.current;
    if (w) {
      const x = (now - st.waveStart) / WAVE_DURATION;
      if (st.waveStart > 0 && x < 1) {
        w.visible = true;
        w.scale.setScalar(Math.max(0.01, x * WAVE_MAX_R));
        w.material.opacity = 0.6 * (1 - x);
        live = true;
      } else {
        w.visible = false;
      }
    }

    echoes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const start = st.echoStarts[i];
      const x = start > 0 ? (now - start) / ECHO_DURATION : 2;
      if (x >= 0 && x < 1) {
        mesh.visible = true;
        mesh.scale.setScalar(Math.max(0.01, x * ECHO_MAX_R));
        mesh.material.opacity = 0.8 * (1 - x);
        live = true;
      } else {
        mesh.visible = false;
      }
    });

    if (live) invalidate();
  });

  return (
    <>
      <mesh ref={wave} visible={false} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.95, 1, 48]} />
        <meshBasicMaterial color={theme.color.accent} transparent opacity={0} depthWrite={false} side={2} />
      </mesh>
      {platformPos.map((pos, i) => (
        <mesh
          key={PLATFORMS[i].id}
          ref={(el) => { echoes.current[i] = el; }}
          visible={false}
          position={pos}
          rotation-x={-Math.PI / 2}
        >
          <ringGeometry args={[0.9, 1, 32]} />
          <meshBasicMaterial color={theme.color.accent} transparent opacity={0} depthWrite={false} side={2} />
        </mesh>
      ))}
    </>
  );
};

export default Sonar;
