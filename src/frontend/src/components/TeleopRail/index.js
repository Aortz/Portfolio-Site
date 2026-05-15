import React, { useEffect, useState } from 'react';
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
    { code: 'Space', label: 'SPACE', span: 'span 2' },
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
  const { expanded, armed, hud, toggleExpanded, toggleArmed, halt } = useTeleop();
  const pressedSet = new Set(hud.pressed);

  // The rail only drives the hero drone, so it's only meaningful while the
  // Home section is on screen. Track that via IntersectionObserver and
  // unmount the rail otherwise.
  const [homeVisible, setHomeVisible] = useState(true);

  useEffect(() => {
    const el = document.getElementById('home');
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setHomeVisible(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset rail state when leaving Home so it returns clean on scroll-back.
  useEffect(() => {
    if (homeVisible) return;
    if (expanded) toggleExpanded();
    if (armed)    toggleArmed();
  }, [homeVisible, expanded, armed, toggleExpanded, toggleArmed]);

  if (!homeVisible) return null;

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
            <span>// TELEOP CONSOLE</span>
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
              <span className="label">LIN</span>
              <span className="value">{hud.vel.lin.toFixed(2)} m/s</span>
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
              <span className="label">X</span>
              <span className="value">{formatSigned(hud.pose.x)}</span>
            </Readout>
            <Readout>
              <span className="label">Y</span>
              <span className="value">{formatSigned(hud.pose.y)}</span>
            </Readout>
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
                  $on={pressedSet.has(code)}
                  $span={span}
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
          </Actions>

          <Hint>
            WASD / Arrows · QE strafe · Space arm · X halt
          </Hint>
        </Panel>
      )}
    </RailRoot>
  );
};

export default TeleopRail;
