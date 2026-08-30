/* ---------------------------------------------------------------------------
   Route constants — deliberately free of any `three` import so the teleop
   provider (which lives in the main bundle for page mode too) doesn't drag
   the 3D library in. `world/path.js` builds the actual spline from these and
   asserts in development that the hard-coded arc-length fractions still
   match; if you move a platform, rerun the snippet in path.js and paste the
   new numbers here.
   --------------------------------------------------------------------------- */

export const PLATFORMS = [
  { id: 'home',     label: 'HOME',     number: '01', pos: [0, 0, 0] },
  { id: 'about',    label: 'ABOUT',    number: '02', pos: [12, 2, -10] },
  { id: 'projects', label: 'PROJECTS', number: '03', pos: [4, -1, -26] },
  { id: 'gallery',  label: 'GALLERY',  number: '04', pos: [-12, 3, -38] },
  { id: 'resume',   label: 'RESUME',   number: '05', pos: [-2, 0, -54] },
];

// Off-route spawn used by the first-visit fly-in; sits "behind" HOME on the
// camera's side of the scene.
export const SPAWN_POS = [6, -4, 14];

// Player `t`: HOME = 0, RESUME = 1, spawn < 0. Arc-length fractions of the
// centripetal Catmull-Rom through SPAWN_POS + PLATFORMS (see path.js).
export const SPAWN_T = -0.21325;
export const PLATFORM_T = [0, 0.21543, 0.46328, 0.74029, 1];

export const tForPlatform = (id) => {
  const i = PLATFORMS.findIndex((p) => p.id === id);
  return i < 0 ? 0 : PLATFORM_T[i];
};

/** Nearest platform to `t`, with its distance in t-units. */
export const nearestPlatform = (t) => {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < PLATFORM_T.length; i += 1) {
    const d = Math.abs(PLATFORM_T[i] - t);
    if (d < bestD) { bestD = d; best = i; }
  }
  return { platform: PLATFORMS[best], index: best, distance: bestD };
};

/** Index of the next platform in direction `sign` (+1 forward / -1 back). */
export const stepPlatform = (t, sign) => {
  const eps = 1e-4;
  if (sign > 0) {
    const i = PLATFORM_T.findIndex((pt) => pt > t + eps);
    return i < 0 ? PLATFORM_T.length - 1 : i;
  }
  for (let i = PLATFORM_T.length - 1; i >= 0; i -= 1) {
    if (PLATFORM_T[i] < t - eps) return i;
  }
  return 0;
};
