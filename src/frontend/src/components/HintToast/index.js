import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTeleop } from '../../teleop/TeleopProvider';

const AUTO_DISMISS_MS = 6000;

const rise = keyframes`
  from { opacity: 0; transform: translate(-50%, 12px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const Toast = styled.div`
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  z-index: 20;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.color.fg};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: 0 0 24px rgba(6, 182, 212, 0.25);
  animation: ${rise} ${({ theme }) => theme.motion.slow} ${({ theme }) => theme.motion.ease};
  pointer-events: none;
  white-space: nowrap;

  & kbd {
    font-family: inherit;
    color: ${({ theme }) => theme.color.accent};
    font-weight: 700;
  }
`;

const HintToast = () => {
  const { hint, dismissHint } = useTeleop();

  useEffect(() => {
    if (!hint) return undefined;
    const id = setTimeout(dismissHint, AUTO_DISMISS_MS);
    return () => clearTimeout(id);
  }, [hint, dismissHint]);

  if (!hint) return null;
  return (
    <Toast role="status">
      <kbd>W</kbd>/<kbd>S</kbd> FLY · <kbd>SPACE</kbd> JUMP · <kbd>M</kbd> MAP · SCROLL TO EXPLORE
    </Toast>
  );
};

export default HintToast;
