import React from 'react';
import styled from 'styled-components';
import { gallery } from '../../editable-stuff/config.js';
import SectionHeading from '../../components/SectionHeading';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';

const GallerySectionRoot = styled.section`
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.color.fg};
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
  border-left: 2px solid ${({ theme }) => theme.color.border};
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
    padding: ${({ theme }) => theme.space[4]};
    border-left: none;
  }
`;

const GalleryCopy = styled.p`
  color: ${({ theme }) => theme.color.fgMuted};
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.size.base};
  line-height: 1.6;
  margin: ${({ theme }) => `${theme.space[4]} 0 ${theme.space[6]}`};
  max-width: 60ch;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.space[6]};
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[4]};
  }
`;

const GalleryCard = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  transition:
    border-color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.color.accent};
  }

  & img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
`;

const PlaceholderCell = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.surfaceAlt};
  color: ${({ theme }) => theme.color.fgSubtle};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background-image: ${({ theme }) =>
    `repeating-linear-gradient(135deg, ${theme.color.surfaceAlt} 0 12px, ${theme.color.surface} 12px 24px)`};
`;

const CardTitle = styled.figcaption`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.color.fg};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]} 0`};
`;

const CardCaption = styled.p`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.size.xs};
  color: ${({ theme }) => theme.color.fgMuted};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]} ${theme.space[4]}`};
  margin: 0;
  line-height: 1.5;
`;

const Gallery = () => {
  const [ref, visible] = useFadeInOnScroll();

  return (
    <GallerySectionRoot
      id="gallery"
      ref={ref}
      className={visible ? 'visible' : ''}
    >
      <SectionHeading number="04">SKETCH GALLERY</SectionHeading>
      <GalleryCopy>
        Side notes from the 3D modelling rabbit hole — early sketches,
        topology studies, and the half-finished stuff that didn&apos;t make
        it into a project.
      </GalleryCopy>
      <GalleryGrid>
        {gallery.map((item) => (
          <GalleryCard key={item.title}>
            {item.src ? (
              <img src={item.src} alt={item.alt} loading="lazy" />
            ) : (
              <PlaceholderCell>Sketch coming soon</PlaceholderCell>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardCaption>{item.caption}</CardCaption>
          </GalleryCard>
        ))}
      </GalleryGrid>
    </GallerySectionRoot>
  );
};

export default Gallery;
