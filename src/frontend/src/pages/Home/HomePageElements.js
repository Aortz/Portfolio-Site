import styled, { keyframes } from 'styled-components';

function typingAnimationWithSteps(text) {
  const textLength = text ? text.toString().length : 0;
  return keyframes`
    from { width: 0; }
    to   { width: ${textLength + 1}ch; }
  `;
}

const cursorBlinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
`;

const slideUpAnimation = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const slideRightAnimationTitle = keyframes`
  from { transform: translateX(-24px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
`;

const slideLeftAnimation = keyframes`
  from { transform: translateX(40px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 0.08; }
`;

export const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.color.bg};
`;

export const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  background: transparent;
  overflow-x: hidden;
`;

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.color.fg};
  min-height: 90vh;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => `${theme.space[6]} ${theme.space[6]} ${theme.space[6]} 136px`};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-left: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => `${theme.radius.xl} 0 0 0`};
  position: relative;
  z-index: 2;
  overflow-x: hidden;

  @media screen and (max-width: 768px) {
    padding: ${({ theme }) => theme.space[4]};
    border-top: none;
    border-left: none;
    border-radius: 0;
  }
`;

export const HomeBgImg = styled.img`
  position: absolute;
  top: 15%;
  right: 5%;
  transform: translateY(-50%) translateX(100%);
  height: 50vh;
  width: auto;
  z-index: 1;
  object-fit: cover;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  filter: ${({ theme }) => (theme.mode === 'light' ? 'invert(1) blur(0.5px)' : 'blur(0.5px)')};

  &.visible {
    visibility: visible;
    opacity: 0.08;
    animation: ${slideLeftAnimation} 1s ease-in-out forwards;
  }

  @media screen and (max-width: 768px) {
    top: 13%;
    right: 7%;
    height: 25vh;
    width: 100%;
    object-fit: cover;
    opacity: 0.05;
  }
`;

/* "Hi, my name is" — the one Kolker Brush moment, intentional warm greeting. */
export const HomeContainerTitle = styled.div`
  color: ${({ theme }) => theme.color.accent};
  font-family: ${({ theme }) => theme.font.accent};
  padding: ${({ theme }) => theme.space[2]} 0;
  font-size: ${({ theme }) => theme.size['2xl']};
  font-weight: 400;
  line-height: 1;

  opacity: 0;
  animation: ${slideRightAnimationTitle} ${({ theme }) => theme.motion.slow}
    ${({ theme }) => theme.motion.ease} forwards;
  animation-delay: ${(props) => props.$animationDelay || '0s'};
  animation-fill-mode: forwards;
  /* Final state */
  &[style], &.visible { opacity: 1; }

  @media screen and (max-width: 472px) {
    font-size: ${({ theme }) => theme.size.xl};
  }
`;

export const HomeContainerText = styled.div`
  color: ${(props) => props.$inputColor || ((p) => p.theme.color.fg)};
  font-family: ${({ theme }) => theme.font.mono};
  padding-left: 0;
  font-size: ${(props) => props.$size || '2.25rem'};
  font-weight: 600;
  letter-spacing: -0.02em;
  overflow: hidden;
  white-space: nowrap;
  animation: ${(props) => typingAnimationWithSteps(props.children)} 1.8s
    ${({ theme }) => theme.motion.ease} forwards;
  animation-delay: ${(props) => props.$animationDelay || '0s'};
  visibility: hidden;

  &.visible {
    visibility: visible;
  }

  &.name {
    color: ${({ theme }) => theme.color.fg};
    font-size: ${({ theme }) => theme.size['4xl']};
    font-weight: 700;
    width: auto;
  }

  &.role {
    color: ${({ theme }) => theme.color.fgMuted};
    font-size: ${({ theme }) => theme.size.xl};
    font-weight: 400;
    margin-top: ${({ theme }) => theme.space[2]};
  }

  @media screen and (max-width: 768px) {
    &.name {
      font-size: ${({ theme }) => theme.size['3xl']};
    }
    &.role {
      font-size: ${({ theme }) => theme.size.lg};
    }
  }

  @media screen and (max-width: 472px) {
    &.name {
      font-size: ${({ theme }) => theme.size['2xl']};
    }
    &.role {
      font-size: ${({ theme }) => theme.size.base};
    }
  }
`;

export const Cursor = styled.span`
  border-right: 2px solid ${({ theme }) => theme.color.accent};
  margin-left: 2px;
  animation: ${cursorBlinkAnimation} 1s infinite steps(2, start);
`;

export const HomeContainerDescription = styled.div`
  color: ${({ theme }) => theme.color.fgMuted};
  font-family: ${({ theme }) => theme.font.sans};
  padding: 0;
  margin-top: ${({ theme }) => theme.space[8]};
  font-size: ${({ theme }) => theme.size.base};
  font-weight: 400;
  line-height: 1.65;
  max-width: 60ch;

  transform: translateY(20px);
  opacity: 0;
  animation: ${slideUpAnimation} ${({ theme }) => theme.motion.slow}
    ${({ theme }) => theme.motion.ease} forwards;
  animation-delay: 1.5s;

  p + p {
    margin-top: ${({ theme }) => theme.space[3]};
  }

  @media screen and (max-width: 768px) {
    margin-top: ${({ theme }) => theme.space[6]};
    font-size: ${({ theme }) => theme.size.sm};
  }
`;

export const MobileHomeImg = styled.img`
  display: none;

  @media screen and (max-width: 768px) {
    display: inline;
    margin-top: ${({ theme }) => theme.space[6]};
    height: auto;
    width: 200px;
    align-self: center;
    transform: translateY(20px);
    opacity: 0;
    animation: ${slideUpAnimation} 1.2s ease-in-out forwards;
  }
`;
