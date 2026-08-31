import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTeleop } from '../../teleop/TeleopProvider';
import { useThemeMode } from '../../theme/ThemeProvider';
import { LayoutContext } from '../../layout/LayoutContext';
import Hero from '../../pages/Home/Hero';
import About from '../../pages/About/about';
import Project from '../../pages/Project/project';
import Gallery from '../../pages/Gallery';
import ResumeSection from '../../pages/Resume/resume';

const SECTION_COMPONENTS = {
  home: Hero,
  about: About,
  projects: Project,
  gallery: Gallery,
  resume: ResumeSection,
};

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

/* Glass panel on the right. The world's robot sits centre-left, so the panel
   never covers it. It is the only scrollable surface in world mode. */
const Panel = styled.section`
  position: fixed;
  top: 101px;
  /* Sit left of the teleop console: 280px panel or 36px collapsed tab. */
  right: ${({ $railOpen }) => ($railOpen ? '304px' : '60px')};
  max-height: min(62vh, 640px);
  width: min(440px, 34vw);
  z-index: 10;
  overflow-y: auto;
  overscroll-behavior: contain;
  pointer-events: auto;

  background: ${({ theme }) => `rgba(${hexToRgb(theme.color.bg)}, 0.55)`};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid ${({ theme }) => theme.color.border};
  border-left: 2px solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.radius.lg};

  opacity: 0;
  transform: translateX(24px);
  transition:
    right ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    opacity ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  ${({ $shown }) =>
    $shown &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}

  @media screen and (max-width: 1024px) {
    width: min(400px, 44vw);
  }
`;

const SectionDock = () => {
  const { hud, expanded } = useTeleop();
  const { reducedMotion } = useThemeMode();
  const targetId = hud.waypointId;

  // Keep the last section mounted while it fades out, then swap.
  const [mounted, setMounted] = useState(targetId);
  const [shown, setShown] = useState(!!targetId);
  const timer = useRef(0);

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (targetId === mounted) {
      setShown(!!targetId);
      return undefined;
    }
    if (reducedMotion || !mounted) {
      setMounted(targetId);
      setShown(!!targetId);
      return undefined;
    }
    setShown(false);
    timer.current = window.setTimeout(() => {
      setMounted(targetId);
      setShown(!!targetId);
    }, 250);
    return () => window.clearTimeout(timer.current);
  }, [targetId, mounted, reducedMotion]);

  // Scroll to top when the section changes.
  const panelRef = useRef(null);
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [mounted]);

  if (!mounted) return null;
  const Section = SECTION_COMPONENTS[mounted];

  return (
    <LayoutContext.Provider value={{ docked: true }}>
      <Panel
        ref={panelRef}
        $shown={shown}
        $railOpen={expanded}
        aria-live="polite"
        onWheel={(e) => e.stopPropagation()}
      >
        <Section key={mounted} />
      </Panel>
    </LayoutContext.Provider>
  );
};

export default SectionDock;
