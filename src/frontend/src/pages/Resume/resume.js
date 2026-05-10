import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import resumePDF from '../../assets/resume/Lee_Junwei_Resume.pdf';
import SectionHeading from '../../components/SectionHeading';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';
import AxisDivider from '../../components/AxisDivider';

const ResumeAccent = lazy(() => import('../../components/ResumeAccent'));

const ResumeSectionRoot = styled.section`
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.color.fg};
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
  border-left: 2px solid ${({ theme }) => theme.color.border};
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity ${({ theme }) => theme.motion.slow} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.slow} ${({ theme }) => theme.motion.ease};

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (max-width: 768px) {
    padding: ${({ theme }) => theme.space[4]};
    border-left: none;
  }
`;

const Copy = styled.p`
  color: ${({ theme }) => theme.color.fgMuted};
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.size.base};
  line-height: 1.6;
  margin: ${({ theme }) => `${theme.space[4]} 0`};
  max-width: 60ch;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[4]};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  background: ${({ theme }) => theme.color.accent};
  color: ${({ theme }) => theme.color.onAccent};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.sm};
  font-weight: 500;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.md};
  transition:
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    background: ${({ theme }) => theme.color.accentHover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: ${({ theme }) => theme.color.fg};
  border: 1px solid ${({ theme }) => theme.color.border};

  &:hover {
    background: ${({ theme }) => theme.color.surfaceAlt};
    color: ${({ theme }) => theme.color.accent};
    border-color: ${({ theme }) => theme.color.accent};
  }
`;

const ResumeSection = () => {
  const [ref, visible] = useFadeInOnScroll();

  return (
    <ResumeSectionRoot
      id="resume"
      ref={ref}
      className={visible ? 'visible' : ''}
    >
      <Suspense fallback={null}>
        <ResumeAccent />
      </Suspense>
      <SectionHeading number="04">RESUME</SectionHeading>
      <Copy>
        Grab a copy of my resume below — full work history, education, and the
        side projects I&apos;ve been shipping.
      </Copy>
      <AxisDivider />
      <ButtonRow>
        <PrimaryButton
          href={resumePDF}
          download="Lee_Junwei_Resume.pdf"
          aria-label="Download resume PDF"
        >
          <FiDownload size={16} aria-hidden="true" />
          Download PDF
        </PrimaryButton>
        <SecondaryButton
          href={resumePDF}
          target="_blank"
          rel="noreferrer"
          aria-label="Open resume in a new tab"
        >
          <FiExternalLink size={16} aria-hidden="true" />
          Open in new tab
        </SecondaryButton>
      </ButtonRow>
    </ResumeSectionRoot>
  );
};

export default ResumeSection;
