import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTeleop } from '../../teleop/TeleopProvider';
import { PLATFORMS, PLATFORM_T, SPAWN_POS } from '../../world/route';

/* Top-down schematic of the route (world X → right, world Z → up the map),
   drawn as SVG so it costs nothing on the GPU. The robot marker is
   interpolated piecewise-linearly between platforms from `hud.progress`,
   which is close enough for a map. Toggle with M or the console's Map button. */

const SIZE = 280;          // width
const H = SIZE - 60;       // height
const PAD = 34;

const Root = styled.div`
  position: fixed;
  right: 0;
  bottom: 64px; /* clears the Telemetry pill */
  z-index: 15;
  width: ${SIZE}px;
  height: ${SIZE - 60}px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-right: none;
  border-radius: ${({ theme }) => `${theme.radius.sm} 0 0 ${theme.radius.sm}`};
  background: ${({ theme }) => theme.color.surface};
  overflow: hidden;
  font-family: ${({ theme }) => theme.font.mono};
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: ${({ theme }) => theme.color.accent};
    opacity: 0.65;
  }
  &::before { top: 6px; left: 6px; border-top: 1.5px solid; border-left: 1.5px solid; }
  &::after { bottom: 6px; left: 6px; border-bottom: 1.5px solid; border-left: 1.5px solid; }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.color.fgSubtle};
`;

const Label = styled.text`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 9px;
  letter-spacing: 0.08em;
  fill: ${({ theme, $active }) => ($active ? theme.color.accent : theme.color.fgSubtle)};
`;

const MiniMap = () => {
  const { mapOpen, hud } = useTeleop();

  const { points, spawn } = useMemo(() => {
    const all = [SPAWN_POS, ...PLATFORMS.map((p) => p.pos)];
    const xs = all.map((p) => p[0]);
    const zs = all.map((p) => p[2]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minZ = Math.min(...zs), maxZ = Math.max(...zs);
    const span = Math.max(maxX - minX, maxZ - minZ) || 1;
    const scale = Math.min(SIZE - PAD * 2, H - PAD * 2) / span;
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
    const map = ([x, , z]) => ({
      x: SIZE / 2 + (x - cx) * scale,
      y: H / 2 + 10 + (z - cz) * scale, // +z is toward the camera → down the map; +10 clears the title
    });
    return { points: PLATFORMS.map((p) => map(p.pos)), spawn: map(SPAWN_POS) };
  }, []);

  if (!mapOpen) return null;

  // Robot marker: piecewise-linear between platform screen positions.
  const t = Math.max(0, Math.min(1, hud.progress));
  let i = 0;
  while (i < PLATFORM_T.length - 2 && t > PLATFORM_T[i + 1]) i += 1;
  const a = points[i], b = points[i + 1];
  const f = (t - PLATFORM_T[i]) / (PLATFORM_T[i + 1] - PLATFORM_T[i] || 1);
  const robot = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };

  const path = [spawn, ...points].map((p, k) => `${k ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <Root aria-label="Route map" role="img">
      <Title>{'// ROUTE MAP'}</Title>
      <svg width={SIZE} height={H} viewBox={`0 0 ${SIZE} ${H}`}>
        <path d={path} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" style={{ color: 'var(--map-fg, #71717A)' }} />
        {points.map((p, k) => {
          const active = hud.waypointId === PLATFORMS[k].id;
          return (
            <g key={PLATFORMS[k].id}>
              <circle cx={p.x} cy={p.y} r={active ? 5 : 3.5} fill={active ? '#06B6D4' : 'none'} stroke="#06B6D4" strokeWidth="1.2" />
              <Label x={p.x} y={p.y - 9} textAnchor="middle" $active={active}>
                {PLATFORMS[k].number}
              </Label>
            </g>
          );
        })}
        <circle cx={robot.x} cy={robot.y} r="3" fill="#FAFAFA" stroke="#06B6D4" strokeWidth="1.5" />
        <circle cx={robot.x} cy={robot.y} r="7" fill="none" stroke="#06B6D4" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
    </Root>
  );
};

export default MiniMap;
