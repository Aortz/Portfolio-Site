import React, { Suspense, lazy } from 'react';
import {
  AboutContainer,
  AboutLeftContainer,
  AboutParentContainer,
  AboutAccentSlot,
  AboutDescriptionContainer,
  AboutDescriptionText,
  ToolsBlock,
  CategoryLabel,
  TagRow,
  ToolFlipCard,
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
import SectionHeading from '../../components/SectionHeading';
import AxisDivider from '../../components/AxisDivider';
import useFadeInOnScroll from '../../hooks/useFadeInOnScroll';

const AboutAccent = lazy(() => import('../../components/AboutAccent'));

const TOOL_CATEGORIES = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', Icon: FaPython, purpose: 'scripting / data' },
      { name: 'Java', Icon: FaJava, purpose: 'jvm services' },
      { name: 'JavaScript', Icon: FaJs, purpose: 'web glue' },
      { name: 'C#', Icon: TbBrandCSharp, purpose: 'unity gameplay' },
      { name: 'SQL', Icon: TbSql, purpose: 'data layer' },
    ],
  },
  {
    label: 'Robotics & Sim',
    items: [
      { name: 'ROS', Icon: SiRos, purpose: 'real-time control' },
      { name: 'Gazebo', Icon: BsCpu, purpose: 'physics sim' },
      { name: 'MATLAB', Icon: TbMathFunction, purpose: 'numeric proto' },
      { name: 'Unity', Icon: FaUnity, purpose: '3D / sim' },
    ],
  },
  {
    label: 'Web',
    items: [
      { name: 'React', Icon: FaReact, purpose: 'ui' },
      { name: 'CSS', Icon: FaCss3, purpose: 'styling' },
    ],
  },
  {
    label: 'DevOps',
    items: [
      { name: 'Docker', Icon: FaDocker, purpose: 'containers' },
      { name: 'Linux', Icon: FaLinux, purpose: 'daily driver' },
      { name: 'Git', Icon: FaGithub, purpose: 'version control' },
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

            <AxisDivider />

            <ToolsBlock>
              {TOOL_CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <CategoryLabel>{`// ${cat.label.toUpperCase()}`}</CategoryLabel>
                  <TagRow>
                    {cat.items.map(({ name, Icon, purpose }) => (
                      <ToolFlipCard key={name} tabIndex={0}>
                        <div className="tool-flip-inner">
                          <div className="tool-flip-front">
                            <Icon />
                            {name}
                          </div>
                          <div className="tool-flip-back">{purpose}</div>
                        </div>
                      </ToolFlipCard>
                    ))}
                  </TagRow>
                </div>
              ))}
            </ToolsBlock>
          </AboutDescriptionContainer>
        </AboutLeftContainer>
        <AboutAccentSlot>
          <Suspense fallback={null}>
            <AboutAccent />
          </Suspense>
        </AboutAccentSlot>
      </AboutContainer>
    </AboutParentContainer>
  );
};

export default About;
