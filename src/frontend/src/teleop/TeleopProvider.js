import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useThemeMode } from '../theme/ThemeProvider';

/* ---------------------------------------------------------------------------
   TeleopProvider — page-walk teleop for the RECON-2 field unit.

   The robot lives in a fixed canvas (TeleopUnit). Driving it "walks" the
   page: W/S produce a scroll velocity applied to window each frame, A/D yaw
   the model, Q/E strafe it inside its canvas.

   Architecture:
   - Two state surfaces:
       * React state (`hud`)       — fires re-renders for the rail's readouts.
                                      Updated ~10 Hz to stay cheap. Carries the
                                      current waypoint (section) and progress.
       * Mutable ref (`poseRef`)   — read every frame by RobotWalker via the
                                      `subscribePose` callback. No re-renders.
   - A single requestAnimationFrame loop integrates velocities → pose/scroll,
     and periodically flushes a snapshot to `hud`.
   - Key capture is scoped to `expanded` and only consumes mapped keys via
     preventDefault — typing anywhere else is untouched.
   - Manual wheel/touch scrolling pauses the motor briefly so the user can
     always override.
   - Reduced motion: W/S become discrete page steps instead of a velocity.
   --------------------------------------------------------------------------- */

const TeleopContext = createContext(null);

// Tunables ----------------------------------------------------------
const SCROLL_SPEED = 420;        // px/sec at full W/S deflection
const STRAFE_SPEED = 0.6;        // units/sec at full Q/E deflection
const STRAFE_MAX = 0.5;          // clamp — keep the robot inside its canvas
const ANG_SPEED = 1.2;           // rad/sec at full A/D deflection
const RAMP_TAU = 0.25;           // seconds — how fast velocity tracks the target
const DECAY_TAU = 0.30;          // seconds — how fast velocity damps when idle
const HALT_DURATION = 0.30;      // seconds — soft return of strafe/yaw to origin
const HUD_HZ = 10;               // panel re-render rate
const MANUAL_SCROLL_HOLD = 0.6;  // seconds — motor pause after wheel/touch
const MOVING_THRESHOLD = 5;      // px/sec — below this the robot is "idle"
const STEP_FRACTION = 0.6;       // reduced-motion: viewport fraction per tap
const WAYPOINT_LINE = 0.4;       // viewport fraction used to pick the section

const SECTION_IDS = ['home', 'about', 'projects', 'gallery', 'resume'];
const WAYPOINT_LABELS = {
  home: 'HOME',
  about: 'ABOUT',
  projects: 'PROJECTS',
  gallery: 'GALLERY',
  resume: 'RESUME',
};

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

const ZERO_POSE = { strafe: 0, yaw: 0, moving: false };
const ZERO_VEL = { scroll: 0, strafe: 0, ang: 0 };

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const maxScroll = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

// ---- Section lookup for waypoint readout ------------------------------
// Sections are lazy-mounted, so re-query until every id resolves.
const resolveSections = (cacheRef) => {
  const cached = cacheRef.current;
  if (cached.length === SECTION_IDS.length && cached.every(Boolean)) return cached;
  cacheRef.current = SECTION_IDS.map((id) => document.getElementById(id));
  return cacheRef.current;
};

const currentWaypoint = (cacheRef) => {
  const line = window.innerHeight * WAYPOINT_LINE;
  const els = resolveSections(cacheRef);
  let wp = SECTION_IDS[0];
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    if (el && el.getBoundingClientRect().top <= line) wp = SECTION_IDS[i];
  }
  return WAYPOINT_LABELS[wp];
};

export const TeleopProvider = ({ children }) => {
  const { reducedMotion } = useThemeMode();
  const [expanded, setExpanded] = useState(false);
  const [armed, setArmed] = useState(false);

  // HUD snapshot — what the rail UI reads. Cheap-frequency.
  const [hud, setHud] = useState({
    pose: { strafe: 0, yaw: 0 },
    vel: { scroll: 0, ang: 0 },
    uptime: 0,
    pressed: [],
    waypoint: 'HOME',
    progress: 0,
  });

  // High-frequency state behind refs so the rAF loop doesn't trigger renders.
  const poseRef = useRef({ ...ZERO_POSE });
  const velRef = useRef({ ...ZERO_VEL });
  const pressedRef = useRef(new Set());
  const armedRef = useRef(false);
  const expandedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const haltRef = useRef(null); // { startTime, from } when halting
  const lastManualRef = useRef(-Infinity);
  const sectionsRef = useRef([]);
  const subscribersRef = useRef(new Set());

  // Mirror reactive state into refs so the rAF loop sees current values.
  useEffect(() => { armedRef.current = armed; }, [armed]);
  useEffect(() => { expandedRef.current = expanded; }, [expanded]);
  useEffect(() => { reducedMotionRef.current = reducedMotion; }, [reducedMotion]);

  // While armed, disable CSS smooth scrolling (Fonts.js sets it on <html>)
  // so per-frame scrollBy isn't re-smoothed into a laggy chase.
  useEffect(() => {
    const el = document.documentElement;
    el.style.scrollBehavior = armed ? 'auto' : '';
    return () => { el.style.scrollBehavior = ''; };
  }, [armed]);

  // Uptime tick (1 Hz, only when expanded — saves a tick when collapsed).
  useEffect(() => {
    if (!expanded) return undefined;
    const id = setInterval(() => {
      setHud((h) => ({ ...h, uptime: h.uptime + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, [expanded]);

  // ---- Pose subscription (RobotWalker calls this in a useEffect) ------
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
      from: { strafe: poseRef.current.strafe, yaw: poseRef.current.yaw },
    };
    velRef.current = { ...ZERO_VEL };
  }, []);

  // Reduced-motion: a single discrete page step per W/S press.
  const stepPage = useCallback((dir) => {
    window.scrollBy({
      top: dir * window.innerHeight * STEP_FRACTION,
      left: 0,
      behavior: 'instant',
    });
  }, []);

  // On-screen keycaps drive the same pressed set as the keyboard.
  const pressKey = useCallback((code) => {
    const action = KEY_MAP[code];
    if (!action || !expandedRef.current) return;
    if (action === 'arm') { setArmed((a) => !a); return; }
    if (action === 'halt') { halt(); return; }
    if (!armedRef.current) return;
    if (reducedMotionRef.current && (action === 'up' || action === 'down')) {
      stepPage(action === 'down' ? 1 : -1);
      return;
    }
    pressedRef.current.add(code);
  }, [halt, stepPage]);

  const releaseKey = useCallback((code) => {
    pressedRef.current.delete(code);
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
      if (e.repeat) return; // auto-repeat: pressed set already holds it
      pressKey(e.code);
    };
    const onKeyUp = (e) => releaseKey(e.code);
    const onBlur = () => pressedRef.current.clear();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [pressKey, releaseKey]);

  // ---- Manual scroll detection ----------------------------------------
  // wheel/touchmove (not `scroll`) so our own scrollBy doesn't trip it.
  useEffect(() => {
    const mark = () => {
      lastManualRef.current = performance.now() / 1000;
      velRef.current.scroll = 0; // drop the motor instantly; no coasting
    };
    const opts = { passive: true };
    window.addEventListener('wheel', mark, opts);
    window.addEventListener('touchmove', mark, opts);
    return () => {
      window.removeEventListener('wheel', mark, opts);
      window.removeEventListener('touchmove', mark, opts);
    };
  }, []);

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
      let tvScroll = 0, tvStrafe = 0, tvAng = 0;
      const pressed = pressedRef.current;
      if (armedRef.current && expandedRef.current) {
        if (pressed.has('KeyS') || pressed.has('ArrowDown'))  tvScroll += SCROLL_SPEED;
        if (pressed.has('KeyW') || pressed.has('ArrowUp'))    tvScroll -= SCROLL_SPEED;
        if (pressed.has('KeyQ'))                              tvStrafe -= STRAFE_SPEED;
        if (pressed.has('KeyE'))                              tvStrafe += STRAFE_SPEED;
        if (pressed.has('KeyA') || pressed.has('ArrowLeft'))  tvAng += ANG_SPEED;
        if (pressed.has('KeyD') || pressed.has('ArrowRight')) tvAng -= ANG_SPEED;
      }
      // Reduced motion never drives continuous scroll (stepPage handles W/S).
      if (reducedMotionRef.current) tvScroll = 0;
      // Let the user override with the wheel; motor resumes after the hold.
      if (now - lastManualRef.current < MANUAL_SCROLL_HOLD) tvScroll = 0;

      // Exponential smoothing toward target (or zero, when idle/disarmed).
      const tau = (tvScroll || tvStrafe || tvAng) ? RAMP_TAU : DECAY_TAU;
      const k = 1 - Math.exp(-dt / tau);
      const v = velRef.current;
      v.scroll += (tvScroll - v.scroll) * k;
      v.strafe += (tvStrafe - v.strafe) * k;
      v.ang    += (tvAng    - v.ang)    * k;

      // Walk the page. Stop dead at either bound so there's no wind-up.
      const dy = v.scroll * dt;
      if (Math.abs(dy) > 0.01) {
        const y = window.scrollY;
        const atTop = y <= 0 && dy < 0;
        const atBottom = y >= maxScroll() - 1 && dy > 0;
        if (atTop || atBottom) {
          v.scroll = 0;
        } else {
          window.scrollBy({ top: dy, left: 0, behavior: 'instant' });
        }
      }

      // Halt animation overrides strafe/yaw integration (never scrolls).
      const p = poseRef.current;
      if (haltRef.current) {
        const t = (now - haltRef.current.startTime) / HALT_DURATION;
        if (t >= 1) {
          p.strafe = 0;
          p.yaw = 0;
          haltRef.current = null;
        } else {
          const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
          const f = haltRef.current.from;
          p.strafe = f.strafe * (1 - e);
          p.yaw    = f.yaw    * (1 - e);
        }
        v.strafe = 0;
        v.ang = 0;
      } else {
        p.strafe = clamp(p.strafe + v.strafe * dt, -STRAFE_MAX, STRAFE_MAX);
        p.yaw += v.ang * dt;
      }
      p.moving = Math.abs(v.scroll) > MOVING_THRESHOLD;

      // Notify pose subscribers (RobotWalker).
      subscribersRef.current.forEach((cb) => cb(p));

      // Throttle HUD updates to HUD_HZ so React doesn't re-render every frame.
      hudClock += dt;
      if (hudClock > 1 / HUD_HZ) {
        hudClock = 0;
        const range = Math.max(1, maxScroll());
        const progress = clamp(window.scrollY / range, 0, 1);
        const waypoint = currentWaypoint(sectionsRef);
        setHud((h) => ({
          ...h,
          pose: { strafe: p.strafe, yaw: p.yaw },
          vel: { scroll: v.scroll, ang: v.ang },
          pressed: Array.from(pressed),
          waypoint,
          progress,
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
      pressKey,
      releaseKey,
      // Pose stream for RobotWalker
      subscribePose,
    }),
    [expanded, armed, hud, toggleExpanded, toggleArmed, halt, pressKey, releaseKey, subscribePose]
  );

  return <TeleopContext.Provider value={value}>{children}</TeleopContext.Provider>;
};

export const useTeleop = () => {
  const ctx = useContext(TeleopContext);
  if (!ctx) {
    // Fail loud — if a consumer renders outside the provider, the robot
    // would silently sit still and the rail wouldn't react.
    throw new Error('useTeleop must be used inside <TeleopProvider>');
  }
  return ctx;
};
