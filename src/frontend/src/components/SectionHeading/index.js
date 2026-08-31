import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size['2xl']};
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.color.fg};
  margin: 0 0 ${({ theme }) => theme.space[6]};
  position: relative;
  display: inline-block;
  line-height: 1.2;

  &::after {
    content: '';
    display: block;
    width: 48px;
    height: 2px;
    margin-top: ${({ theme }) => theme.space[2]};
    background: ${({ theme }) => theme.color.accent};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  @media screen and (max-width: 768px) {
    font-size: ${({ theme }) => theme.size.xl};
  }
`;

const Numeral = styled.span`
  color: ${({ theme }) => theme.color.accent};
  margin-right: 0.5em;
  font-weight: 500;
`;

const SectionHeading = ({ number, children, className }) => (
  <Heading className={className}>
    {number ? <Numeral>{number}.</Numeral> : null}
    {children}
  </Heading>
);

export default SectionHeading;
