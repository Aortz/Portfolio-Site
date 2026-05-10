import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { useThemeMode } from '../../theme/ThemeProvider';

const FONT_SIZE = 14;
const TRAIL_LENGTH = 12;
const SPAWN_DENSITY = 0.6;
const SPEED_MAP = { slow: 0.5, normal: 1, fast: 2 };

const hexToRgb = (hex) => {
  const m = (hex || '#06B6D4').replace('#', '');
  return {
    r: parseInt(m.slice(0, 2), 16) || 6,
    g: parseInt(m.slice(2, 4), 16) || 182,
    b: parseInt(m.slice(4, 6), 16) || 212,
  };
};

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  & canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const ParticleBg = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const { particleSpeed, reducedMotion } = useThemeMode();
  const speedRef = useRef(SPEED_MAP[particleSpeed] ?? 1);

  useEffect(() => {
    speedRef.current = SPEED_MAP[particleSpeed] ?? 1;
  }, [particleSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let raf;
    let drops = [];

    if (reducedMotion) {
      // Honor reduced-motion: clear once and don't schedule the rAF loop.
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      ctx.clearRect(0, 0, w, h);
      return undefined;
    }

    const { r, g, b } = hexToRgb(theme.color.accent);

    const seedDrops = () => {
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, (_, i) => ({
        x: i * FONT_SIZE,
        y: Math.random() * -canvas.height,
        speed: 0.4 + Math.random() * 0.9,
        chars: Array.from({ length: TRAIL_LENGTH }, () =>
          Math.random() > 0.5 ? '1' : '0'
        ),
        active: Math.random() < SPAWN_DENSITY,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seedDrops();
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'top';

      for (const d of drops) {
        if (!d.active) continue;
        for (let i = 0; i < d.chars.length; i += 1) {
          const charY = d.y - i * FONT_SIZE;
          if (charY < 0 || charY > canvas.height) continue;
          const alpha = (1 - i / d.chars.length) ** 1.4;
          ctx.fillStyle =
            i === 0
              ? `rgba(${r}, ${g}, ${b}, 1)`
              : `rgba(${r}, ${g}, ${b}, ${alpha * 0.55})`;
          if (Math.random() < 0.02) {
            d.chars[i] = Math.random() > 0.5 ? '1' : '0';
          }
          ctx.fillText(d.chars[i], d.x, charY);
        }
        d.y += d.speed * FONT_SIZE * 0.5 * speedRef.current;
        if (d.y - d.chars.length * FONT_SIZE > canvas.height) {
          d.y = Math.random() * -200;
          d.speed = 0.4 + Math.random() * 0.9;
          d.active = Math.random() < SPAWN_DENSITY;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme.color.accent, reducedMotion]);

  return (
    <Wrapper aria-hidden="true">
      <canvas ref={canvasRef} />
    </Wrapper>
  );
};

export default ParticleBg;
