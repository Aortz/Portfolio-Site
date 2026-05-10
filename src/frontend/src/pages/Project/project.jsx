import React, { Suspense, lazy } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../editable-stuff/config.js';
import { ProjectContainer, ProjectGrid } from './ProjectCardElements';
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
      <Suspense fallback={null}>
        <ProjectsAccent />
      </Suspense>
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
    </ProjectContainer>
  );
};

export default Project;
