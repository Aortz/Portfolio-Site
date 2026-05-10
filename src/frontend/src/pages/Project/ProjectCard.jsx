import React from 'react';
import styled from 'styled-components';
import { BsFolder } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import {
  StyledCard,
  CardBody,
  CardTitle,
  CardText,
  StyledDownloadIcon,
  StyledGithubIcon,
  CardBtn,
  ButtonContainer,
  StyledLink,
  LanguageContainer,
  LanguageIndv,
} from './ProjectCardElements';

const FolderGlyph = styled(BsFolder)`
  height: 28px;
  width: 28px;
  color: ${({ theme }) => theme.color.fgMuted};
`;

const Screenshot = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.color.border};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: ${({ theme }) => `${theme.space[3]} 0`};
`;

const TitleText = styled.span`
  flex: 1;
  text-align: left;
  margin-left: ${({ theme }) => theme.space[3]};
`;

const PrimaryLink = styled(StyledLink)`
  color: ${({ theme }) => theme.color.accent};
  &:hover {
    color: ${({ theme }) => theme.color.onAccent};
    background: ${({ theme }) => theme.color.accent};
  }
`;

const ProjectCard = ({ project }) => {
  const { title, description, liveUrl, githubUrl, tags = [], screenshot } = project || {};

  return (
    <StyledCard>
      <CardBody>
        <CardTitle className="visible">
          <FolderGlyph />
          <TitleText>{title}</TitleText>
          <CardBtn>
            {githubUrl && (
              <ButtonContainer>
                <StyledLink
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source on GitHub"
                  title="View source"
                >
                  <StyledGithubIcon />
                </StyledLink>
              </ButtonContainer>
            )}
            {liveUrl && (
              <ButtonContainer>
                <PrimaryLink
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit live site"
                  title="Visit live"
                >
                  <FiExternalLink size={18} />
                </PrimaryLink>
              </ButtonContainer>
            )}
          </CardBtn>
        </CardTitle>

        {screenshot && <Screenshot src={screenshot} alt={`${title} preview`} />}

        <CardText>{description}</CardText>

        {tags.length > 0 && (
          <>
            <Divider />
            <LanguageContainer>
              {tags.map((tag) => (
                <LanguageIndv as="span" key={tag}>
                  {tag}
                </LanguageIndv>
              ))}
            </LanguageContainer>
          </>
        )}
      </CardBody>
    </StyledCard>
  );
};

// Export a no-op wrapper for the historical StyledDownloadIcon import path so
// other files referencing it don't break. Currently unused on this card.
export { StyledDownloadIcon };

export default ProjectCard;
