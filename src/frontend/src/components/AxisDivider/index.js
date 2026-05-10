import styled from 'styled-components';

const AxisDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.color.border};
  margin: ${({ theme }) => `${theme.space[6]} 0`};
  position: relative;
  width: 100%;
  max-width: 320px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 6px;
    top: -2.5px;
    background: ${({ theme }) => theme.color.fgSubtle};
  }

  &::before { left: 0; }
  &::after  { left: 48px; }
`;

export default AxisDivider;
