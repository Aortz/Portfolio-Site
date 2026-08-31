import { CatmullRomCurve3, Vector3 } from 'three';
import { ROUTE_POINTS, SPAWN_POS, SPAWN_T, PLATFORM_T } from './route';

/* ---------------------------------------------------------------------------
   The orbital route as geometry. Player `t` is remapped so HOME = 0 and the
   route's last platform = 1 (spawn < 0); `getPointAt`/`getTangentAt` are
   arc-length parameterised, so constant dt = constant world speed.

   Constants live in ./route.js (no `three` import) — recompute them with:

     node -e '
       const {CatmullRomCurve3,Vector3}=require("three");
       const PTS=[SPAWN_POS, ...ROUTE_POINTS.map(p=>p.pos)];
       const PLAT_IDX = indices of id-bearing entries (offset +1 for spawn);
       const P=PTS.map(a=>new Vector3(...a));
       const c=new CatmullRomCurve3(P,false,"centripetal",0.5);
       const d=800,L=c.getLengths(d),tot=L[d];
       const fr=P.map((_,i)=>{const t=i/(P.length-1)*d,lo=Math.floor(t),hi=Math.min(d,lo+1);
         return (L[lo]+(L[hi]-L[lo])*(t-lo))/tot});
       const h=fr[1],s=fr[fr.length-1]-h;
       console.log((fr[0]-h)/s, PLAT_IDX.map(i=>(fr[i]-h)/s));'
   --------------------------------------------------------------------------- */

const points = [new Vector3(...SPAWN_POS), ...ROUTE_POINTS.map((p) => new Vector3(...p.pos))];

export const curve = new CatmullRomCurve3(points, false, 'centripetal', 0.5);

// Raw arc-length fractions of each control point (spawn first).
const fractions = (() => {
  const divisions = 800;
  const lengths = curve.getLengths(divisions);
  const total = lengths[divisions];
  return points.map((_, i) => {
    const target = (i / (points.length - 1)) * divisions;
    const lo = Math.floor(target);
    const hi = Math.min(divisions, lo + 1);
    const len = lengths[lo] + (lengths[hi] - lengths[lo]) * (target - lo);
    return len / total;
  });
})();

const T_HOME = fractions[1];
const span = fractions[fractions.length - 1] - T_HOME;
const toArc = (t) => T_HOME + t * span;

if (process.env.NODE_ENV !== 'production') {
  const platIdx = ROUTE_POINTS
    .map((p, i) => (p.id ? i + 1 : -1))
    .filter((i) => i > 0);
  const live = platIdx.map((i) => (fractions[i] - T_HOME) / span);
  const spawn = (fractions[0] - T_HOME) / span;
  const off = live.some((v, i) => Math.abs(v - PLATFORM_T[i]) > 1e-3) || Math.abs(spawn - SPAWN_T) > 1e-3;
  if (off) {
    // eslint-disable-next-line no-console
    console.warn('[route] PLATFORM_T/SPAWN_T in world/route.js are stale:', { spawn, live });
  }
}

export const getPointAt = (t, out = new Vector3()) => {
  const a = Math.max(0, Math.min(1, toArc(t)));
  return curve.getPointAt(a, out);
};

export const getTangentAt = (t, out = new Vector3()) => {
  const a = Math.max(0.0005, Math.min(0.9995, toArc(t)));
  curve.getTangentAt(a, out);
  return out.normalize();
};

export {
  ROUTE_POINTS,
  PLATFORMS,
  MAIN_PLATFORMS,
  SPAWN_T,
  PLATFORM_T,
  VIA_T,
  tForPlatform,
  nearestPlatform,
  stepPlatform,
} from './route';
