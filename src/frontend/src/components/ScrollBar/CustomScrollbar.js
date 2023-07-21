import React from 'react';
import styled from 'styled-components';

const ScrollbarContainer = styled.div`
  /* Container styles */
  /* Add any additional styles for the container that wraps the content */
`;

const ScrollbarTrack = styled.div`
  /* Track styles */
  /* Use your custom image for the track background */
  background-image: url('../../assets/scrollbar/vine-track.png');
  /* Adjust track width and height as needed */
  width: 10px;
  height: 100%;
`;

const ScrollbarThumb = styled.div`
  /* Thumb styles */
  /* Use your custom image for the thumb background */
  background-image: url('../../assets/scrollbar/mario-climbing-thumb.png');
  /* Adjust thumb width and height as needed */
  width: 10px;
  height: 50px;
`;

const CustomScrollbar = ({ children }) => {
  return (
    <ScrollbarContainer>
      <ScrollbarTrack>
        <ScrollbarThumb />
      </ScrollbarTrack>
      {children}
    </ScrollbarContainer>
  );
};

export default CustomScrollbar;
