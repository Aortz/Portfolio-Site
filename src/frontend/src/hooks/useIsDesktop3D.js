import { useEffect, useState } from 'react';

const DESKTOP_QUERY = '(min-width: 768px)';
const COARSE_QUERY = '(hover: none) and (pointer: coarse)';

let webglCache = null;
const webglAvailable = () => {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement('canvas');
    webglCache = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webglCache = false;
  }
  return webglCache;
};

const evaluate = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(DESKTOP_QUERY).matches &&
  !window.matchMedia(COARSE_QUERY).matches &&
  webglAvailable();

/* true → render the orbital world + docked panels.
   false → plain vertical page (phones, touch-only tablets, no WebGL). */
export default function useIsDesktop3D() {
  const [is3D, setIs3D] = useState(evaluate);

  useEffect(() => {
    const mqs = [window.matchMedia(DESKTOP_QUERY), window.matchMedia(COARSE_QUERY)];
    const update = () => setIs3D(evaluate());
    mqs.forEach((mq) => mq.addEventListener('change', update));
    return () => mqs.forEach((mq) => mq.removeEventListener('change', update));
  }, []);

  return is3D;
}
