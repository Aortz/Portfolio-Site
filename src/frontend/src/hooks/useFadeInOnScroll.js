import { useEffect, useRef, useState } from 'react';

/* One-shot fade-in when the element first scrolls into view.
   `disabled` (used when a section is docked inside the world panel) reports
   visible immediately — the dock animates its own entrance. */
export default function useFadeInOnScroll({
  threshold = 0.15,
  rootMargin = '0px',
  disabled = false,
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) { setVisible(true); return undefined; }
    const node = ref.current;
    if (!node) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin, disabled]);

  return [ref, visible];
}
