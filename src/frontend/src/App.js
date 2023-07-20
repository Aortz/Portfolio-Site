import React from 'react';
import Navbar from './components/NavBar';
import {
  repos,
} from "./editable-stuff/config.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Project from './pages/Project/project.jsx';
import Resume from './pages/resume';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Project heading={repos.heading}
          username={repos.gitHubUsername}
          length={repos.reposLength}
          specfic={repos.specificRepos}/>} />
        <Route path='/resume' element={<Resume />} />
      </Routes>
    </Router>
  )
}
