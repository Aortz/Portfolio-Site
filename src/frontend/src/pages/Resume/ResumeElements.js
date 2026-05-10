import styled from 'styled-components';

export const ResumeContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  text-align: left;
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.color.fg};
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.space[6]} ${theme.space[6]} ${theme.space[6]} 80px`};

  grid-row: 1;
  grid-column: 1;
  z-index: 2;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    padding: ${({ theme }) => theme.space[4]};
  }
`;
