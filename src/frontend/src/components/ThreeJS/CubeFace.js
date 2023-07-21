import React from 'react';
import styled from 'styled-components';

const Card = styled(Card)`
  /* Styles for your card component */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
`;

const CubeFace = ({ position, color }) => {
  return (
    <mesh position={position}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xffffff} />

    </mesh>
  );
};

export default CubeFace;
