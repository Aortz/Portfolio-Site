/* ---------------------------------------------------------------------------
   Route constants — deliberately free of any `three` import so the teleop
   provider (main bundle, page mode included) doesn't drag the 3D library in.
   `world/path.js` builds the spline from ROUTE_POINTS and warns in dev if the
   hard-coded arc-length fractions below go stale; recompute them with the
   snippet in path.js when you move anything.

   Entries with an `id` are platforms; bare entries are via points that shape
   the winding route. `hidden` platforms stay off the nav and show as '??' on
   the map until visited.
   --------------------------------------------------------------------------- */

export const SPAWN_POS = [15, -10, 35];

export const ROUTE_POINTS = [
  { id: 'home',     label: 'HOME',     number: '01', pos: [0, 0, 0] },
  { pos: [18, 4, -14] },
  { id: 'about',    label: 'ABOUT',    number: '02', pos: [30, 5, -25] },
  { pos: [20, -3, -45] },
  { id: 'projects', label: 'PROJECTS', number: '03', pos: [10, -2, -65] },
  { pos: [-15, 6, -80] },
  { id: 'gallery',  label: 'GALLERY',  number: '04', pos: [-30, 8, -95] },
  { pos: [-18, 2, -118] },
  { id: 'resume',   label: 'RESUME',   number: '05', pos: [-5, 0, -135] },
  { pos: [10, -6, -155] },
  { id: 'signal',   label: 'SIGNAL',   number: '??', pos: [25, -4, -172], hidden: true },
];

export const PLATFORMS = ROUTE_POINTS.filter((p) => p.id);
export const MAIN_PLATFORMS = PLATFORMS.filter((p) => !p.hidden);

// Player `t`: HOME = 0, SIGNAL (route end) = 1, spawn < 0. Arc-length
// fractions of the centripetal Catmull-Rom through spawn + ROUTE_POINTS.
export const SPAWN_T = -0.16881;
export const PLATFORM_T = [0, 0.17062, 0.36839, 0.58906, 0.79472, 1];
// Via-point fractions — the route gates sit here.
export const VIA_T = [0.1, 0.2728, 0.4967, 0.7037, 0.9036];

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
