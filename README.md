# ZeroChat

A full-stack real-time chat application with a **Django + Channels** backend and a **React + TypeScript** frontend. Features email-based authentication, a friend system, live messaging over WebSockets, and a polished Chakra UI interface.

![UI-app](https://github.com/DevAliZareian/ZeroChat/blob/main/resources/UI-app.png)

> Built to demonstrate modern real-time web architecture, clean API design, and end-to-end feature implementation.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Backend** | Python 3.14, Django 6, Django REST Framework 3.17 | REST API & business logic |
| **Real-Time** | Django Channels 4.3, Daphne 4.2, WebSockets | Live messaging & presence |
| **Auth** | SimpleJWT (access + refresh tokens) | Stateless authentication |
| **Frontend** | React 19, TypeScript 5.8, Vite 7 | SPA UI |
| **UI** | Chakra UI 2.10, Framer Motion 12 | Responsive design & animations |
| **State** | Zustand 5 + TanStack React Query 4 | Client & server state |
| **Real-Time Client** | react-use-websocket | WebSocket integration |
| **Database** | SQLite (dev), PostgreSQL-ready via Django ORM | Data persistence |
| **Docs** | drf-spectacular (Swagger / ReDoc) | Auto-generated API docs |

---

## Features

- **Email-based registration & login** with JWT access/refresh token flow
- **Real-time one-on-one messaging** via Django Channels WebSocket consumers
- **Conversation management** — create conversations, view message history, live updates
- **Friend system** — send, accept, and reject friend requests with instant WebSocket push
- **Live friend list** — friends and friend requests update in real time via Django signals + Channels layer
- **Dark / light mode** with persisted preference
- **Auto-generated API docs** at `/api/docs/` (Swagger) and `/api/redoc/` (ReDoc)
- **Responsive three-panel chat layout** — contacts, messages, and contact details

---

### Backend Design

- **ASGI dual protocol** — `config/asgi.py` routes HTTP through Django's WSGI handler and WebSocket connections through Channels' `URLRouter` with custom JWT authentication middleware
- **Signal-driven real-time updates** — Django `post_save` / `post_delete` signals broadcast changes to WebSocket groups (`user_{id}_friends`, `user_{id}_conversations`), ensuring all connected clients stay in sync
- **Per-user channel groups** — each authenticated user joins dedicated groups on WebSocket connect, allowing targeted message delivery without polling
- **Modular Django apps** — `accounts`, `friends`, and `chat` are decoupled, each with its own models, serializers, views, consumers, and URL routing

### Frontend Design

- **Hybrid data fetching** — REST API for mutations (Axios + React Query) and WebSockets for real-time subscriptions (react-use-websocket)
- **Zustand stores** for client-side state — auth tokens, selected conversation, messages cache, active sidebar section
- **React Query mutations with optimistic updates** for friend requests and conversation creation
- **AuthGuard wrapper** protecting all `/app/*` routes, redirecting to login when no valid JWT exists

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Redis (optional — falls back to in-memory channel layer)

### Backend

```bash
cd server
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
daphne -b 0.0.0.0 -p 8000 config.asgi:application
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies `/api` and `/ws` requests to the Django backend at `http://127.0.0.1:8000`.

---

## API Overview

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Create a new account |
| POST | `/api/auth/login/` | Obtain JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| GET | `/api/auth/me/` | Get current user |
| POST | `/api/friends/requests/` | Send friend request |
| PATCH | `/api/friends/request/<id>/status/` | Accept/reject request |
| DELETE | `/api/friends/friendship/<id>/` | Remove a friend |
| POST | `/api/chat/conversation/` | Create a conversation |
| GET | `/api/chat/conversation/<id>/messages/` | Get message history |

### WebSocket Channels

| Path | Purpose |
|------|---------|
| `/ws/chat/<conversation_id>/` | Send & receive messages in real time |
| `/ws/conversations/` | Live conversation list updates |
| `/ws/friends/` | Live friend list updates |
| `/ws/friendrequests/` | Live friend request notifications |

All WebSocket connections authenticate via `?token=<jwt_access_token>` query parameter.

---

## Project Structure

```
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── api/             # Axios REST client functions
│       ├── components/      # Shared UI components
│       ├── features/        # Page-level components & layouts
│       ├── hooks/           # Custom React hooks (WebSocket, mutations)
│       ├── pages/           # Route-level page components
│       ├── router/          # React Router configuration
│       ├── store/           # Zustand state stores
│       └── theme/           # Chakra UI theme & colors
│
└── server/                  # Django backend
    ├── config/
    │   ├── settings.py      # Django configuration
    │   ├── asgi.py          # ASGI entry point (HTTP + WS)
    │   └── urls.py          # Root URL routing
    ├── apps/
    │   ├── accounts/        # User model & auth views
    │   ├── friends/         # Friendship, friend requests, consumers
    │   └── chat/            # Conversations, messages, consumers
    └── utils/
        └── jwt_middleware.py # WebSocket JWT authentication
```

---

## Development Notes

- **Channel layer** defaults to `InMemoryChannelLayer` for zero-dependency development. For production, set up Redis and switch to `RedisChannelLayer` in `settings.py`.
- **GraphQL** queries exist in the frontend but the backend serves REST-only. The API docs are auto-generated via drf-spectacular.
- **No file upload** support yet — the UI has an attachment button placeholder, but no backend handler.

---

## License

MIT
