# ZeroChat

A real-time chat app — Django + Channels on the backend, React + TypeScript on the frontend. Email auth, a friend system, live messaging over WebSockets, Chakra UI on top.

![UI-app](https://github.com/DevAliZareian/ZeroChat/blob/main/resources/UI-app.png)

## Stack

**Backend:** Python 3.14, Django 6, DRF 3.17, Django Channels 4.3 + Daphne (ASGI, WebSockets), SimpleJWT, drf-spectacular for docs. SQLite in dev, Postgres-ready.

**Frontend:** React 19, TypeScript 5.8, Vite 7, Chakra UI + Framer Motion, Zustand for client state, TanStack Query for server state, react-use-websocket for the live layer.

## Features

- Email registration/login with JWT access + refresh tokens
- Real-time 1:1 messaging via Channels consumers
- Conversations with message history and live updates
- Friend requests (send/accept/reject) pushed instantly over WebSocket
- Friend list stays in sync in real time via Django signals + the channel layer
- Dark/light mode, persisted
- Swagger (`/api/docs/`) and ReDoc (`/api/redoc/`) auto-generated from the API
- Three-panel layout: contacts, messages, contact details

## How it's built

The ASGI app (`config/asgi.py`) splits traffic two ways: regular HTTP goes through Django as usual, WebSocket connections go through Channels' `URLRouter` with a custom JWT auth middleware since there's no cookie session to rely on. Each connected user joins per-user channel groups (`user_{id}_friends`, `user_{id}_conversations`), so changes broadcast via Django signals reach the right clients directly instead of everyone polling. Backend apps — `accounts`, `friends`, `chat` — are kept independent, each owning its own models, serializers, views, and consumers.

On the frontend, REST handles mutations (Axios + React Query, with optimistic updates for things like friend requests) while WebSockets handle live subscriptions. Zustand holds auth state, the active conversation, and message caches. An `AuthGuard` wraps `/app/*` and redirects to login if there's no valid JWT.

## Getting Started

Needs Python 3.10+, Node 18+, and optionally Redis (falls back to an in-memory channel layer without it).

**Backend:**
```bash
cd server
python -m venv venv
source venv/bin/activate  # .\venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
daphne -b 0.0.0.0 -p 8000 config.asgi:application
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173` — Vite proxies `/api` and `/ws` to the Django server on `:8000`.

## API

A few of the main REST routes, all under `/api/`:

- `auth/register/`, `auth/login/`, `auth/refresh/`, `auth/me/`
- `friends/requests/` (send), `friends/request/<id>/status/` (accept/reject), `friends/friendship/<id>/` (remove)
- `chat/conversation/` (create), `chat/conversation/<id>/messages/` (history)

Full schema is in the Swagger docs.

WebSocket endpoints, authenticated via `?token=<jwt_access_token>`:

- `/ws/chat/<conversation_id>/` — messages
- `/ws/conversations/` — conversation list updates
- `/ws/friends/` — friend list updates
- `/ws/friendrequests/` — friend request notifications

## Project Layout

```
client/src/
  api/          Axios REST functions
  components/   Shared UI
  features/     Page-level components & layouts
  hooks/        Custom hooks (WebSocket, mutations)
  pages/        Route-level pages
  router/       React Router config
  store/        Zustand stores
  theme/        Chakra theme

server/
  config/       settings.py, asgi.py, urls.py
  apps/
    accounts/   User model & auth
    friends/    Friendships, requests, consumers
    chat/       Conversations, messages, consumers
  utils/
    jwt_middleware.py   WebSocket JWT auth
```

## Notes

- Channel layer defaults to in-memory for local dev — swap to `RedisChannelLayer` in `settings.py` for production.
- There are some leftover GraphQL queries on the frontend; the backend is REST-only, so those aren't wired up to anything.
- File attachments aren't implemented yet — there's a button for it in the UI, but no backend handler behind it.
