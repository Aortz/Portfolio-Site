import React, { useEffect, useState } from 'react';
import { useTeleop, ACHIEVEMENTS } from '../../teleop/TeleopProvider';
import {
  RailRoot,
  CollapsedTab,
  Panel,
  PanelHeader,
  CollapseButton,
  Divider,
  StatusRow,
  Led,
  ReadoutBlock,
  Readout,
  ProgressTrack,
  KeyGrid,
  KeyCap,
  Actions,
  ActionButton,
  Hint,
  BadgeList,
  BadgeRow,
  BadgeToggle,
} from './TeleopElements';

/* Visual layout of the key cluster.
   QWE / ASD / Space-X mirrors the actual key bindings. The `code` field is
   what we match against `hud.pressed` (KeyboardEvent.code strings). */
const KEY_ROWS = [
  [
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
  ],
  [
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
  ],
  [
    { code: 'Space', label: 'JUMP', span: 'span 2' },
    { code: 'KeyX', label: 'X' },
  ],
];

const formatSigned = (n, digits = 2) =>
  `${n >= 0 ? '+' : ''}${n.toFixed(digits)}`;

const formatUptime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
};

const formatRun = (s) => `${s.toFixed(1)}s`;

const formatYawDeg = (rad) => {
  // Wrap to [-180, 180] for readability.
  let deg = (rad * 180) / Math.PI;
  deg = ((deg + 180) % 360 + 360) % 360 - 180;
  return `${deg >= 0 ? '+' : ''}${deg.toFixed(0)}°`;
};

// Rotating nudge toward whatever is still locked.
const TIPS_INTERVAL_MS = 8000;

const TeleopRail = () => {
  const [showBadges, setShowBadges] = useState(false);
  const [tipIdx, setTipIdx] = useState(0);
  const {
    expanded,
    armed,
    hud,
    toggleExpanded,
    toggleArmed,
    halt,
    pressKey,
    releaseKey,
    mapOpen,
    toggleMap,
    mission,
    run,
    startRun,
  } = useTeleop();
  const lastSplit = run.splits[run.splits.length - 1];
  let runLabel = '--';
  if (run.pending) runLabel = 'TO START';
  else if (run.active) runLabel = formatRun(run.elapsed);
  else if (mission.best != null) runLabel = `BEST ${formatRun(mission.best)}`;
  const pressedSet = new Set(hud.pressed);
  const lockedIds = Object.keys(ACHIEVEMENTS).filter((id) => !mission.achievements.includes(id));
  useEffect(() => {
    if (!lockedIds.length) return undefined;
    const id = setInterval(() => setTipIdx((i) => i + 1), TIPS_INTERVAL_MS);
    return () => clearInterval(id);
  }, [lockedIds.length]);
  const tip = lockedIds.length ? ACHIEVEMENTS[lockedIds[tipIdx % lockedIds.length]].hint : null;

  return (
    <RailRoot $expanded={expanded} aria-label="Teleop console">
      {!expanded && (
        <CollapsedTab
          type="button"
          onClick={toggleExpanded}
          aria-label="Expand teleop console"
        >
          <span className="tab-chevron" aria-hidden="true">◂</span>
          <span className="tab-label">TELEOP</span>
          <span className="tab-chevron" aria-hidden="true">◂</span>
        </CollapsedTab>
      )}

      {expanded && (
        <Panel>
          <PanelHeader>
            <span>{'// TELEOP CONSOLE'}</span>
            <CollapseButton
              type="button"
              onClick={toggleExpanded}
              aria-label="Collapse teleop console"
              title="Collapse"
            >
              ▸
            </CollapseButton>
          </PanelHeader>

          <Divider />

          <StatusRow $on={armed}>
            <Led $on={armed} aria-hidden="true" />
            {armed ? 'ARMED' : 'STANDBY'}
          </StatusRow>

          <ReadoutBlock>
            <Readout>
              <span className="label">SPEED</span>
              <span className="value">{(Math.abs(hud.vel.progress) * 100).toFixed(0)} %/s</span>
            </Readout>
            <Readout>
              <span className="label">ANG</span>
              <span className="value">{formatSigned(hud.vel.ang, 2)} r/s</span>
            </Readout>
            <Readout>
              <span className="label">BAT</span>
              <span className="value">{`${Math.round((hud.boost?.battery ?? 1) * 100)}%`}</span>
            </Readout>
            <ProgressTrack $value={hud.boost?.battery ?? 1} $low={(hud.boost?.battery ?? 1) < 0.25} aria-hidden="true" />
            <Readout>
              <span className="label">T+</span>
              <span className="value">{formatUptime(hud.uptime)}</span>
            </Readout>
          </ReadoutBlock>

          <Divider />

          <ReadoutBlock>
            <Readout>
              <span className="label">WPT</span>
              <span className="value">{hud.waypoint}</span>
            </Readout>
            <Readout>
              <span className="label">PROG</span>
              <span className="value">{Math.round(hud.progress * 100)}%</span>
            </Readout>
            <ProgressTrack $value={hud.progress} aria-hidden="true" />
            <Readout>
              <span className="label">YAW</span>
              <span className="value">{formatYawDeg(hud.pose.yaw)}</span>
            </Readout>
          </ReadoutBlock>

          <Divider />

          <ReadoutBlock>
            <Readout>
              <span className="label">CORES</span>
              <span className="value">{`${mission.cores.length}/5${mission.cores.length === 5 ? ' ✓' : ''}`}</span>
            </Readout>
            <Readout>
              <span className="label">SURVEY</span>
              <span className="value">{`${mission.visited.length}/5`}</span>
            </Readout>
            <Readout>
              <span className="label">RUN</span>
              <span className="value">{runLabel}</span>
            </Readout>
            {lastSplit && (
              <Readout>
                <span className="label">SPLIT</span>
                <span className="value">{`${lastSplit.id.toUpperCase()} ${formatRun(lastSplit.t)}`}</span>
              </Readout>
            )}
            <BadgeToggle
              type="button"
              onClick={() => setShowBadges((b) => !b)}
              aria-expanded={showBadges}
            >
              <span className="label">BADGES</span>
              <span className="value">{`${mission.achievements.length}/12 ${showBadges ? '▾' : '▸'}`}</span>
            </BadgeToggle>
            {showBadges && (
              <BadgeList>
                {Object.entries(ACHIEVEMENTS).map(([id, a]) => {
                  const got = mission.achievements.includes(id);
                  return (
                    <BadgeRow key={id} $got={got}>
                      <span className="name">{got ? a.title : '???'}</span>
                      <span className="detail">{got ? a.desc : a.hint}</span>
                    </BadgeRow>
                  );
                })}
              </BadgeList>
            )}
          </ReadoutBlock>

          <Divider />

          <KeyGrid>
            {KEY_ROWS.flatMap((row, ri) =>
              row.map(({ code, label, span }) => (
                <KeyCap
                  key={`${ri}-${code}`}
                  type="button"
                  tabIndex={-1}
                  aria-label={`Key ${label}`}
                  $on={pressedSet.has(code)}
                  $span={span}
                  onPointerDown={(e) => { e.preventDefault(); pressKey(code); }}
                  onPointerUp={() => releaseKey(code)}
                  onPointerLeave={() => releaseKey(code)}
                  onPointerCancel={() => releaseKey(code)}
                >
                  {label}
                </KeyCap>
              ))
            )}
          </KeyGrid>

          <Actions>
            <ActionButton
              type="button"
              $primary
              $on={armed}
              onClick={toggleArmed}
            >
              {armed ? 'Disarm' : 'Arm'}
            </ActionButton>
            <ActionButton type="button" onClick={halt}>
              Halt
            </ActionButton>
            <ActionButton type="button" $primary $on={mapOpen} onClick={toggleMap} aria-pressed={mapOpen}>
              Map
            </ActionButton>
            <ActionButton type="button" $primary $on={run.active || run.pending} onClick={startRun}>
              Run
            </ActionButton>
          </Actions>

          <Hint>
            W/S fly · Shift boost · A/D yaw · Q/E strafe · Space jump · F scan · H ping · X halt · M map · T trial
          </Hint>
          {tip && <Hint $accent>{`// LOCKED: ${tip}`}</Hint>}
        </Panel>
      )}
    </RailRoot>
  );
};

export default TeleopRail;
