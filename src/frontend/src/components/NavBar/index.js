import React from 'react';
import {
  Nav,
  NavLeft,
  NavRight,
  NavLinkRow,
  NavAnchor,
  NavLogo,
} from './NavbarElements';
import PersonalLogo from '../../assets/personal-icon/personal-logo-transparent.png';
import ThemeToggle from '../ThemeToggle';
import ReducedMotionToggle from '../ReducedMotionToggle';
import { useTeleop } from '../../teleop/TeleopProvider';

const LINKS = [
  { id: 'home', label: '1. HOME' },
  { id: 'about', label: '2. ABOUT ME' },
  { id: 'projects', label: '3. PROJECTS' },
  { id: 'gallery', label: '4. GALLERY' },
  { id: 'resume', label: '5. RESUME' },
];

const Navbar = () => {
  const { mode, goTo } = useTeleop();

  // World mode: fly the robot to the platform instead of jumping the page.
  // The href stays for a11y / middle-click / page mode.
  const onLink = (id) => (e) => {
    if (mode !== 'world') return;
    e.preventDefault();
    goTo(id);
  };

  return (
    <Nav>
      <NavLeft>
        <NavLogo
          src={PersonalLogo}
          onClick={() => goTo('home')}
          alt="Junwei logo"
        />
      </NavLeft>

      <NavRight>
        <NavLinkRow>
          {LINKS.map(({ id, label }) => (
            <NavAnchor key={id} href={`#${id}`} onClick={onLink(id)}>
              {label}
            </NavAnchor>
          ))}
        </NavLinkRow>
        <ReducedMotionToggle />
        <ThemeToggle />
      </NavRight>
    </Nav>
  );
};

export default Navbar;
