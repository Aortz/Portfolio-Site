import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';
import { useThemeMode } from '../theme/ThemeProvider';
import { useTeleop } from '../teleop/TeleopProvider';

// Robot-local offsets: x = right, y = up, z = behind (robot faces -z).
const CAM_OFFSET = new Vector3(-3.5, 3.2, 10.5);
const CAM_OFFSET_TOUR = new Vector3(-8, 8, 20);
const CAM_TAU = 0.35;
const LOOK_AHEAD = 3.0;

// Click-drag orbit around the robot.
const DRAG_GAIN = 0.006;        // rad per px
const PITCH_MIN = -0.45;        // rad (look up from below)
const PITCH_MAX = 1.1;          // rad (look down from above)
const ORBIT_RETURN_TAU = 1.2;   // s — ease back to the chase view while the robot moves
const DRAG_THRESHOLD = 3;       // px before a click counts as a drag

// Elements that own their own pointer interactions — dragging on them must
// not orbit the camera.
const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], section[aria-live], nav, aside';

const _desired = new Vector3();
const _offset = new Vector3();
const _target = new Vector3();
const _qYaw = new Quaternion();
const _qPitch = new Quaternion();
const _axisX = new Vector3(1, 0, 0);
const UP = new Vector3(0, 1, 0);

/* Smoothed third-person follow with a click-drag orbit. During the fly-in
   the offset starts wide and eases to the normal chase distance. */
const ChaseCamera = ({ robotRef }) => {
  const { camera, gl } = useThree();
  const { reducedMotion } = useThemeMode();
  const { touring, subscribePose } = useTeleop();
  const offsetRef = useRef(CAM_OFFSET.clone());
  const initialised = useRef(false);
  const orbit = useRef({ az: 0, el: 0 });
  const drag = useRef(null); // { x, y, az, el, moved }
  const movingRef = useRef(false);

  useEffect(() => {
    if (touring) offsetRef.current.copy(CAM_OFFSET_TOUR);
  }, [touring]);

  useEffect(() => subscribePose((p) => { movingRef.current = p.moving; }), [subscribePose]);

  // Pointer drag on the page background orbits the camera. The canvas has
  // pointer-events:none, so listen on window and filter out UI targets.
  useEffect(() => {
    const onDown = (e) => {
      if (e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) return;
      drag.current = { x: e.clientX, y: e.clientY, az: orbit.current.az, el: orbit.current.el, moved: false };
    };
    const onMove = (e) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true;
      document.body.style.cursor = 'grabbing';
      orbit.current.az = d.az - dx * DRAG_GAIN;
      orbit.current.el = Math.max(PITCH_MIN, Math.min(PITCH_MAX, d.el + dy * DRAG_GAIN));
    };
    const onUp = () => {
      drag.current = null;
      document.body.style.cursor = '';
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onUp);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onUp);
      document.body.style.cursor = '';
    };
  }, [gl]);

  useFrame((_, delta) => {
    const r = robotRef.current;
    if (!r) return;

    const wantOffset = touring ? CAM_OFFSET_TOUR : CAM_OFFSET;
    const k = reducedMotion ? 1 : 1 - Math.exp(-delta / CAM_TAU);
    offsetRef.current.lerp(wantOffset, k);

    // While the robot travels and nobody is dragging, drift the orbit back
    // so the chase view re-establishes itself behind the robot.
    const o = orbit.current;
    if (movingRef.current && !drag.current && (o.az || o.el)) {
      const kr = 1 - Math.exp(-delta / ORBIT_RETURN_TAU);
      o.az -= o.az * kr;
      o.el -= o.el * kr;
      if (Math.abs(o.az) < 1e-3) o.az = 0;
      if (Math.abs(o.el) < 1e-3) o.el = 0;
    }

    // Offset in robot space → apply orbit pitch (about robot X) and yaw
    // (about world up) → rotate into world by the robot's route heading.
    _offset.copy(offsetRef.current);
    _qPitch.setFromAxisAngle(_axisX, o.el);
    _offset.applyQuaternion(_qPitch);
    _offset.applyQuaternion(r.quaternion);
    _qYaw.setFromAxisAngle(UP, o.az);
    _offset.applyQuaternion(_qYaw);
    _desired.copy(r.position).add(_offset);

    if (!initialised.current || reducedMotion) {
      camera.position.copy(_desired);
      initialised.current = true;
    } else {
      camera.position.lerp(_desired, k);
    }

    // Look ahead along the route when following; straight at the robot when
    // the user has orbited away, so it stays centred.
    const orbiting = o.az !== 0 || o.el !== 0;
    _target.copy(r.position);
    if (!orbiting) _target.addScaledVector(r.tangent, LOOK_AHEAD);
    camera.lookAt(_target);
  });

  return null;
};

export default ChaseCamera;
