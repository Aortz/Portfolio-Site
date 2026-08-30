import React from 'react';
import { useTeleop } from '../../teleop/TeleopProvider';
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

const formatYawDeg = (rad) => {
  // Wrap to [-180, 180] for readability.
  let deg = (rad * 180) / Math.PI;
  deg = ((deg + 180) % 360 + 360) % 360 - 180;
  return `${deg >= 0 ? '+' : ''}${deg.toFixed(0)}°`;
};

const TeleopRail = () => {
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
  } = useTeleop();
  const pressedSet = new Set(hud.pressed);

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
            <ActionButton type="button" $on={mapOpen} onClick={toggleMap} aria-pressed={mapOpen}>
              Map
            </ActionButton>
          </Actions>

          <Hint>
            W/S fly route · A/D yaw · Q/E strafe · Space jump · X halt · M map
          </Hint>
        </Panel>
      )}
    </RailRoot>
  );
};

export default TeleopRail;
