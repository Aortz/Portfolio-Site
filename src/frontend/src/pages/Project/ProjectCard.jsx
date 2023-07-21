import React, { useState, useEffect, useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import styled from "styled-components";
import { 
  CardContainer,
  StyledCard,
  CardBody,
  CardTitle,
  CardText,
  GlobalStyles
} from './ProjectCardElements';


const cardButtonStyle = {
  justifyContent: "space-between",
  backgroundColor: "#fffff",
  color: "#fff",
  border: "1px solid black",
  borderRadius: "4px",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#fff",
  },
};

const languageStyle = {
  justifyContent: "space-between",
  backgroundColor: "#D3D3D3",
  color: "#000",
  border: "none",
  borderRadius: "4px",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#007bff",
  },
};

const ProjectCard = ({ value }) => {
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    languages_url,
    pushed_at,
  } = value;

  return (
    <CardContainer md={6}>
      <GlobalStyles />
      <StyledCard>
        <CardBody>
          <CardTitle>{name || <Skeleton />} </CardTitle>
          <CardText>{(!description) ? "" : description || <Skeleton count={3} />} </CardText>
          {svn_url ? <CardButtons svn_url={svn_url} /> : <Skeleton count={2} />}
          <hr />
          {languages_url ? (
            <StyledLanguage languages_url={languages_url} repo_url={svn_url} />
          ) : (
            <Skeleton count={3} />
          )}
          {value ? (
            <CardFooter star_count={stargazers_count} repo_url={svn_url} pushed_at={pushed_at} />
          ) : (
            <Skeleton />
          )}
        </CardBody>
      </StyledCard>
    </CardContainer>
  );
};

const CardButtons = ({ svn_url }) => {
  return (
    <div className="d-grid gap-2 d-md-block">
      <a
        href={`${svn_url}/archive/master.zip`}
        className="btn btn-outline-secondary mx-2"
        style={{...cardButtonStyle}}
      >
        <FaGithub/> Clone Project
      </a>
      <a 
        href={svn_url} target=" _blank" 
        className="btn btn-outline-secondary mx-2"
        style={{...cardButtonStyle}}  
      >
        <FaGithub/> Repo
      </a>
    </div>
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
    <div className="pb-3" style={{flexDirection: 'row', justifyContent: "center"}}>
      Languages:{" "}
      {array.length
        ? array.map((language) => (
          <a
            key={language}
            className="card-link"
            href={repo_url + `/search?l=${language}`}
            target=" _blank"
            rel="noopener noreferrer"
            style={languageStyle}
          >
            <span className="badge bg-light text-dark" >
              {language}:{" "}
              {Math.trunc((data[language] / total_count) * 1000) / 10} %
            </span>
          </a>

        ))
        : "code yet to be deployed."}
    </div>
  );
};

const StyledLanguage = styled(Language)`
  font-family: 'VT323', monospace;
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
    <p className="card-text" style={{padding: 10}}>
      <a
        href={repo_url + "/stargazers"}
        target=" _blank"
        className="text-dark text-decoration-none"
      >
        <span className="text-dark card-link mr-4" style={{...cardButtonStyle}}>
          <FaGithub/> Stars{" "}
          <span className="badge badge-dark">{star_count}</span>
        </span>
      </a>
      <small className="text-muted" style={{padding: 20}}>Updated {updated_at}</small>
    </p>
  );
};

export default ProjectCard;