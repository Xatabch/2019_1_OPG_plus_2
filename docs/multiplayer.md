# Multiplayer WebSocket Protocol

Connection URL:

```
{VITE_MULTIPLAYER_WS}/{roomId}/room
```

Messages are newline-delimited JSON objects.

## Client → Server

### Register

Sent on connection open:

```json
{
  "user": "username",
  "avatar": "/path/to/avatar",
  "type": "register"
}
```

### Game move

Sent when the local player completes a line (at least 2 cells):

```json
{
  "user": "username",
  "type": "game",
  "data": {
    "coords": [{ "x": 0, "y": 0 }, { "x": 0, "y": 4 }]
  }
}
```

Only start and end coordinates are sent; the client interpolates intermediate cells.

## Server → Client

### Register ack

```json
{ "type": "register" }
```

Client shows “waiting for second player” modal.

### Game start (SERVICE)

```json
{
  "user": "SERVICE",
  "data": {
    "event_data": {
      "players": [{ "username": "...", "avatar": "..." }],
      "whose_turn": "username",
      "locked": [{ "x": 1, "y": 2 }]
    }
  }
}
```

- `locked` — disabled cells (`d` on the board).
- Client reorders players so the local user is always index 0 (left side).

### Opponent move

```json
{
  "type": "game",
  "user": "opponent_username",
  "data": {
    "coords": [{ "x": 0, "y": 0 }, { "x": 0, "y": 2 }]
  }
}
```

### Win event

```json
{
  "type": "event",
  "data": {
    "event_type": "win",
    "event_data": {
      "winner": "username",
      "score_inc": 10,
      "score_dec": 5
    }
  }
}
```

Implementation: `src/pages/MultiplayerPage.tsx`.
