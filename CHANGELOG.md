# Changelog

## 3.1.0 (unreleased)

- Removed legacy MVC/Pug/BEM codebase (~230 files)
- Fixed multiplayer WebSocket stale closure bug (wrong player side on remote moves)
- Added multiplayer UX: score change display, cell fill animation, connection error modal
- Added loading spinner for auth route guards
- Redirect `/multiplayer` without room ID to `/url`
- Added Vitest unit tests for game engine, AI, and validation
- Added React Error Boundary
- Added account deletion UI on profile page
- Improved scoreboard pagination using API `total`
- Lazy-loaded `GamePage` and `MultiplayerPage`
- Consolidated CI: GitHub Actions for lint, test, build, and production deploy
- Removed Travis CI and encrypted deploy key from repository
- Added documentation: architecture, REST API, WebSocket protocol

## 3.0.0

- Migration to React 19 + TypeScript + Vite 7
- CSS Modules neumorphic design
- Feature parity with legacy app (except dark theme)
