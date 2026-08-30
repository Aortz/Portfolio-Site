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
import {
  PLATFORMS,
  PLATFORM_T,
  SPAWN_T,
  tForPlatform,
  nearestPlatform,
  stepPlatform,
} from '../world/route';

/* ---------------------------------------------------------------------------
   TeleopProvider — progress motor for the RECON-2 field unit.

   The robot's place in the world is one scalar `t` ∈ [SPAWN_T, 1] along the
   orbital route (world/path.js). Everything that moves the robot writes `t`:
     - W/S keys while armed          → velocity integration (the "motor")
     - mouse wheel anywhere          → direct delta (no arming needed)
     - nav click / hash / goTo(id)   → eased tween to a platform
     - first-visit auto-tour         → tween from SPAWN_T to HOME

   Two state surfaces, as before:
     * React `hud` at ~10 Hz for the rail + dock (waypointId drives panels)
     * `poseRef` streamed every frame to PlayerRobot via subscribePose

   `mode === 'page'` (phones / no WebGL): the loop is idle and goTo() falls
   back to a hash jump on the plain vertical page.
   --------------------------------------------------------------------------- */

const TeleopContext = createContext(null);

// Tunables ----------------------------------------------------------
const PROGRESS_SPEED = 0.12;     // t/sec at full W/S deflection (~8 s end-to-end)
const WHEEL_GAIN = 0.0006;       // t per px of wheel deltaY
const WHEEL_MAX_PX = 100;        // clamp one wheel event's contribution
const STRAFE_SPEED = 0.6;        // units/sec
const STRAFE_MAX = 1.5;          // world units either side of the route
const ANG_SPEED = 1.2;           // rad/sec
const RAMP_TAU = 0.25;
const DECAY_TAU = 0.30;
const HALT_DURATION = 0.30;      // seconds — strafe/yaw ease back to 0
const HUD_HZ = 10;
const MANUAL_HOLD = 0.6;         // seconds — motor pause after wheel input
const MOVING_THRESHOLD = 0.005;  // t/sec
const ARRIVE_RADIUS = 0.06;      // t — within this of a platform = docked
const GOTO_DURATION = 1.4;       // seconds
const TOUR_DURATION = 2.5;       // seconds
const HASH_DEBOUNCE = 250;       // ms
const TOUR_FLAG = 'recon2-toured';
const JUMP_VELOCITY = 7.5;     // world units/sec
const GRAVITY = 18;            // world units/sec²
const CORE_JUMP_HEIGHT = 1.0;  // jumpY needed to grab a core while docked
const MISSION_KEY = 'recon2-mission';
const SUB_TIME = 9;            // seconds — full-throttle route is ~8.3s, so this needs a clean run

export const ACHIEVEMENTS = {
  'first-jump':  { title: 'LIFT-OFF',         desc: 'First jump' },
  'first-core':  { title: 'CORE SAMPLE',      desc: 'Collected a data core' },
  'all-visited': { title: 'FULL SURVEY',      desc: 'Docked at every platform' },
  'all-cores':   { title: 'ARCHIVE COMPLETE', desc: 'All five data cores recovered' },
  'speedrun':    { title: 'TIME TRIAL',       desc: 'Completed a HOME→RESUME run' },
  'sub-time':    { title: 'AFTERBURNER',      desc: `Run under ${SUB_TIME}s` },
  'skywalker':   { title: 'SKYWALKER',        desc: '25 jumps' },
};

const loadMission = () => {
  const empty = { cores: [], visited: ['home'], achievements: [], best: null, jumps: 0 };
  try {
    const raw = window.localStorage.getItem(MISSION_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch { return empty; }
};

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
  Space: 'jump',
  KeyX: 'halt',
  KeyM: 'map',
  KeyT: 'run',
};

const LABEL_BY_ID = Object.fromEntries(PLATFORMS.map((p) => [p.id, p.label]));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

const hashId = () => {
  const h = (typeof window !== 'undefined' ? window.location.hash : '').replace('#', '');
  return PLATFORMS.some((p) => p.id === h) ? h : null;
};

export const TeleopProvider = ({ mode = 'world', children }) => {
  const { reducedMotion } = useThemeMode();
  // Console open and armed by default — the robot is the site's navigation.
  const [expanded, setExpanded] = useState(true);
  const [armed, setArmed] = useState(true);
  const [mapOpen, setMapOpen] = useState(false);
  const [mission, setMission] = useState(loadMission);
  const [unlocks, setUnlocks] = useState([]); // achievement toast queue
  const [run, setRun] = useState({ active: false, pending: false, elapsed: 0, splits: [] });
  const missionRef = useRef(mission);
  const runRef = useRef({ active: false, pending: false, start: 0, splits: [], next: 1 });
  useEffect(() => { missionRef.current = mission; }, [mission]);
  useEffect(() => {
    try { window.localStorage.setItem(MISSION_KEY, JSON.stringify(mission)); } catch { /* private mode */ }
  }, [mission]);

  // Award an achievement once; queues a toast.
  const unlock = useCallback((id) => {
    if (missionRef.current.achievements.includes(id)) return;
    missionRef.current = { ...missionRef.current, achievements: [...missionRef.current.achievements, id] };
    setMission(missionRef.current);
    setUnlocks((q) => [...q, id]);
  }, []);
  const popUnlock = useCallback(() => setUnlocks((q) => q.slice(1)), []);
  const [touring, setTouring] = useState(false);
  const [hint, setHint] = useState(false);

  const [hud, setHud] = useState(() => {
    const start = hashId();
    return {
      pose: { strafe: 0, yaw: 0 },
      vel: { progress: 0, ang: 0 },
      uptime: 0,
      pressed: [],
      waypointId: start || 'home',
      waypoint: LABEL_BY_ID[start || 'home'],
      progress: start ? tForPlatform(start) : 0,
    };
  });

  const tRef = useRef(hud.progress);
  const poseRef = useRef({ t: hud.progress, yaw: 0, strafe: 0, moving: false, jumpY: 0 });
  const jumpRef = useRef({ y: 0, vy: 0 });
  const velRef = useRef({ progress: 0, strafe: 0, ang: 0 });
  const pressedRef = useRef(new Set());
  const armedRef = useRef(true);
  const expandedRef = useRef(true);
  const reducedRef = useRef(false);
  const modeRef = useRef(mode);
  const haltRef = useRef(null);
  const tweenRef = useRef(null);      // { from, to, start, dur, ease, onDone }
  const lastManualRef = useRef(-Infinity);
  const lastWheelRef = useRef(0);
  const waypointRef = useRef(hud.waypointId);
  const hashTimerRef = useRef(0);
  const subscribersRef = useRef(new Set());

  useEffect(() => { armedRef.current = armed; }, [armed]);
  useEffect(() => { expandedRef.current = expanded; }, [expanded]);
  useEffect(() => { reducedRef.current = reducedMotion; }, [reducedMotion]);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    if (!expanded) return undefined;
    const id = setInterval(() => setHud((h) => ({ ...h, uptime: h.uptime + 1 })), 1000);
    return () => clearInterval(id);
  }, [expanded]);

  const subscribePose = useCallback((cb) => {
    subscribersRef.current.add(cb);
    return () => subscribersRef.current.delete(cb);
  }, []);

  // ---- Movement primitives -------------------------------------------
  const cancelTween = () => { tweenRef.current = null; };

  const startTween = useCallback((to, dur, ease, onDone) => {
    if (reducedRef.current || dur <= 0) {
      tRef.current = to;
      tweenRef.current = null;
      if (onDone) onDone();
      return;
    }
    tweenRef.current = {
      from: tRef.current,
      to,
      start: performance.now() / 1000,
      dur,
      ease,
      onDone,
    };
    velRef.current.progress = 0;
  }, []);

  const goTo = useCallback((id) => {
    if (modeRef.current !== 'world') {
      window.location.hash = `#${id}`;
      return;
    }
    startTween(tForPlatform(id), GOTO_DURATION, easeInOutCubic);
  }, [startTween]);

  const nudge = useCallback((delta) => {
    cancelTween();
    tRef.current = clamp(tRef.current + delta, 0, 1);
    lastManualRef.current = performance.now() / 1000;
    velRef.current.progress = 0;
  }, []);

  const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);
  const toggleArmed = useCallback(() => setArmed((a) => !a), []);
  const dismissHint = useCallback(() => setHint(false), []);
  const toggleMap = useCallback(() => setMapOpen((m) => !m), []);

  const jump = useCallback(() => {
    const j = jumpRef.current;
    if (j.y > 0.01) return; // already airborne
    j.vy = JUMP_VELOCITY;
    j.y = 0.011;
    const m = missionRef.current;
    missionRef.current = { ...m, jumps: (m.jumps || 0) + 1 };
    setMission(missionRef.current);
    unlock('first-jump');
    if (missionRef.current.jumps >= 25) unlock('skywalker');
  }, [unlock]);

  // Time trial: fly to HOME, start the clock on arrival, split at each
  // platform in order, stop at RESUME.
  const startRun = useCallback(() => {
    const r = runRef.current;
    r.active = false; r.pending = true; r.splits = []; r.next = 1;
    setRun({ active: false, pending: true, elapsed: 0, splits: [] });
    startTween(0, GOTO_DURATION, easeInOutCubic, () => {
      r.pending = false; r.active = true; r.start = performance.now() / 1000;
      setRun({ active: true, pending: false, elapsed: 0, splits: [] });
    });
  }, [startTween]);

  const halt = useCallback(() => {
    haltRef.current = {
      startTime: performance.now() / 1000,
      from: { strafe: poseRef.current.strafe, yaw: poseRef.current.yaw },
    };
    velRef.current = { progress: 0, strafe: 0, ang: 0 };
    cancelTween();
  }, []);

  const pressKey = useCallback((code) => {
    const action = KEY_MAP[code];
    if (!action || !expandedRef.current) return;
    if (action === 'halt') { halt(); return; }
    if (action === 'map') { setMapOpen((m) => !m); return; }
    if (action === 'run') { startRun(); return; }
    if (!armedRef.current) return;
    if (action === 'jump') { jump(); return; }
    cancelTween();
    if (reducedRef.current && (action === 'up' || action === 'down')) {
      const i = stepPlatform(tRef.current, action === 'up' ? 1 : -1);
      tRef.current = PLATFORM_T[i];
      return;
    }
    pressedRef.current.add(code);
  }, [halt, jump, startRun]);

  const releaseKey = useCallback((code) => { pressedRef.current.delete(code); }, []);

  // ---- Keyboard capture -----------------------------------------------
  useEffect(() => {
    if (mode !== 'world') return undefined;
    const onKeyDown = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;
      if (hint) setHint(false);
      if (!expandedRef.current) return;
      e.preventDefault();
      if (e.repeat) return;
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
  }, [mode, hint, pressKey, releaseKey]);

  // ---- Wheel drives progress directly ---------------------------------
  useEffect(() => {
    if (mode !== 'world') return undefined;
    const onWheel = (e) => {
      // The dock stops propagation for its own scrolling; anything that
      // reaches window is meant for the robot.
      const now = performance.now();
      if (reducedRef.current) {
        if (now - lastWheelRef.current < 400) return; // one platform per flick
        lastWheelRef.current = now;
        cancelTween();
        const i = stepPlatform(tRef.current, e.deltaY > 0 ? 1 : -1);
        tRef.current = PLATFORM_T[i];
        return;
      }
      if (now - lastWheelRef.current < 16) return;
      lastWheelRef.current = now;
      nudge(clamp(e.deltaY, -WHEEL_MAX_PX, WHEEL_MAX_PX) * WHEEL_GAIN);
      if (hint) setHint(false);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [mode, nudge, hint]);

  // ---- Hash routing ---------------------------------------------------
  useEffect(() => {
    if (mode !== 'world') return undefined;
    const onHash = () => {
      const id = hashId() || 'home'; // empty hash (back to '/') means HOME
      if (id !== waypointRef.current) goTo(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [mode, goTo]);

  // ---- First-visit auto-tour ------------------------------------------
  useEffect(() => {
    if (mode !== 'world') return undefined;
    let toured = false;
    try { toured = !!window.sessionStorage.getItem(TOUR_FLAG); } catch { toured = true; }
    if (hashId() || toured || reducedRef.current) return undefined;

    tRef.current = SPAWN_T;
    setTouring(true);
    startTween(0, TOUR_DURATION, easeOutCubic, () => {
      setTouring(false);
      setHint(true);
      try { window.sessionStorage.setItem(TOUR_FLAG, '1'); } catch { /* private mode */ }
    });
    return undefined;
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // ---- rAF integration loop -------------------------------------------
  useEffect(() => {
    if (mode !== 'world') return undefined;
    let raf = 0;
    let last = performance.now() / 1000;
    let hudClock = 0;

    const step = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - last);
      last = now;

      // Targets from held keys.
      let tvP = 0, tvS = 0, tvA = 0;
      const pressed = pressedRef.current;
      if (armedRef.current && expandedRef.current) {
        if (pressed.has('KeyW') || pressed.has('ArrowUp'))    tvP += PROGRESS_SPEED;
        if (pressed.has('KeyS') || pressed.has('ArrowDown'))  tvP -= PROGRESS_SPEED;
        if (pressed.has('KeyQ'))                              tvS -= STRAFE_SPEED;
        if (pressed.has('KeyE'))                              tvS += STRAFE_SPEED;
        if (pressed.has('KeyA') || pressed.has('ArrowLeft'))  tvA += ANG_SPEED;
        if (pressed.has('KeyD') || pressed.has('ArrowRight')) tvA -= ANG_SPEED;
      }
      if (reducedRef.current) tvP = 0;
      if (now - lastManualRef.current < MANUAL_HOLD) tvP = 0;

      const tau = (tvP || tvS || tvA) ? RAMP_TAU : DECAY_TAU;
      const k = 1 - Math.exp(-dt / tau);
      const v = velRef.current;
      v.progress += (tvP - v.progress) * k;
      v.strafe   += (tvS - v.strafe)   * k;
      v.ang      += (tvA - v.ang)      * k;

      // Tween overrides the motor.
      const tw = tweenRef.current;
      if (tw) {
        const x = clamp((now - tw.start) / tw.dur, 0, 1);
        tRef.current = tw.from + (tw.to - tw.from) * tw.ease(x);
        v.progress = 0;
        if (x >= 1) {
          tweenRef.current = null;
          if (tw.onDone) tw.onDone();
        }
      } else if (v.progress) {
        const next = tRef.current + v.progress * dt;
        if (next <= 0 || next >= 1) v.progress = 0;
        tRef.current = clamp(next, 0, 1);
      }

      // Strafe / yaw, with halt easing.
      const p = poseRef.current;
      if (haltRef.current) {
        const x = (now - haltRef.current.startTime) / HALT_DURATION;
        if (x >= 1) { p.strafe = 0; p.yaw = 0; haltRef.current = null; }
        else {
          const e = 1 - Math.pow(1 - x, 3);
          p.strafe = haltRef.current.from.strafe * (1 - e);
          p.yaw    = haltRef.current.from.yaw    * (1 - e);
        }
        v.strafe = 0; v.ang = 0;
      } else {
        p.strafe = clamp(p.strafe + v.strafe * dt, -STRAFE_MAX, STRAFE_MAX);
        p.yaw += v.ang * dt;
      }
      p.t = tRef.current;
      p.moving = !!tw || Math.abs(v.progress) > MOVING_THRESHOLD;

      // Jump: simple ballistic hop above the route.
      const j = jumpRef.current;
      if (j.y > 0 || j.vy > 0) {
        j.vy -= GRAVITY * dt;
        j.y = Math.max(0, j.y + j.vy * dt);
        if (j.y === 0) j.vy = 0;
      }
      p.jumpY = j.y;

      // ---- Mission: cores, survey, time trial --------------------------
      const m = missionRef.current;
      const dockedId = waypointRef.current;
      if (dockedId && j.y > CORE_JUMP_HEIGHT && !m.cores.includes(dockedId)) {
        missionRef.current = { ...m, cores: [...m.cores, dockedId] };
        setMission(missionRef.current);
        unlock('first-core');
        if (missionRef.current.cores.length === PLATFORMS.length) unlock('all-cores');
      }
      const r = runRef.current;
      if (r.active) {
        const elapsed = now - r.start;
        if (dockedId === PLATFORMS[r.next]?.id) {
          r.splits = [...r.splits, { id: dockedId, t: elapsed }];
          r.next += 1;
          if (r.next >= PLATFORMS.length) {
            r.active = false;
            const mm = missionRef.current;
            const best = mm.best == null || elapsed < mm.best ? elapsed : mm.best;
            missionRef.current = { ...mm, best };
            setMission(missionRef.current);
            unlock('speedrun');
            if (elapsed < SUB_TIME) unlock('sub-time');
          }
          setRun({ active: r.active, pending: false, elapsed, splits: r.splits });
        }
      }

      subscribersRef.current.forEach((cb) => cb(p));

      // Waypoint detection every frame (cheap), HUD flush at HUD_HZ.
      const near = nearestPlatform(tRef.current);
      const wp = near.distance < ARRIVE_RADIUS && !tw ? near.platform.id : null;
      if (wp !== waypointRef.current) {
        waypointRef.current = wp;
        if (wp && !missionRef.current.visited.includes(wp)) {
          missionRef.current = { ...missionRef.current, visited: [...missionRef.current.visited, wp] };
          setMission(missionRef.current);
          if (missionRef.current.visited.length === PLATFORMS.length) unlock('all-visited');
        }
        window.clearTimeout(hashTimerRef.current);
        if (wp) {
          hashTimerRef.current = window.setTimeout(() => {
            if (hashId() !== wp) window.history.replaceState(null, '', `#${wp}`);
          }, HASH_DEBOUNCE);
        }
      }

      hudClock += dt;
      if (hudClock > 1 / HUD_HZ) {
        hudClock = 0;
        if (runRef.current.active) {
          setRun((s) => ({ ...s, elapsed: now - runRef.current.start }));
        }
        setHud((h) => ({
          ...h,
          pose: { strafe: p.strafe, yaw: p.yaw },
          vel: { progress: v.progress, ang: v.ang },
          pressed: Array.from(pressed),
          waypointId: wp,
          waypoint: wp ? LABEL_BY_ID[wp] : '—',
          progress: tRef.current,
        }));
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hashTimerRef.current);
    };
  }, [mode, unlock]);

  const value = useMemo(
    () => ({
      mode,
      expanded,
      armed,
      touring,
      hint,
      mapOpen,
      mission,
      run,
      unlocks,
      hud,
      toggleExpanded,
      toggleArmed,
      halt,
      pressKey,
      releaseKey,
      goTo,
      nudge,
      jump,
      dismissHint,
      toggleMap,
      startRun,
      popUnlock,
      subscribePose,
    }),
    [mode, expanded, armed, touring, hint, mapOpen, mission, run, unlocks, hud, toggleExpanded, toggleArmed, halt,
      pressKey, releaseKey, goTo, nudge, jump, dismissHint, toggleMap, startRun, popUnlock, subscribePose]
  );

  return <TeleopContext.Provider value={value}>{children}</TeleopContext.Provider>;
};

export const useTeleop = () => {
  const ctx = useContext(TeleopContext);
  if (!ctx) throw new Error('useTeleop must be used inside <TeleopProvider>');
  return ctx;
};
