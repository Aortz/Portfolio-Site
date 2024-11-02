import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const PointCloud = ({ imageUrl }) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const pointsRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    const init = async () => {
      // Create scene
      sceneRef.current = new THREE.Scene();
      sceneRef.current.background = new THREE.Color(0x000000);

      // Create camera
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 50;

      // Create renderer
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(rendererRef.current.domElement);

      // Add controls
      controlsRef.current = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement
      );
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;

      // Load and process image
      const image = new Image();
      image.src = imageUrl;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Create points
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];
      const spacing = 4; // Adjust this value to change point density

      for (let y = 0; y < imageData.height; y += spacing) {
        for (let x = 0; x < imageData.width; x += spacing) {
          const i = (y * imageData.width + x) * 4;
          const r = imageData.data[i] / 255;
          const g = imageData.data[i + 1] / 255;
          const b = imageData.data[i + 2] / 255;
          const a = imageData.data[i + 3] / 255;

          if (a > 0.5) { // Only create points for non-transparent pixels
            positions.push(
              x - imageData.width / 2,
              -(y - imageData.height / 2),
              0
            );
            colors.push(r, g, b);
          }
        }
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
      });

      pointsRef.current = new THREE.Points(geometry, material);
      sceneRef.current.add(pointsRef.current);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        containerRef.current?.removeChild(rendererRef.current.domElement);
      };
    };

    init();
  }, [imageUrl]);

  return <CanvasContainer ref={containerRef} />;
};

export default PointCloud;