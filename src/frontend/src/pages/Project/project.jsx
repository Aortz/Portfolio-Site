import React, { useState, useEffect, useCallback, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { 
  ContainerTitle,
  CarouselContainer,
  ProjectContainer,
  CarouselButton,
  CarouselWrapper,
  CarouselTrack,
  CarouselControls,
} from './ProjectCardElements'


const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: null,
  pushed_at: null,
};
const API = "https://api.github.com";

const Project = ({ heading, username, length, specfic }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;
  const dummyProjectsArr = new Array(length + specfic.length).fill(
    dummyProject
  );
  // Move headers into useMemo
  const headers = useMemo(() => ({
    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  }), []); // Empty dependency array since env variable shouldn't change

  const [projectsArray, setProjectsArray] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // For Component1, set the text to be visible after the animation-delay
    const timer1 = setTimeout(() => {
      setIsVisible(true);
    }, 0); // Set the delay time in milliseconds (e.g., 1s for Component1)

    // Clear the timeouts when the component unmounts or when the animations are complete
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const fetchRepos = useCallback(async () => {
    let repoList = [];
    try {
      // getting all repos with headers
      const response = await axios.get(allReposAPI, { headers });
      // slicing to the length
      repoList = [...response.data.slice(0, length)];
      // adding specified repos
      try {
        for (let repoName of specfic) {
          const response = await axios.get(`${specficReposAPI}/${repoName}`);
          repoList.push(response.data);
        }
      } catch (error) {
        // console.error(error.message);
      }
      // setting projectArray
      // TODO: remove the duplication.
      setProjectsArray(repoList);
    } catch (error) {
      console.error(error.message);
      setProjectsArray([dummyProject]); // Use dummyProject on error
    }
  }, [allReposAPI, length, specfic, specficReposAPI, headers]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Math.min(3, projectsArray.length - 1) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.min(3, projectsArray.length - 1) : prevIndex - 1
    );
  };


  return (
    <ProjectContainer>
      <ContainerTitle $size="50px" $animationDelay="0s" className={isVisible ? 'visible' : ''}>
        {"PROJECTS"}
      </ContainerTitle>
      <CarouselWrapper>
        <CarouselContainer>
          <CarouselTrack>
            {projectsArray && projectsArray.length > 0 ? (
              projectsArray.slice(0, 4).map((project, index) => (
                <ProjectCard
                  key={`project-card-${index}`}
                  index={index}
                  value={project}
                  isActive={index === currentIndex}
                />
              ))
            ) : (
              <ProjectCard
                key="dummy-0"
                index={0}
                value={dummyProject}
                isActive={true}
              />
            )}
          </CarouselTrack>
        </CarouselContainer>
        <CarouselControls>
          <CarouselButton onClick={prevSlide}>
            <FaChevronLeft />
          </CarouselButton>
          <CarouselButton onClick={nextSlide}>
            <FaChevronRight />
          </CarouselButton>
        </CarouselControls>
      </CarouselWrapper>
    </ProjectContainer>
  );
};

export default Project;