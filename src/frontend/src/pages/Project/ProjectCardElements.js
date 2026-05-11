import { NavLink as Link } from 'react-router-dom';
import { FaGithub, FaDownload } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const slideRightAnimation = keyframes`
  from { transform: translateX(-24px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[12]};
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.color.fg};
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
  border-left: 2px solid ${({ theme }) => theme.color.border};
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity ${({ theme }) => theme.motion.slow} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.slow} ${({ theme }) => theme.motion.ease};

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.space[6]};
    padding: ${({ theme }) => theme.space[3]};
    border-left: none;
  }
`;

export const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
`;

export const ProjectAccentSlot = styled.div`
  flex: 0 0 480px;
  height: 480px;

  @media screen and (max-width: 1024px) {
    flex-basis: 320px;
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ContainerTitle = styled.div`
  text-align: left;
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.fg};
  font-size: ${(props) => props.$size || ((p) => p.theme.size['2xl'])};

  white-space: nowrap;
  opacity: 0;
  animation: ${slideRightAnimation} ${({ theme }) => theme.motion.slow}
    ${({ theme }) => theme.motion.ease} forwards;
  animation-delay: ${(props) => props.$animationDelay || '0s'};

  &.visible {
    opacity: 1;
  }

  &::after {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    margin-top: ${({ theme }) => theme.space[2]};
    background: ${({ theme }) => theme.color.accent};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  grid-row: 1;
  grid-column: 1;
  z-index: 3;
`;

export const CardContainer = styled(Col)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => theme.space[6]};
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.color.bg};
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { width: 0; display: none; }

  grid-row: 2;
  grid-column: 1;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.space[6]};
  width: 100%;
  margin-top: ${({ theme }) => theme.space[4]};

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[4]};
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
  height: 100%;
  min-height: 300px;
  margin: 0;
  position: relative;
  z-index: 1;
  display: flex;
  visibility: visible;

  transition:
    transform ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    box-shadow ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.color.accent};
    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.20);
  }
`;

export const CardBody = styled(Card.Body)`
  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  color: ${({ theme }) => theme.color.fg};
  padding: ${({ theme }) => theme.space[6]};

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    margin: ${({ theme }) => theme.space[3]} 0;
  }
`;

export const CardTitle = styled(Card.Title)`
  color: ${({ theme }) => theme.color.fg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  height: auto;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.lg};
  font-weight: 600;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
  background: transparent;

  visibility: hidden;
  &.visible {
    visibility: visible;
  }
`;

export const CardText = styled(Card.Text)`
  color: ${({ theme }) => theme.color.fgMuted};
  display: flex;
  background: transparent;
  text-align: left;
  align-items: center;
  margin-left: ${(props) => props.$marginLeft || '0'};
  margin-right: ${(props) => props.$marginRight || '0'};
  margin-bottom: ${(props) => props.$marginBottom || '0'};
  font-family: ${({ theme }) => theme.font.sans};
  justify-content: ${(props) => props.$justifyContent || 'flex-start'};
  padding: ${(props) => props.$padding || '0'};
  font-size: ${(props) => props.$fontSize || ((p) => p.theme.size.sm)};
  font-weight: 400;
  line-height: 1.55;
`;

export const CardLink = styled(Link)`
  color: ${({ theme }) => theme.color.fg};
  text-align: right;
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.lg};
  font-weight: 500;
  cursor: pointer;
  transition: color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &.active {
    color: ${({ theme }) => theme.color.accent};
  }

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const CardMenu = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.surface};
  z-index: 9;
  font-size: ${({ theme }) => theme.size.lg};
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const iconHover = `
  height: auto;
  width: 18px;
  transition: transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), color 250ms cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const StyledGithubIcon = styled(FaGithub)`
  ${iconHover}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.fg};
    transform: translateY(-2px);
  }
`;

export const StyledDownloadIcon = styled(FaDownload)`
  ${iconHover}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.fg};
    transform: translateY(-2px);
  }
`;

export const CardBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const ButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.color.fgMuted};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  transition:
    color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => `${theme.space[6]} ${theme.space[8]}`};
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: ${({ theme }) => theme.space[3]};
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
  background: transparent;
  position: relative;

  @media screen and (max-width: 768px) {
    min-height: 350px;
  }
`;

export const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[6]};
  width: 100%;
`;

export const CarouselButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.color.fgMuted};
  font-size: 1.25rem;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.fg};
    border-color: ${({ theme }) => theme.color.accent};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => `${theme.space[6]} ${theme.space[8]}`};
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: ${({ theme }) => theme.space[3]};
    gap: 0;

    & > * { display: none; width: 100%; }
    & > *[data-active="true"] { display: flex; }
  }
`;

export const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: ${(props) => props.$flexWrap || 'wrap'};
  margin-left: ${(props) => props.$marginLeft || '0'};
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
`;

export const LanguageTitle = styled.h1`
  align-self: center;
  text-align: left;
  margin: 0;
  margin-left: ${(props) => props.$marginLeft || '0'};
  font-size: ${({ theme }) => theme.size.sm};
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 500;
  color: ${({ theme }) => theme.color.fgMuted};
  margin-right: ${({ theme }) => theme.space[2]};
`;

export const LanguageIndv = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  margin: 2px;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  color: ${({ theme }) => theme.color.fgMuted};
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  background: transparent;
  transition:
    color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.fg};
    border-color: ${({ theme }) => theme.color.accent};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }
`;

export const LanguagePercentage = styled.div`
  color: ${({ theme }) => theme.color.fgSubtle};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  margin-left: ${({ theme }) => theme.space[1]};
`;
