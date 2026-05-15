import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/* ---------------------------------------------------------------------------
   TeleopProvider — drives the hero-canvas drone via WASD/QE/arrows.

   Architecture:
   - Two state surfaces:
       * React state (`hud`)       — fires re-renders for the rail's readouts.
                                      Updated ~10 Hz to stay cheap.
       * Mutable ref (`poseRef`)   — read every frame by DroneShape via the
                                      `subscribePose` callback. No re-renders.
   - A single requestAnimationFrame loop integrates velocities → pose, and
     periodically flushes a snapshot to `hud` so the panel UI updates.
   - Key capture is scoped to (armed && expanded) and only consumes mapped
     keys via preventDefault — typing anywhere else is untouched.
   --------------------------------------------------------------------------- */

const TeleopContext = createContext(null);

// Tunables ----------------------------------------------------------
const LIN_SPEED = 0.6;       // units/sec at full deflection
const ANG_SPEED = 0.8;       // rad/sec at full deflection
const RAMP_TAU = 0.25;       // seconds — how fast velocity tracks the target
const DECAY_TAU = 0.30;      // seconds — how fast velocity damps when idle
const X_MIN = -3, X_MAX = 3; // pose clamp — keep the drone on canvas
const Y_MIN = -2, Y_MAX = 2;
const HALT_DURATION = 0.30;  // seconds — soft return to origin on X press
const HUD_HZ = 10;           // panel re-render rate

// Map: KeyboardEvent.code → semantic action.
const KEY_MAP = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyA: 'yaw+',
  ArrowLeft: 'yaw+',
  KeyD: 'yaw-',
  ArrowRight: 'yaw-',
  KeyQ: 'left',
  KeyE: 'right',
  Space: 'arm',
  KeyX: 'halt',
};

const ZERO_POSE = { x: 0, y: 0, yaw: 0 };
const ZERO_VEL = { vx: 0, vy: 0, vang: 0 };

export const TeleopProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [armed, setArmed] = useState(false);

  // HUD snapshot — what the rail UI reads. Cheap-frequency.
  const [hud, setHud] = useState({
    pose: { ...ZERO_POSE },
    vel: { lin: 0, ang: 0 },
    uptime: 0,
    pressed: [],
  });

  // High-frequency state behind a ref so the rAF loop doesn't trigger renders.
  const poseRef = useRef({ ...ZERO_POSE });
  const velRef = useRef({ ...ZERO_VEL });
  const pressedRef = useRef(new Set());
  const armedRef = useRef(false);
  const expandedRef = useRef(false);
  const haltRef = useRef(null); // { startTime, fromPose } when halting
  const subscribersRef = useRef(new Set());

  // Mirror reactive state into refs so the rAF loop sees current values.
  useEffect(() => { armedRef.current = armed; }, [armed]);
  useEffect(() => { expandedRef.current = expanded; }, [expanded]);

  // Uptime tick (1 Hz, only when expanded — saves a tick when collapsed).
  useEffect(() => {
    if (!expanded) return undefined;
    const id = setInterval(() => {
      setHud((h) => ({ ...h, uptime: h.uptime + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, [expanded]);

  // ---- Pose subscription (DroneShape calls this in a useEffect) -------
  const subscribePose = useCallback((cb) => {
    subscribersRef.current.add(cb);
    return () => subscribersRef.current.delete(cb);
  }, []);

  // ---- Actions --------------------------------------------------------
  const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);
  const toggleArmed = useCallback(() => setArmed((a) => !a), []);
  const halt = useCallback(() => {
    haltRef.current = {
      startTime: performance.now() / 1000,
      from: { ...poseRef.current },
    };
    velRef.current = { ...ZERO_VEL };
  }, []);

  // ---- Keyboard capture -----------------------------------------------
  useEffect(() => {
    const onKeyDown = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;
      // Only consume keys when the rail is open. Space/halt/arm are valid
      // even without armed=true so the user can arm via keyboard.
      if (!expandedRef.current) return;
      e.preventDefault();

      if (action === 'arm') {
        setArmed((a) => !a);
        return;
      }
      if (action === 'halt') {
        halt();
        return;
      }
      // Translation/rotation only register while armed.
      if (!armedRef.current) return;
      pressedRef.current.add(e.code);
    };
    const onKeyUp = (e) => {
      pressedRef.current.delete(e.code);
    };
    const onBlur = () => pressedRef.current.clear();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [halt]);

  // ---- rAF integration loop -------------------------------------------
  useEffect(() => {
    let raf = 0;
    let last = performance.now() / 1000;
    let hudClock = 0;

    const step = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - last); // clamp big tab-resume gaps
      last = now;

      // Build target velocities from currently-pressed keys.
      let tvx = 0, tvy = 0, tvang = 0;
      const pressed = pressedRef.current;
      if (armedRef.current && expandedRef.current) {
        if (pressed.has('KeyW') || pressed.has('ArrowUp'))    tvy += LIN_SPEED;
        if (pressed.has('KeyS') || pressed.has('ArrowDown'))  tvy -= LIN_SPEED;
        if (pressed.has('KeyQ'))                              tvx -= LIN_SPEED;
        if (pressed.has('KeyE'))                              tvx += LIN_SPEED;
        if (pressed.has('KeyA') || pressed.has('ArrowLeft'))  tvang += ANG_SPEED;
        if (pressed.has('KeyD') || pressed.has('ArrowRight')) tvang -= ANG_SPEED;
      }

      // Exponential smoothing toward target (or zero, when idle/disarmed).
      const tau = (tvx || tvy || tvang) ? RAMP_TAU : DECAY_TAU;
      const k = 1 - Math.exp(-dt / tau);
      const v = velRef.current;
      v.vx   += (tvx   - v.vx)   * k;
      v.vy   += (tvy   - v.vy)   * k;
      v.vang += (tvang - v.vang) * k;

      // Halt animation overrides integration.
      if (haltRef.current) {
        const t = (now - haltRef.current.startTime) / HALT_DURATION;
        if (t >= 1) {
          poseRef.current = { ...ZERO_POSE };
          haltRef.current = null;
        } else {
          const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
          const f = haltRef.current.from;
          poseRef.current.x   = f.x   * (1 - e);
          poseRef.current.y   = f.y   * (1 - e);
          poseRef.current.yaw = f.yaw * (1 - e);
        }
        velRef.current = { ...ZERO_VEL };
      } else {
        const p = poseRef.current;
        p.x = Math.max(X_MIN, Math.min(X_MAX, p.x + v.vx * dt));
        p.y = Math.max(Y_MIN, Math.min(Y_MAX, p.y + v.vy * dt));
        p.yaw += v.vang * dt;
      }

      // Notify pose subscribers (DroneShape).
      subscribersRef.current.forEach((cb) => cb(poseRef.current));

      // Throttle HUD updates to HUD_HZ so React doesn't re-render every frame.
      hudClock += dt;
      if (hudClock > 1 / HUD_HZ) {
        hudClock = 0;
        const lin = Math.hypot(v.vx, v.vy);
        setHud((h) => ({
          ...h,
          pose: { ...poseRef.current },
          vel: { lin, ang: v.vang },
          pressed: Array.from(pressed),
        }));
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const value = useMemo(
    () => ({
      // Read-mostly state for UI
      expanded,
      armed,
      hud,
      // Actions
      toggleExpanded,
      toggleArmed,
      halt,
      // Pose stream for DroneShape
      subscribePose,
    }),
    [expanded, armed, hud, toggleExpanded, toggleArmed, halt, subscribePose]
  );

  return <TeleopContext.Provider value={value}>{children}</TeleopContext.Provider>;
};

export const useTeleop = () => {
  const ctx = useContext(TeleopContext);
  if (!ctx) {
    // Fail loud — if a consumer renders outside the provider, the drone
    // would silently sit still and the rail wouldn't react.
    throw new Error('useTeleop must be used inside <TeleopProvider>');
  }
  return ctx;
};
