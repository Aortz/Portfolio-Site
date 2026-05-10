import { useEffect, useRef, useState } from 'react';

export default function useFadeInOnScroll({ threshold = 0.15, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, [threshold, rootMargin]);

  return [ref, visible];
}
