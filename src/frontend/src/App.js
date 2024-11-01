import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBar';
import InfiniteScroll from "react-infinite-scroll-component";
import {
  repos,
} from "./editable-stuff/config.js";
import { RouteContainer } from './pages/Home/HomePageElements';
import {
  NavLink,
  NavMenu,
} from './components/NavBar/NavbarElements';
import VerticalNavbar from './components/NavBar/VerticalNavbar';
import { GlobalStyles } from './components/Fonts/Fonts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Home from './pages/Home/index';
import About from './pages/About/about';
import Project from './pages/Project/project.jsx';
import Resume from './pages/Resume/resume';
import Experimentation from './pages/experimentation';

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SlideLeftWrapper = styled.div`
  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;
`;

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <Router>
      <GlobalStyles />
      {/* Pass the state and setState to NavBar component */}
      <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <>
        {navbarOpen ? (
          <NavMenu>
            <RedirectHome navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
            <RedirectAbout navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
            <RedirectProjects navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
            {/* <RedirectResume navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/> */}
            {/* <NavLink to='/experimentation' onClick={() => setNavbarOpen((prev) => !prev)}>
              <p>{"05. <EXPERIMENT/>"}</p>
            </NavLink> */}
          </NavMenu>) : 
          (
            // <CustomScrollbar></CustomScrollbar>
            <RouteContainer>
              <VerticalNavbar/>
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route
                  path='/projects'
                  element={
                    <Project
                      heading={repos.heading}
                      username={repos.gitHubUsername}
                      length={repos.reposLength}
                      specfic={repos.specificRepos}
                    />
                  }
                />
                <Route path='/resume' element={<Resume />} />
                {/* <Route path='/experimentation' element={<Experimentation />} /> */}
              </Routes>
            </RouteContainer>
          )
        }
      </>
    </Router>
  );
}

const RedirectHome = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
          <p>{"01. <HOME/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

const RedirectProjects = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/projects' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
        <p>{"03. <PROJECTS/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

const RedirectResume = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/resume' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
        <p>{"04. <RESUME/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

const RedirectAbout = ({navbarOpen, setNavbarOpen}) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setNavbarOpen((prev) => !prev)
      setAnimate(false);
    }, 1000);
  };

  return (
    <NavLink to='/about' onClick={handleClick}>
      <SlideLeftWrapper animate={animate}>
        {/* Your Component 1 content */}
        <p>{"02. <ABOUT/>"}</p>
      </SlideLeftWrapper>
    </NavLink>
  );
};

// function App() {
//   // const [state, setState] = useState({ items: [<About />,<Home />]});
//   // const [extraComponents] = useState([
//   //   <Home />,
//   //   <Project />,
//   //   <Resume />,
//   // ]);
//   // const [count, setCount] = useState(0);
//   // const [hasMore, setHasMore] = useState(true);
  
//   // const fetchMoreData = () => {
//   //   if (state.items.length >= 7) {
//   //     setHasMore(false);
//   //     return;
//   //   }
  
//   //   // Simulate an asynchronous API call using Promise
//   //   const fakeAPICall = new Promise((resolve) => {
//   //     setTimeout(() => {
//   //       resolve(extraComponents[count]);
//   //     }, 500);
//   //   });
  
//   //   // Update the state when the Promise resolves
//   //   fakeAPICall.then((newItem) => {
//   //     setCount(count + 1);
//   //     setState((state) => ({
//   //       items: state.items.concat([newItem]),
//   //     }));
//   //   });
//   // };

//   // console.log(state.items);
//   return (
//     <RouteContainer>
//       {/* <h1 style={{backgroundColor: '#fff'}}>Portfolio Template with react-infinite-scroll-component </h1> */}
//       <VerticalNavbar/>
//       {/* {console.log("extraC", state.items.length)}
//       <InfiniteScroll
//         dataLength={state.items.length}
//         // height={50}
//         next={fetchMoreData}
//         hasMore={hasMore}
//         loader={<h4>Loading...</h4>}
//         endMessage={
//           <p style={{ textAlign: "center" }}>
//             <b>Yay! You have seen it all</b>
//           </p>
//         }
//         // scrollableTarget={<RouteContainer/>}
//       >
//         {state.items.map((i, index) =>  i)}
//       </InfiniteScroll> */}
//       <Home />
//       {/* <Resume /> */}
//     </RouteContainer>
//   );
// }

// export default App;