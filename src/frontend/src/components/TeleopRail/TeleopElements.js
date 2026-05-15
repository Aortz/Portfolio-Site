import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(0.9); }
`;

/* Outer fixed dock — pinned to the left edge, vertically centered.
   Width animates between collapsed (36 px tab) and expanded (280 px panel). */
export const RailRoot = styled.aside`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 998;

  display: flex;
  flex-direction: column;
  width: ${({ $expanded }) => ($expanded ? '280px' : '36px')};
  max-height: 86vh;
  overflow: hidden;

  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-left: none;
  border-radius: 0
    ${({ theme }) => theme.radius.sm}
    ${({ theme }) => theme.radius.sm}
    0;

  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.color.fg};

  transition:
    width 280ms ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  /* Top-left + bottom-right brackets, mirroring the Phase 22 cards. */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: ${({ theme }) => theme.color.accent};
    opacity: 0.7;
    pointer-events: none;
  }
  &::before {
    top: 6px;
    right: 6px;
    border-top: 1.5px solid;
    border-right: 1.5px solid;
  }
  &::after {
    bottom: 6px;
    right: 6px;
    border-bottom: 1.5px solid;
    border-right: 1.5px solid;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

/* Collapsed-state vertical tab. Click anywhere on it expands the rail. */
export const CollapsedTab = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.color.fgMuted};
  cursor: pointer;
  width: 100%;
  height: 100%;
  min-height: 220px;
  padding: ${({ theme }) => `${theme.space[4]} 0`};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};

  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  letter-spacing: 0.18em;

  transition: color ${({ theme }) => theme.motion.base}
    ${({ theme }) => theme.motion.ease};

  & .tab-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-transform: uppercase;
  }

  & .tab-chevron {
    font-size: ${({ theme }) => theme.size.sm};
  }

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: -3px;
  }
`;

/* Expanded panel content wrapper. */
export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[3]};
  width: 280px;     /* fixed so it doesn't reflow during the width transition */
  flex-shrink: 0;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.size.xs};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.fgSubtle};
`;

export const CollapseButton = styled.button`
  appearance: none;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color.border};
  color: ${({ theme }) => theme.color.fgMuted};
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.color.accent};
    border-color: ${({ theme }) => theme.color.accent};
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: ${({ theme }) => `${theme.space[1]} 0`};
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.size.sm};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme, $on }) =>
    $on ? theme.color.accent : theme.color.fgMuted};
`;

export const Led = styled.span`
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ theme, $on }) =>
    $on ? theme.color.accent : 'transparent'};
  border: 1.5px solid
    ${({ theme, $on }) => ($on ? theme.color.accent : theme.color.fgMuted)};
  box-shadow: ${({ theme, $on }) =>
    $on ? `0 0 8px ${theme.color.accent}` : 'none'};

  ${({ $on }) =>
    $on &&
    css`
      animation: ${pulse} 1.4s ease-in-out infinite;
    `};
`;

export const ReadoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: ${({ theme }) => theme.size.xs};
  color: ${({ theme }) => theme.color.fgMuted};
`;

export const Readout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};

  & .label {
    color: ${({ theme }) => theme.color.fgSubtle};
    letter-spacing: 0.06em;
  }
  & .value {
    color: ${({ theme }) => theme.color.fg};
    font-variant-numeric: tabular-nums;
  }
`;

/* 3-column visual keyboard grid. */
export const KeyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[1]};
`;

export const KeyCap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border: 1px solid
    ${({ theme, $on }) => ($on ? theme.color.accent : theme.color.border)};
  background: ${({ theme, $on }) =>
    $on ? theme.color.accent : 'transparent'};
  color: ${({ theme, $on }) =>
    $on ? theme.color.onAccent : theme.color.fgMuted};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  font-weight: 600;
  letter-spacing: 0.06em;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: all 80ms linear;
  grid-column: ${({ $span }) => $span || 'auto'};

  /* Empty placeholder cells keep the QWE/ASD layout aligned. */
  ${({ $placeholder }) =>
    $placeholder &&
    css`
      border-color: transparent;
      background: transparent;
    `};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`;

export const ActionButton = styled.button`
  flex: 1;
  appearance: none;
  background: ${({ theme, $primary, $on }) =>
    $on && $primary ? theme.color.accent : 'transparent'};
  color: ${({ theme, $primary, $on }) => {
    if ($primary && $on) return theme.color.onAccent;
    if ($primary) return theme.color.accent;
    return theme.color.fgMuted;
  }};
  border: 1px solid
    ${({ theme, $primary }) =>
      $primary ? theme.color.accent : theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.fg};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.color.fgSubtle};
  line-height: 1.5;
`;
