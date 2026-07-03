# REST API

Base URL: `VITE_API_HOST` (see `.env.example`).

All requests use `credentials: 'include'` for cookie-based sessions.

## Session

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/session` | Sign in (`{ login, password }`) |
| GET | `/api/session` | Check session |
| DELETE | `/api/session` | Logout |

## User

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/user` | Current user profile |
| POST | `/api/user` | Sign up |
| PUT | `/api/user` | Update email/username |
| DELETE | `/api/user` | Delete account |
| PUT | `/api/password` | Change password |
| POST | `/api/avatar` | Upload avatar (multipart) |

## Leaderboard

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/users?limit=&page=` | Paginated leaderboard |

Response shape (`UsersResponse`):

```json
{
  "users": [{ "username": "...", "score": 0, "avatar": "..." }],
  "total": 42
}
```

## Multiplayer room

| Method | Path | Description |
|--------|------|-------------|
| GET | `{VITE_MULTIPLAYER_HOST}/new_room` | Create room, returns `{ "id": "..." }` |

Implementation: `src/api/api.ts`, types in `src/api/types.ts`.
