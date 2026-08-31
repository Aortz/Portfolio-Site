import React, { useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useThemeMode } from '../../theme/ThemeProvider';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 300px; /* left of the tactical map */
  z-index: 999;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: ${({ theme }) => theme.space[2]};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
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
  cursor: pointer;
  opacity: 0.7;
  text-align: left;
  transition:
    opacity ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    opacity: 1;
    border-color: ${({ theme }) => theme.color.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
    opacity: 1;
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

const DebugPanel = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  color: ${({ theme }) => theme.color.fgMuted};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.surface};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  letter-spacing: 0.04em;
  min-width: 220px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};

  & > span:first-child {
    color: ${({ theme }) => theme.color.fgSubtle};
  }
  & > span:last-child {
    color: ${({ theme }) => theme.color.fg};
  }
`;

const Telemetry = () => {
  const [fps, setFps] = useState(60);
  const [expanded, setExpanded] = useState(false);
  const [viewport, setViewport] = useState({
    w: typeof window === 'undefined' ? 0 : window.innerWidth,
    h: typeof window === 'undefined' ? 0 : window.innerHeight,
  });
  const [scrollY, setScrollY] = useState(0);
  const { mode } = useThemeMode();

  // FPS via requestAnimationFrame
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

  // Viewport + scroll listeners only attach when expanded
  useEffect(() => {
    if (!expanded) return undefined;

    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    const onScroll = () => setScrollY(Math.round(window.scrollY));

    onScroll();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [expanded]);

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  return (
    <Wrapper>
      <Button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        aria-label={expanded ? 'Hide debug panel' : 'Show debug panel'}
      >
        <span>
          <Dot />
          STATUS: idle
        </span>
        <span>FPS: {fps}</span>
      </Button>
      {expanded && (
        <DebugPanel role="region" aria-label="Debug panel">
          <Row>
            <span>theme</span>
            <span>{mode}</span>
          </Row>
          <Row>
            <span>viewport</span>
            <span>
              {viewport.w} × {viewport.h}
            </span>
          </Row>
          <Row>
            <span>scrollY</span>
            <span>{scrollY}px</span>
          </Row>
          <Row>
            <span>fps</span>
            <span>{fps}</span>
          </Row>
          <Row>
            <span>platform</span>
            <span>
              {typeof navigator !== 'undefined' ? navigator.platform : 'n/a'}
            </span>
          </Row>
        </DebugPanel>
      )}
    </Wrapper>
  );
};

export default Telemetry;
