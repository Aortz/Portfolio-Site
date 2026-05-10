import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { projects } from '../../editable-stuff/config.js';
import {
  ContainerTitle,
  CarouselContainer,
  ProjectContainer,
  CarouselButton,
  CarouselWrapper,
  CarouselTrack,
  CarouselControls,
} from './ProjectCardElements';

const Project = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(t);
  }, []);

  const total = projects.length;
  const visibleSlots = Math.min(4, Math.max(total, 1));

  const nextSlide = () =>
    setCurrentIndex((i) => (i === visibleSlots - 1 ? 0 : i + 1));
  const prevSlide = () =>
    setCurrentIndex((i) => (i === 0 ? visibleSlots - 1 : i - 1));

  return (
    <ProjectContainer>
      <ContainerTitle $size="2.25rem" className={isVisible ? 'visible' : ''}>
        PROJECTS
      </ContainerTitle>
      <CarouselWrapper>
        <CarouselContainer>
          <CarouselTrack>
            {total > 0 ? (
              projects.slice(0, visibleSlots).map((project, index) => (
                <ProjectCard
                  key={project.title || `project-${index}`}
                  project={project}
                  isActive={index === currentIndex}
                />
              ))
            ) : (
              <p>No projects to show yet.</p>
            )}
          </CarouselTrack>
        </CarouselContainer>
        {total > 1 && (
          <CarouselControls>
            <CarouselButton onClick={prevSlide} aria-label="Previous project">
              <FaChevronLeft />
            </CarouselButton>
            <CarouselButton onClick={nextSlide} aria-label="Next project">
              <FaChevronRight />
            </CarouselButton>
          </CarouselControls>
        )}
      </CarouselWrapper>
    </ProjectContainer>
  );
};

export default Project;
