# Portfolio Site

Express + React + Three.js portfolio with a robotics theme. Two-package monorepo:

- `src/backend/` — Express server (port 8080)
- `src/frontend/` — Create React App + React Three Fiber (port 3000)

## Stack

**Frontend:** React 18, react-router-dom, Create React App (`react-scripts`), styled-components
with a token-based theme (`src/frontend/src/theme/`), Three.js via `@react-three/fiber` +
`@react-three/drei` (+ `@react-three/rapier` / `@react-three/postprocessing` installed),
MUI + Emotion, react-bootstrap, react-infinite-scroll-component, `@vercel/speed-insights`.

**Backend:** Express 4. Minimal — serves static files and a `/cors` test route. The frontend
does not proxy to it, so it is optional for local development.

## Getting started

From the repo root, first-time bootstrap:

```sh
npm install      # root tooling (concurrently) — required before `npm run dev`
npm run setup    # installs src/backend and src/frontend deps
```

Then to develop:

```sh
npm run dev      # backend (:8080) + frontend (:3000) together
```

Or individually:

```sh
npm run start:backend
npm run start:frontend
npm run build         # production build -> src/frontend/build
npm test              # frontend tests
```

The standard CRA scripts (`start`, `build`, `test`, `eject`) are also available directly from
`src/frontend/`. See `src/frontend/README.md` for CRA reference docs.

## Site structure

Single-page scroll; sections are hash anchors in order: `#home`, `#about`, `#projects`,
`#gallery`, `#resume` (`src/frontend/src/pages/Home/index.js`).

**Content lives in `src/frontend/src/editable-stuff/config.js`** — project cards, gallery
entries, nav toggles. Edit that file rather than the page components.

### Theme and toggles

`src/frontend/src/theme/tokens.js` defines color/space/type tokens for light and dark modes;
`theme/ThemeProvider.js` exposes `useThemeMode()` with four localStorage-persisted toggles:
theme mode, grid overlay, particle speed, and reduced motion (honours
`prefers-reduced-motion` by default). Reduced motion pauses all 3D idle animation and CSS
transitions.

### 3D accents

Each section has a wireframe GLB accent rendered in the theme accent color:

| Asset | Path | Size | Used by |
|---|---|---|---|
| Drone | `public/drone/drone.glb` | 843 KB | Hero |
| Industrial robot | `public/ux3d_industrial_robot/scene.glb` | 5.4 MB | About |
| Robots (RECON-2) | `public/robots/scene.glb` | 2.4 MB | Teleop unit |
| Hands | `public/hands/scene.glb` | 295 KB | Resume |

~9 MB total. Each model directory has a `license.txt` — keep the attribution. Models are
loaded with `useGLTF` inside `React.lazy` chunks so they download per section; no DRACO
compression is currently applied.

### Teleop console (page-walk)

The `TELEOP` tab on the right edge opens a console that drives the RECON-2 field unit shown
in a fixed box at the bottom-left. Driving the robot walks the page:

| Key | Action |
|---|---|
| `Space` | Arm / disarm |
| `W` / `S` (or arrows) | Walk up / down the page (scrolls) |
| `A` / `D` | Yaw the robot |
| `Q` / `E` | Strafe inside its box |
| `X` | Halt — recentre yaw/strafe |

HUD shows speed, current waypoint (section) and page progress. Mouse-wheel scrolling while
armed pauses the motor briefly so you can always override. With reduced motion on, `W`/`S`
step one screen per press instead of scrolling continuously. The on-screen key caps are
clickable. Keyboard-only; console and unit are hidden below 768px.

Code: `src/frontend/src/teleop/TeleopProvider.js` (input + integration loop),
`components/TeleopRail` (console UI), `components/TeleopUnit` (robot canvas).

## Deployment

Frontend is a static CRA build (`src/frontend/build`). `@vercel/speed-insights` is included,
so Vercel is the intended target — set the project root to `src/frontend`. No `vercel.json`
is committed yet.

`src/frontend/.env.production` sets `DISABLE_ESLINT_PLUGIN=true` so lint warnings never fail
a CI build. Run `npm start` locally to see them.

## Troubleshooting

- **`sh: 1: concurrently: not found`** on `npm run dev` — root deps not installed. Run
  `npm install` at the repo root, then `npm run setup`.
- **`Environment key "jest/globals" is unknown`** — the `react-app/jest` ESLint preset fails
  to resolve `eslint-plugin-jest` through nested `node_modules`. `eslintConfig` in
  `src/frontend/package.json` extends only `react-app`; don't add `react-app/jest` back.
- **`'onAfterSetupMiddleware' option is deprecated` / `onBeforeSetupMiddleware`** — emitted
  by the webpack-dev-server config bundled inside react-scripts 5. Harmless, and not fixable
  without ejecting.
- **Backend crashes with `path is not defined`** — `src/backend/app.js` uses `path` without
  requiring it; add `const path = require('path');`. Backend is not needed for frontend dev.
