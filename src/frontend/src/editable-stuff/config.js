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
  {
    title: 'Tally Finance Dashboard',
    // TODO: rewrite this description to match what the product actually does.
    description:
      'Personal finance dashboard — track spending, budgets, and goals.',
    liveUrl: 'https://dashboard.tallyfinance.site/',
    githubUrl: '', // TODO: fill in if the repo is public
    // TODO: replace with the real stack labels (e.g. ['Next.js', 'TypeScript', 'Postgres']).
    tags: ['Web App', 'Finance', 'Dashboard'],
  },
  // Add more deployed projects here — each card needs at minimum
  // title, description, and at least one URL (live or github).
];

// SKETCH GALLERY SECTION — sketches, topology studies, 3D-modelling work.
// Each entry: { title, alt, caption, src? }
//   - src: import('../assets/gallery/your-image.png'), or null for placeholder.
//   - Drop images into src/assets/gallery/ then import them above and reference here.
const gallery = [
  {
    title: 'Drone wireframe',
    alt: 'Drone wireframe sketch',
    caption: 'Quick blockout for the hero asset.',
    src: null,
  },
  {
    title: 'Topology study',
    alt: 'Edge-flow topology study',
    caption: 'Edge-flow on a torus knot — used for the About accent.',
    src: null,
  },
  {
    title: 'Stage one',
    alt: 'Sim setup primitives',
    caption: "Roughing primitives for a sim setup that didn't ship.",
    src: null,
  },
];

// Legacy GitHub API config — left here for reference / quick revert.
// const repos = {
//   show: true,
//   heading: 'Recent Projects',
//   gitHubUsername: 'Aortz',
//   reposLength: 4,
//   specificRepos: [],
// };

// SCAN CARDS — teleop "F" readouts tying world landmarks to real work.
const scanData = {
  home: {
    title: 'MULE-1 SURVEY DRONE',
    lines: ['Quad-rotor survey unit.', 'Prototyped in Unreal + AirSim — same stack as my drone-sim work.'],
  },
  about: {
    title: 'ARM-7 INDUSTRIAL',
    lines: ['Six-axis manipulator.', 'ROS-driven control loops — see the Robotics & Sim toolbox in ABOUT.'],
  },
  projects: {
    title: 'NAV NODE',
    lines: ['Deployed-systems ledger.', 'Every entry on this pad shipped to production.'],
  },
  gallery: {
    title: 'TOPOLOGY KNOT',
    lines: ['Edge-flow study.', 'Blender topology practice — more in the sketch gallery.'],
  },
  resume: {
    title: 'MANIPULATOR MK-II',
    lines: ['Fine-motor end effector.', 'Full work history in the panel on the right.'],
  },
  signal: {
    title: 'UNKNOWN EMITTER',
    lines: ['Origin unresolved.', 'It was transmitting before you arrived.'],
  },
};

export { navBar, projects, gallery, scanData };
