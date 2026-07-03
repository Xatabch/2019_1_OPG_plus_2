# Architecture

## Overview

Colors Game Frontend is a React 19 SPA for a turn-based 5×5 board game. The app talks to an external REST API for auth and profiles, and to a WebSocket service for multiplayer rooms.

## Directory layout

```
src/
├── app/App.tsx          # Routes and providers
├── pages/               # Route-level screens
├── components/          # Reusable UI (game board, layout, forms)
├── contexts/            # React context (auth)
├── api/                 # REST client and types
├── game/                # Pure game engine (no React)
├── hooks/               # Shared React hooks
├── lib/                 # Utilities (debounce, validation)
├── styles/              # Global CSS
└── main.tsx             # Entry point
```

## Data flow

1. **Auth** — `AuthContext` checks `GET /api/session` on mount, loads user via `GET /api/user`.
2. **Local game** — `useGame` reducer + `game/engine.ts`; state persisted in `localStorage`.
3. **Multiplayer** — `MultiplayerPage` opens WebSocket to `{VITE_MULTIPLAYER_WS}/{roomId}/room`, syncs moves via JSON messages.

## Key design choices

- Game logic lives in pure TypeScript modules under `src/game/` for testability.
- CSS Modules for component styling (neumorphic design).
- No global state library — Context + local reducers are sufficient at current scale.
- Lazy-loaded routes for `GamePage` and `MultiplayerPage`.
