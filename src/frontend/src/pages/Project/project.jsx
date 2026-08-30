import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../editable-stuff/config.js';
import {
  ProjectContainer,
  ProjectContent,
  ProjectGrid,
  SectionCaption,
} from './ProjectCardElements';
import SectionHeading from '../../components/SectionHeading';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';
import { useLayout } from '../../layout/LayoutContext';

const Project = () => {
  const { docked } = useLayout();
  const [ref, visible] = useFadeInOnScroll({ disabled: docked });

  return (
    <ProjectContainer
      id="projects"
      ref={ref}
      $docked={docked}
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

    </ProjectContainer>
  );
};

export default Project;
