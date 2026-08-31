import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useTeleop } from '../../teleop/TeleopProvider';
import {
  PLATFORMS,
  PLATFORM_T,
  SPAWN_T,
  nearestPlatform,
  getPointAt,
} from '../../world/path';

/* ---------------------------------------------------------------------------
   Tactical route map. Top-down projection of the real spline (world X →
   right, world Z → down). Interactive: click a platform to fly there.
   Loaded lazily inside the world chunk, so importing world/path.js (three)
   is fine here.
   --------------------------------------------------------------------------- */

const W = 280;
const H = 300;
const PAD = 38;
const SAMPLES = 64;

const Root = styled.div`
  position: fixed;
  right: 0;
  bottom: 20px;
  z-index: 15;
  width: ${W}px;
  height: ${H}px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-right: none;
  border-radius: ${({ theme }) => `${theme.radius.sm} 0 0 ${theme.radius.sm}`};
  background: ${({ theme }) => theme.color.surface};
  overflow: hidden;
  font-family: ${({ theme }) => theme.font.mono};

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: ${({ theme }) => theme.color.accent};
    opacity: 0.65;
    pointer-events: none;
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
  left: 14px;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.color.fgSubtle};
  pointer-events: none;
`;

const Readout = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.color.fgMuted};
  pointer-events: none;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.color.fgSubtle};
  pointer-events: none;
`;

const Node = styled.g`
  cursor: pointer;

  & .hover-ring { opacity: 0; }
  &:hover .hover-ring { opacity: 0.6; }
  &:focus-visible { outline: none; }
  &:focus-visible .hover-ring { opacity: 0.9; }
`;

const NodeLabel = styled.text`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 9px;
  letter-spacing: 0.08em;
  fill: ${({ theme, $active }) => ($active ? theme.color.accent : theme.color.fgSubtle)};
  pointer-events: none;
`;

const MiniMap = () => {
  const { mapOpen, hud, mission, goTo } = useTeleop();
  const theme = useTheme();
  const accent = theme.color.accent;

  // Project the spline once: sample SPAWN_T..1 top-down, fit into the box.
  const { project, poly, platPts } = useMemo(() => {
    const raw = [];
    for (let i = 0; i <= SAMPLES; i += 1) {
      const t = SPAWN_T + ((1 - SPAWN_T) * i) / SAMPLES;
      const p = getPointAt(t);
      raw.push({ t, x: p.x, z: p.z });
    }
    const xs = raw.map((p) => p.x);
    const zs = raw.map((p) => p.z);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minZ = Math.min(...zs), maxZ = Math.max(...zs);
    const scale = Math.min(
      (W - PAD * 2) / Math.max(1e-6, maxX - minX),
      (H - PAD * 2 - 20) / Math.max(1e-6, maxZ - minZ)
    );
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
    const proj = (x, z) => ({
      x: W / 2 + (x - cx) * scale,
      y: H / 2 + 6 + (z - cz) * scale,
    });
    const polyPts = raw.map((p) => ({ t: p.t, ...proj(p.x, p.z) }));
    const pl = PLATFORMS.map((p, i) => ({
      ...p,
      t: PLATFORM_T[i],
      ...proj(p.pos[0], p.pos[2]),
    }));
    return { project: proj, poly: polyPts, platPts: pl };
  }, []);

  if (!mapOpen) return null;

  const t = Math.max(0, Math.min(1, hud.progress));
  // Robot position + heading from adjacent spline samples.
  const rp = getPointAt(t);
  const ra = getPointAt(Math.min(1, t + 0.01));
  const robot = project(rp.x, rp.z);
  const ahead = project(ra.x, ra.z);
  const headingDeg =
    (Math.atan2(ahead.y - robot.y, ahead.x - robot.x) * 180) / Math.PI +
    (-hud.pose.yaw * 180) / Math.PI;

  const toPath = (pts) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const travelled = poly.filter((p) => p.t <= t);
  const remaining = poly.filter((p) => p.t >= t);
  const near = nearestPlatform(t);

  return (
    <Root aria-label="Route map" onWheel={(e) => e.stopPropagation()}>
      <Title>{'// TACTICAL MAP'}</Title>
      <Readout>{`T ${(t * 100).toFixed(0)}% · Δ ${near.platform.label} ${(near.distance * 100).toFixed(0)}`}</Readout>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img">
        {/* route: travelled solid accent, remaining dashed subtle */}
        <path d={toPath([...travelled, robot])} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.8" />
        <path d={toPath([robot, ...remaining])} fill="none" stroke={theme.color.fgSubtle} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />

        {platPts.map((p) => {
          const active = hud.waypointId === p.id;
          const visited = mission.visited.includes(p.id);
          const coreCollected = mission.cores.includes(p.id);
          return (
            <Node
              key={p.id}
              role="button"
              tabIndex={0}
              aria-label={`Fly to ${p.label}`}
              onClick={() => goTo(p.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') goTo(p.id); }}
            >
              <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
              <circle className="hover-ring" cx={p.x} cy={p.y} r="9" fill="none" stroke={accent} strokeWidth="1" />
              {visited && (
                <circle cx={p.x} cy={p.y} r="6.5" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.6" />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={active ? 5 : 3.5}
                fill={active ? accent : theme.color.surface}
                stroke={accent}
                strokeWidth="1.2"
              />
              {/* core diamond */}
              <rect
                x={p.x - 3}
                y={p.y - 14.5}
                width="6"
                height="6"
                transform={`rotate(45 ${p.x} ${p.y - 11.5})`}
                fill={coreCollected ? accent : 'none'}
                stroke={accent}
                strokeWidth="1"
                opacity={coreCollected ? 1 : 0.55}
              />
              <NodeLabel x={p.x} y={p.y + 18} textAnchor="middle" $active={active}>
                {`${p.number} ${p.label}`}
              </NodeLabel>
            </Node>
          );
        })}

        {/* robot: heading triangle + pulse when moving */}
        {Math.abs(hud.vel.progress) > 0.005 && (
          <circle cx={robot.x} cy={robot.y} r="9" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
        )}
        <g transform={`translate(${robot.x} ${robot.y}) rotate(${headingDeg})`}>
          <polygon points="6,0 -4,4 -4,-4" fill={theme.color.fg} stroke={accent} strokeWidth="1" />
        </g>
      </svg>
      <Legend>◆ core · ○ visited · ▶ you · click a pad to fly</Legend>
    </Root>
  );
};

export default MiniMap;
