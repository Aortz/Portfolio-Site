import React from 'react';
import {
  AboutContainer,
  AboutLeftContainer,
  AboutParentContainer,
  AboutBgImg,
  AboutDescriptionContainer,
  AboutDescriptionText,
  ToolsBlock,
  CategoryLabel,
  TagRow,
  ToolTag,
} from './AboutElements';
import {
  FaPython,
  FaJava,
  FaDocker,
  FaReact,
  FaGithub,
  FaJs,
  FaCss3,
  FaUnity,
  FaLinux,
} from 'react-icons/fa';
import { TbBrandCSharp, TbSql, TbMathFunction } from 'react-icons/tb';
import { SiRos } from 'react-icons/si';
import { BsCpu } from 'react-icons/bs';
import AboutBg from '../../assets/aboutBG.png';
import SectionHeading from '../../components/SectionHeading';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';

const TOOL_CATEGORIES = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', Icon: FaPython },
      { name: 'Java', Icon: FaJava },
      { name: 'JavaScript', Icon: FaJs },
      { name: 'C#', Icon: TbBrandCSharp },
      { name: 'SQL', Icon: TbSql },
    ],
  },
  {
    label: 'Robotics & Sim',
    items: [
      { name: 'ROS', Icon: SiRos },
      { name: 'Gazebo', Icon: BsCpu },
      { name: 'MATLAB', Icon: TbMathFunction },
      { name: 'Unity', Icon: FaUnity },
    ],
  },
  {
    label: 'Web',
    items: [
      { name: 'React', Icon: FaReact },
      { name: 'CSS', Icon: FaCss3 },
    ],
  },
  {
    label: 'DevOps',
    items: [
      { name: 'Docker', Icon: FaDocker },
      { name: 'Linux', Icon: FaLinux },
      { name: 'Git', Icon: FaGithub },
    ],
  },
];

const About = () => {
  const [ref, visible] = useFadeInOnScroll();

  return (
    <AboutParentContainer
      id="about"
      ref={ref}
      className={visible ? 'visible' : ''}
    >
      <AboutBgImg src={AboutBg} className={visible ? 'visible bg' : ''} />
      <AboutContainer>
        <AboutLeftContainer>
          <SectionHeading number="02">ABOUT ME</SectionHeading>

          <AboutDescriptionContainer
            $animationDelay="0s"
            className={visible ? 'visible description' : ''}
          >
            <AboutDescriptionText $inputColor="#b8b8b8">
              Hi, I&apos;m Junwei — a software engineer who works at the
              intersection of robotics simulation and the web. I like building
              tools that turn complex sim/control systems into things you can
              actually click around on. When I&apos;m not on a keyboard you&apos;ll
              find me at the gym or chasing some new framework rabbit hole.
            </AboutDescriptionText>

            <ToolsBlock>
              {TOOL_CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <CategoryLabel>{`// ${cat.label.toUpperCase()}`}</CategoryLabel>
                  <TagRow>
                    {cat.items.map(({ name, Icon }) => (
                      <ToolTag key={name}>
                        <Icon />
                        {name}
                      </ToolTag>
                    ))}
                  </TagRow>
                </div>
              ))}
            </ToolsBlock>
          </AboutDescriptionContainer>
        </AboutLeftContainer>
      </AboutContainer>
    </AboutParentContainer>
  );
};

export default About;
