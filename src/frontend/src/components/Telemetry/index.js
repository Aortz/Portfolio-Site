import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
`;

const Box = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 999;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  color: ${({ theme }) => theme.color.fgSubtle};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
  gap: 2px;
  letter-spacing: 0.04em;
  pointer-events: none;
  opacity: 0.7;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color.accent};
  margin-right: 6px;
  vertical-align: middle;
  animation: ${blink} 2s ease-in-out infinite;
`;

const Telemetry = () => {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let rafId;
    let frames = 0;
    let last = performance.now();
    const tick = () => {
      frames += 1;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <Box aria-hidden="true">
      <span>
        <Dot />
        STATUS: idle
      </span>
      <span>FPS: {fps}</span>
    </Box>
  );
};

export default Telemetry;
