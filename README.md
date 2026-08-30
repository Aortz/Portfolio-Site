# Portfolio Site

Express + React + Three.js portfolio, presented as an **orbital cyberscape**: a quadruped
field unit (RECON-2) flies a route between five floating platforms — one per section — and
the section's content docks in as a glass panel when it arrives. Two-package monorepo:

- `src/backend/` — Express server (port 8080)
- `src/frontend/` — Create React App + React Three Fiber (port 3000)

## Stack

**Frontend:** React 18, react-router-dom, Create React App (`react-scripts`), styled-components
with a token-based theme (`src/frontend/src/theme/`), Three.js via `@react-three/fiber` +
`@react-three/drei` (`Text`, `Billboard`, `useGLTF` with DRACO), react-bootstrap,
`@vercel/speed-insights`.

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

## How the site works

### Two layouts

`hooks/useIsDesktop3D.js` picks one at runtime:

- **World mode** (desktop ≥ 768px, mouse/trackpad, WebGL available) — a full-screen R3F canvas
  behind the chrome (`world/WorldCanvas.js`), the section panel (`components/SectionDock`),
  the teleop console (`components/TeleopRail`) and the first-visit hint. The document itself
  does not scroll; the panel is the only scrollable surface.
- **Page mode** (phones, touch-only tablets, no WebGL) — the plain vertical site
  (`pages/Home/index.js`): hero, About, Projects, Gallery, Resume as hash-anchored sections.
  No canvas, no console.

Sections are the same components in both modes; `layout/LayoutContext.js` tells them whether
they're `docked` so they drop full-height/border styling and scroll-triggered fade-ins.

### The world

| File | Role |
|---|---|
| `world/route.js` | Platform list, positions, and pre-computed arc-length fractions. No `three` import so the provider stays light. |
| `world/path.js` | Catmull-Rom spline through spawn + platforms; `getPointAt(t)` / `getTangentAt(t)`. Warns in dev if `route.js` constants are stale. |
| `world/Starfield.js` | 2,500-point starfield, slow rotation. |
| `world/Platform.js` | Wireframe hex pad, beacon pillar, pulsing orb, billboarded label (drei `Text`, `public/fonts/IBMPlexMono-Bold.ttf`). |
| `world/Landmarks.js` | Per-platform set piece: drone orbits HOME, industrial arm on ABOUT, icosahedron on PROJECTS, torus knot on GALLERY, hands over RESUME. |
| `world/PlayerRobot.js` | RECON-2 on the spline: position from `t`, heading from the tangent, user yaw/strafe on top, walk bob when moving. |
| `world/ChaseCamera.js` | Smoothed third-person follow. Follows route heading (not user yaw). Starts wide during the fly-in. |
| `world/models/useWireframeGLTF.js` | Shared loader: DRACO, `SkeletonUtils.clone` (RECON-2 is rigged), sphere/axis fit, accent-coloured wireframe that tracks the theme. |

### Teleop / navigation

`teleop/TeleopProvider.js` owns one scalar `t ∈ [0, 1]` — the robot's progress along the
route (HOME = 0, RESUME = 1). Everything that moves the robot writes `t`:

| Input | Effect |
|---|---|
| Mouse wheel (anywhere outside the panel) | Nudges `t`; no arming needed |
| Nav link / logo / `#hash` in URL / back-forward | Eased tween to that platform |
| First visit | Auto fly-in from off-route spawn to HOME, then a hint toast (`sessionStorage` flag) |
| Console (open + armed by default) | `W`/`S` drive along the route, `A`/`D` yaw, `Q`/`E` strafe, `Space` jump, `X` halt, `M` route map |
| `M` / Map button | Toggles a top-down route minimap (under the console) with the robot's position |
| `T` / Run button | Time trial: flies to HOME, starts the clock, splits at each platform, stops at RESUME. Best time persists |
| Click-drag on the background | Orbits the camera around the robot (yaw + pitch); eases back to the chase view once the robot moves |

### Mission layer

Light gamification, all state in `localStorage` (`recon2-mission`), rendered by the console's
CORES / SURVEY / RUN / BADGES readouts and `components/AchievementToast`:

- **Data cores** (`world/Cores.js`) — one octahedron hovering over each pad at jump height.
  Jump while docked to collect it. 5/5 unlocks *ARCHIVE COMPLETE*.
- **Survey** — docking at all five platforms unlocks *FULL SURVEY*.
- **Time trial** — `T`; *TIME TRIAL* on finish, *AFTERBURNER* under `SUB_TIME` (9s; a
  full-throttle run is ~8.3s, so it needs a clean line).
- Also: *LIFT-OFF* (first jump), *CORE SAMPLE* (first core), *SKYWALKER* (25 jumps).
  Definitions in `ACHIEVEMENTS` at the top of `teleop/TeleopProvider.js`.

The panel opens when `t` is within `ARRIVE_RADIUS` of a platform and closes between them;
the URL hash follows arrival. Reduced motion (nav toggle or OS): no fly-in, camera/panel snap,
wheel and `W`/`S` step one whole platform at a time, canvas renders on demand.

### Content and theme

- **Content** lives in `src/frontend/src/editable-stuff/config.js` (project cards, gallery,
  nav). Edit that, not the page components.
- `theme/tokens.js` — colour/space/type tokens for light and dark. `theme/ThemeProvider.js` →
  `useThemeMode()` exposes `mode`, `reducedMotion`, `quality` (localStorage-persisted).

### 3D assets

| Asset | Path | Size | Where |
|---|---|---|---|
| RECON-2 (rigged) | `public/robots/scene.glb` | 80 KB | Player |
| Drone | `public/drone/drone.glb` | 63 KB | HOME |
| Industrial arm | `public/ux3d_industrial_robot/scene.glb` | 142 KB | ABOUT |
| Hands | `public/hands/scene.glb` | 420 KB | RESUME |

All DRACO-compressed with textures shrunk to 8×8 (they render as wireframes, so textures are
never sampled). Decoder is served from `public/draco/`. Each model directory has a
`license.txt` — keep the attribution. To re-process a model:

```sh
npx @gltf-transform/cli resize in.glb tmp.glb --width 8 --height 8
npx @gltf-transform/cli optimize tmp.glb out.glb --compress draco --texture-compress false --simplify false
```

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
- **`useTeleop must be used inside <TeleopProvider>` after editing `TeleopProvider.js` with
  the dev server running** — hot-reload swapped the context object while the R3F canvas kept
  the old one. Hard-reload the tab; not a code bug.
- **`[route] PLATFORM_T/SPAWN_T in world/route.js are stale`** — you moved a platform. Run
  the snippet in the header of `world/path.js` and paste the new numbers into `route.js`.
- **Backend crashes with `path is not defined`** — `src/backend/app.js` uses `path` without
  requiring it; add `const path = require('path');`. Backend is not needed for frontend dev.
