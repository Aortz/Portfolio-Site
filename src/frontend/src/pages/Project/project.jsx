import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../editable-stuff/config.js';
import {
  ProjectContainer,
  ProjectTopRow,
  ProjectContent,
  ProjectSidePanel,
  ProjectShowcase,
  ProjectGrid,
  SectionCaption,
  MetricsHeader,
  MetricsStatus,
  MetricsLed,
  MetricsDivider,
  MetricsRow,
  MetricsFooter,
  ShowcaseBadge,
} from './ProjectCardElements';
import SectionHeading from '../../components/SectionHeading';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';

const ProjectsAccent = lazy(() => import('../../components/ProjectsAccent'));

/* Derive aggregate stats from the projects[] config once per mount. */
const computeMetrics = (entries) => {
  const tagCounts = new Map();
  entries.forEach((p) => {
    (p.tags || []).forEach((t) => {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    });
  });
  const sorted = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);
  return {
    deployed: entries.length,
    languages: tagCounts.size,
    primary: sorted.length ? sorted[0][0] : '—',
  };
};

const formatUptime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
};

const Project = () => {
  const [ref, visible] = useFadeInOnScroll();

  const metrics = useMemo(() => computeMetrics(projects), []);

  // Small uptime ticker for the LAST BUILD readout — measured from mount.
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setUptime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ProjectContainer
      id="projects"
      ref={ref}
      className={visible ? 'visible' : ''}
    >
      <ProjectTopRow>
        <ProjectContent>
          <SectionHeading number="03">PROJECTS</SectionHeading>
          <SectionCaption>
            {`// DEPLOYED SYSTEMS — ${String(projects.length).padStart(2, '0')} ENTRIES`}
          </SectionCaption>
          {projects.length > 0 ? (
            <ProjectGrid>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title || `project-${index}`}
                  project={project}
                  index={index}
                />
              ))}
            </ProjectGrid>
          ) : (
            <p>No projects to show yet.</p>
          )}
        </ProjectContent>

        <ProjectSidePanel aria-label="System metrics">
          <MetricsHeader>
            <span>// SYSTEM METRICS</span>
            <span>v1.0</span>
          </MetricsHeader>
          <MetricsDivider />
          <MetricsStatus>
            <MetricsLed aria-hidden="true" />
            NOMINAL
          </MetricsStatus>
          <MetricsDivider />
          <MetricsRow>
            <span className="label">DEPLOYED</span>
            <span className="value">{String(metrics.deployed).padStart(2, '0')}</span>
          </MetricsRow>
          <MetricsRow>
            <span className="label">LANGUAGES</span>
            <span className="value">{String(metrics.languages).padStart(2, '0')}</span>
          </MetricsRow>
          <MetricsRow>
            <span className="label">PRIMARY</span>
            <span className="value">{metrics.primary.toUpperCase()}</span>
          </MetricsRow>
          <MetricsRow>
            <span className="label">UPTIME</span>
            <span className="value">T+ {formatUptime(uptime)}</span>
          </MetricsRow>
          <MetricsDivider />
          <MetricsFooter>// metrics computed at runtime</MetricsFooter>
        </ProjectSidePanel>
      </ProjectTopRow>

      <ProjectShowcase aria-label="Robots field unit showcase">
        <ShowcaseBadge>// FIELD UNIT — RECON-2</ShowcaseBadge>
        <Suspense fallback={null}>
          <ProjectsAccent />
        </Suspense>
      </ProjectShowcase>
    </ProjectContainer>
  );
};

export default Project;
