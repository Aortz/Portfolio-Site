import React, { useState, useEffect, useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import styled from "styled-components";
import { 
  StyledCard,
  CardBody,
  CardTitle,
  CardText,
  CardBtn,
  CardButtonLink
} from './ProjectCardElements';
import { BsFolder } from "react-icons/bs";

const ProjectCard = ({ index, value }) => {
  
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    languages_url,
    pushed_at,
  } = value;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // For Component1, set the text to be visible after the animation-delay
    const timer1 = setTimeout(() => {
      setIsVisible(true);
    }, 0); // Set the delay time in milliseconds (e.g., 1s for Component1)

    // Clear the timeouts when the component unmounts or when the animations are complete
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
      <StyledCard $zIndex={index}>
        <CardBody>
          <CardTitle $animationDelay="0s" className={isVisible ? 'visible' : ''}>
            <BsFolder style={{height: 20, width: 30}}/> 
            Project: {  name || <Skeleton />} 
            {/* <Cursor/> */}
          </CardTitle>
          <CardText>
            {(!description) ? "" : description || <Skeleton count={3} />} 
          </CardText>
          {/* <hr /> */}
          <CardText $justifyContent="center" >
            {svn_url ? <CardButtons svn_url={svn_url} /> : <Skeleton count={2} />}
          </CardText>
          <hr />
          <CardText $bgColor="#000">
            {languages_url ? (
              <StyledLanguage languages_url={languages_url} repo_url={svn_url} />
              ) : (
                <Skeleton count={3} />
              )}
          </CardText>
          <hr />
          <>
            {value ? (
                <CardFooter star_count={stargazers_count} repo_url={svn_url} pushed_at={pushed_at} />
              ) : (
                <Skeleton />
            )}
          </>
        </CardBody>
      </StyledCard>
  );
};

const CardButtons = ({ svn_url }) => {
  return (
    <>
      <CardBtn> 
        <CardButtonLink
          href={`${svn_url}/archive/master.zip`}
        >
          <FaGithub/> Clone Project
        </CardButtonLink>
      </CardBtn>
      <CardBtn>
        <CardButtonLink 
          href={svn_url} target=" _blank" 
        >
          <FaGithub/> Repo
        </CardButtonLink>
      </CardBtn>
    </>
  );
};

const Language = ({ languages_url, repo_url }) => {
  const [data, setData] = useState([]);

  const handleRequest = useCallback(async () => {
    try {
      const response = await axios.get(languages_url);
      return setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, [languages_url]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const array = [];
  let total_count = 0;
  for (let index in data) {
    array.push(index);
    total_count += data[index];
  }

  return (
    <LanguageContainer $flexWrap="none">
      <LanguageTitle $marginLeft="10px">
        Languages:{" "}
      </LanguageTitle>
      <LanguageContainer $marginLeft="10px">
        {array.length
          ? array.map((language) => (
            <LanguageIndv
              key={language}
              $border="1px solid #fff"
              className="card-link"
              href={repo_url + `/search?l=${language}`}
              target=" _blank"
              rel="noopener noreferrer"
            >
              <LanguagePercentage className="languge-percentage" >
                {language}:{" "}
                {Math.trunc((data[language] / total_count) * 1000) / 10} %
              </LanguagePercentage>
            </LanguageIndv>

          ))
          : "code yet to be deployed."}
        </LanguageContainer>
    </LanguageContainer>
  );
};

const StyledLanguage = styled(Language)`
  font-family: 'VT323', monospace;
  display: flex;
  flex-wrap: wrap;
  
`
const LanguageContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.$flexDirection || "row"};
  justify-content: start;
  border: 0px;
  flex-wrap: ${props => props.$flexWrap || "wrap"};
  margin-left: ${props => props.$marginLeft || "0px"};
`

const LanguageTitle = styled.h1`
  align-self: center;
  text-align: center;
  margin-left: ${props => props.$marginLeft || "0px"};
`

const LanguageIndv = styled.a`
  display: flex;
  flex-wrap: none;
  align-self: flex-start;
  // justify-content: space-between;
  border: ${props => props.$border || "0px"};
  border-radius: 20px;
  margin: 2px;
  // cursor: pointer;
  padding: 8px;

  &:hover {
    align-self: flex-start;
    background: #4FAF44;
    border: 1px solid #ccc;
    color: #000;
  }
`

const LanguagePercentage = styled.div`
  background: none;
  color: #fff;
  font-size: 20px;
  // &:hover {
  //   color: #000;
  // }
`

const CardFooter = ({ star_count, repo_url, pushed_at }) => {
  const [updated_at, setUpdated_at] = useState("0 mints");

  const handleUpdatetime = useCallback(() => {
    const date = new Date(pushed_at);
    const nowdate = new Date();
    const diff = nowdate.getTime() - date.getTime();
    const hours = Math.trunc(diff / 1000 / 60 / 60);

    if (hours < 24) {
      if (hours < 1) return setUpdated_at("just now");
      let measurement = hours === 1 ? "hour" : "hours";
      return setUpdated_at(`${hours.toString()} ${measurement} ago`);
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const time = new Intl.DateTimeFormat("en-US", options).format(date);
      return setUpdated_at(`on ${time}`);
    }
  }, [pushed_at]);

  useEffect(() => {
    handleUpdatetime();
  }, [handleUpdatetime]);

  return (
    <FooterContainer className="card-text">
      <FooterBtn
        href={repo_url + "/stargazers"}
        target=" _blank"
      >
        <FooterBtnLink className="text-light card-link mr-4">
          <FaGithub/> Stars{" "}
          <span className="badge badge-dark">{star_count}</span>
        </FooterBtnLink>
      </FooterBtn>
      <small className="text-muted" style={{marginLeft: "20px"}}>Updated {updated_at}</small>
    </FooterContainer>
  );
};

const FooterContainer = styled.p`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  // margin-bottom: 10px;

  // &:hover {
  //   align-self: flex-start;
  //   background: #55B4B0;
  //   border: 1px solid #ccc;
  //   border-radius: 20px;
  //   color: #000;

  //   background: #000;
  // }
`

const FooterBtn = styled.a`
  cursor: pointer;
  border-radius: 4px;
  padding: 3px;
  border: 1px solid white;
  border-left: 1px solid white;
  margin-left: 20px;

  &:hover {
    align-self: flex-start;
    background: #55B4B0;
    color: #000;

    background: #fff;
  }
`

const FooterBtnLink = styled.span`
  padding: 3px;
  color: #fff;
  border-radius: 20px;

  &:hover {
    align-self: flex-start;
    background: #55B4B0;
    color: #000;

    background: #fff;
  }
`

export default ProjectCard;