import React, { Suspense, lazy } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../editable-stuff/config.js';
import {
  ProjectContainer,
  ProjectContent,
  ProjectAccentSlot,
  ProjectGrid,
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
        {projects.length > 0 ? (
          <ProjectGrid>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title || `project-${index}`}
                project={project}
              />
            ))}
          </ProjectGrid>
        ) : (
          <p>No projects to show yet.</p>
        )}
      </ProjectContent>
      <ProjectAccentSlot>
        <Suspense fallback={null}>
          <ProjectsAccent />
        </Suspense>
      </ProjectAccentSlot>
    </ProjectContainer>
  );
};

export default Project;
