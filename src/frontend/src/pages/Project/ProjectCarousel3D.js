import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const ProjectCarousel3D = ({ projects, currentIndex }) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const cssRendererRef = useRef();
  const cardsRef = useRef([]);
  const controlsRef = useRef();

  useEffect(() => {
    const init = () => {
      // Scene setup
      sceneRef.current = new THREE.Scene();
      
      // Camera setup
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 1000;

      // CSS3D Renderer setup
      cssRendererRef.current = new CSS3DRenderer();
      cssRendererRef.current.setSize(window.innerWidth, window.innerHeight);
      cssRendererRef.current.domElement.style.position = 'absolute';
      cssRendererRef.current.domElement.style.top = '0';
      containerRef.current.appendChild(cssRendererRef.current.domElement);

      // Controls setup
      controlsRef.current = new OrbitControls(cameraRef.current, cssRendererRef.current.domElement);
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;
      controlsRef.current.rotateSpeed = 0.5;

      // Create cards
      const radius = 800;
      const totalCards = projects.length;

      projects.forEach((project, index) => {
        // Create DOM element for card
        const cardElement = createProjectCard(project);
        
        // Create CSS3D Object
        const object = new CSS3DObject(cardElement);
        
        // Position in circle
        const theta = (index / totalCards) * 2 * Math.PI;
        object.position.x = radius * Math.sin(theta);
        object.position.z = radius * Math.cos(theta);
        object.rotation.y = -theta;

        sceneRef.current.add(object);
        cardsRef.current.push(object);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update();
        cssRendererRef.current.render(sceneRef.current, cameraRef.current);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        cssRendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        containerRef.current?.removeChild(cssRendererRef.current.domElement);
      };
    };

    init();
  }, [projects]);

  // Rotate to current card
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      const targetRotation = -(currentIndex / projects.length) * 2 * Math.PI;
      const duration = 1000; // ms
      const startRotation = controlsRef.current.getAzimuthalAngle();
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const currentRotation = startRotation + (targetRotation - startRotation) * eased;
        // controlsRef.current.setAzimuthalAngle(currentRotation);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [currentIndex, projects.length]);

  return <CarouselContainer ref={containerRef} />;
};

// Helper function to create DOM element for project card
const createProjectCard = (project) => {
  const element = document.createElement('div');
  element.style.width = '400px';
  element.style.height = '600px';
  element.style.background = '#000';
  element.style.border = '1px solid #fff';
  element.style.borderRadius = '20px';
  element.style.padding = '20px';
  element.style.color = '#fff';
  
  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.trunc(diff / 1000 / 60 / 60);

    if (hours < 24) {
      if (hours < 1) return "just now";
      let measurement = hours === 1 ? "hour" : "hours";
      return `${hours.toString()} ${measurement} ago`;
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return `on ${new Intl.DateTimeFormat("en-US", options).format(date)}`;
    }
  };

  // Add your existing card content with proper styling
  element.innerHTML = `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <!-- Header with folder icon and buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <svg style="width: 40px; height: 40px; color: #FBEAEB;" viewBox="0 0 16 16">
          <path fill="currentColor" d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 7.5v-3A1.5 1.5 0 0 1 1.5 3h2.764c.958 0 1.76.56 2.311 1.184C7.985 4.648 8.48 5 9 5h4.5A1.5 1.5 0 0 1 15 6.5v1z"/>
        </svg>
        <div style="display: flex; gap: 10px;">
          ${project.svn_url ? `
            <a href="${project.svn_url}" target="_blank" rel="noopener noreferrer" style="color: #fff;">
              <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="${project.svn_url}/archive/master.zip" target="_blank" rel="noopener noreferrer" style="color: #fff;">
              <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </a>
          ` : ''}
        </div>
      </div>

      <!-- Project Name -->
      <h2 style="font-size: 30px; text-align: center; margin: 20px 0;">
        ${project.name || 'Loading...'}
      </h2>

      <!-- Description -->
      <p style="font-size: 16px; margin: 20px 0; flex-grow: 1;">
        ${project.description || ''}
      </p>

      <hr style="border: 0.5px solid #333; margin: 10px 0;" />

      <!-- Languages -->
      ${project.languages_url ? `
        <div id="languages-${project.id}" style="margin: 10px 0;">
          <h3 style="color: #B8A7E9; font-size: 20px; margin-bottom: 10px;">Languages</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 5px;">
            <!-- Languages will be populated via JavaScript -->
          </div>
        </div>
      ` : ''}

      <hr style="border: 0.5px solid #333; margin: 10px 0;" />

      <!-- Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
        <a href="${project.svn_url}/stargazers" target="_blank" rel="noopener noreferrer" 
           style="color: #fff; text-decoration: none; border: 1px solid #fff; padding: 3px 10px; border-radius: 4px;">
          Stars <span style="background: #333; padding: 2px 6px; border-radius: 10px; margin-left: 5px;">
            ${project.stargazers_count || 0}
          </span>
        </a>
        <small style="color: #666;">
          Updated ${formatDate(project.pushed_at)}
        </small>
      </div>
    </div>
  `;

  // Fetch and add languages if URL exists
  if (project.languages_url) {
    fetch(project.languages_url)
      .then(response => response.json())
      .then(languages => {
        const languagesContainer = element.querySelector(`#languages-${project.id} div`);
        if (languagesContainer) {
          const total = Object.values(languages).reduce((a, b) => a + b, 0);
          Object.entries(languages).forEach(([lang, bytes]) => {
            const percentage = ((bytes / total) * 100).toFixed(1);
            const langElement = document.createElement('a');
            langElement.style.cssText = `
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #000;
              border-radius: 15px;
              margin: 4px;
              padding: 6px 12px;
              color: #B8A7E9;
              text-decoration: none;
              font-size: 14px;
              background: rgba(184, 167, 233, 0.1);
              min-width: 80px;
              transition: all 0.3s ease;
            `;
            langElement.innerHTML = `
              ${lang} <span style="margin-left: 6px; font-weight: bold;">${percentage}%</span>
            `;
            languagesContainer.appendChild(langElement);
          });
        }
      })
      .catch(console.error);
  }

  return element;
};

export default ProjectCarousel3D;