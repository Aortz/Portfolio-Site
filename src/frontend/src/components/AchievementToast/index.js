import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTeleop } from '../../teleop/TeleopProvider';
import { ACHIEVEMENTS } from '../../teleop/TeleopProvider';

const SHOW_MS = 3200;

const drop = keyframes`
  from { opacity: 0; transform: translate(-50%, -12px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const Toast = styled.div`
  position: fixed;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ theme }) => theme.color.fg};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 0 28px rgba(6, 182, 212, 0.3);
  animation: ${drop} ${({ theme }) => theme.motion.slow} ${({ theme }) => theme.motion.ease};
  pointer-events: none;
  white-space: nowrap;

  & .tag {
    font-size: 10px;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.color.accent};
  }
  & .title {
    font-size: ${({ theme }) => theme.size.sm};
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  & .desc {
    font-size: ${({ theme }) => theme.size.xs};
    color: ${({ theme }) => theme.color.fgMuted};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

/* Shows the head of the unlock queue for a few seconds, then pops it. */
const AchievementToast = () => {
  const { unlocks, popUnlock } = useTeleop();
  const id = unlocks[0];

  useEffect(() => {
    if (!id) return undefined;
    const t = setTimeout(popUnlock, SHOW_MS);
    return () => clearTimeout(t);
  }, [id, popUnlock]);

  if (!id) return null;
  const a = ACHIEVEMENTS[id];
  return (
    <Toast role="status" key={id}>
      <span className="tag">{'// UNLOCKED'}</span>
      <span className="title">{a.title}</span>
      <span className="desc">{a.desc}</span>
    </Toast>
  );
};

export default AchievementToast;
