import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { BiMenuAltRight } from 'react-icons/bi';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <Nav>
        <NavBtn
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          {navbarOpen ? (
            <>
              <MdClose style={{ width: '32px', height: '32px', color: "#000" }} />
            </>
            ) : (
              <BiMenuAltRight
                style={{
                  width: '32px',
                  height: '32px',
                  color: "#000",
                }}
              />
          )}
        </NavBtn>
      </Nav>
      <>
        {navbarOpen ? (
          <NavMenu>
            <NavLink to='/' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"<Home />"}</p>
            </NavLink>
            <NavLink to='/about' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"<About />"}</p>
            </NavLink>
            <NavLink to='/projects' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"<Project />"}</p>
            </NavLink>
            <NavLink to='/resume' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"<Resume />"}</p>
            </NavLink>
            <NavLink to='/experimentation' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"<Experiment />"}</p>
            </NavLink>
          </NavMenu>) : (<></>)
        }
      </>
    </>
  );
};
  
export default Navbar;