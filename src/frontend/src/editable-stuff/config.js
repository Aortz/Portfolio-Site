// Navigation Bar SECTION
const navBar = {
  show: true,
};

// PROJECTS SECTION — curated, deployed work.
//
// Each entry shape:
//   {
//     title:        string  (card heading)
//     description:  string  (1–2 sentences)
//     liveUrl:      string  (deployed/demo URL; pass empty string '' if none)
//     githubUrl:    string  (source repo URL; pass empty string '' if private)
//     tags:         string[] (tech labels — e.g. ['React', 'Three.js'])
//     screenshot:   require('../assets/projects/foo.png')   // optional; omit if none
//   }
//
// To re-enable the GitHub API mode, uncomment the `repos` block below and
// the corresponding code in src/pages/Project/project.jsx + ProjectCard.jsx.
// (Note: requires REACT_APP_GITHUB_TOKEN in .env and Vercel env vars.)

const projects = [
  {
    title: 'Portfolio Site',
    description:
      'This site. React + styled-components + Three.js, theme tokens with light/dark mode, deployed on Vercel.',
    liveUrl: 'https://portfolio-site-aortz.vercel.app',
    githubUrl: 'https://github.com/Aortz/Portfolio-Site',
    tags: ['React', 'styled-components', 'Three.js', 'Vercel'],
  },
  // TODO: add more deployed projects here — e.g. side projects, hackathon
  // submissions, internal tools you can share. Each card needs at minimum
  // title, description, and at least one URL (live or github).
];

// Legacy GitHub API config — left here for reference / quick revert.
// const repos = {
//   show: true,
//   heading: 'Recent Projects',
//   gitHubUsername: 'Aortz',
//   reposLength: 4,
//   specificRepos: [],
// };

export { navBar, projects };
