import React, { Suspense, lazy } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../editable-stuff/config.js';
import {
  ProjectContainer,
  ProjectContent,
  ProjectShowcase,
  ProjectGrid,
  SectionCaption,
  ShowcaseBadge,
} from './ProjectCardElements';
import SectionHeading from '../../components/SectionHeading';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';

const ProjectsAccent = lazy(() => import('../../components/ProjectsAccent'));

const Project = () => {
  const [ref, visible] = useFadeInOnScroll();

  return (
    <ProjectContainer
      id="projects"
      ref={ref}
      className={visible ? 'visible' : ''}
    >
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
