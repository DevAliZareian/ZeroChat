// constants/endpoints.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login/",
    ME: "/api/auth/me/",
  },
  FRIENDS: {
    SEND_REQUEST: "/api/friends/requests/",
    UPDATE_REQUEST: (id: number) => `/api/friends/request/${id}/status/`,
    DELETE_FRIENDSHIP: (friendId: string) => `/api/friends/friendship/${friendId}/`,
  },
  CHAT: {
    CREATE_CONVERSATION: "/api/chat/conversation/",
    MESSAGES: (conversationId: number | string) => `/api/chat/conversation/${conversationId}/messages/`,
  },
};

export const WS_ENDPOINTS = {
  FRIENDS: {
    LIST: (token: string | null) => `ws://127.0.0.1:8000/ws/friends/?token=${token}`,
    REQUESTS: (token: string | null) => `ws://127.0.0.1:8000/ws/friendrequests/?token=${token}`,
  },
  CHAT: {
    CONVERSATIONS: (token: string | null) => `ws://127.0.0.1:8000/ws/conversations/?token=${token}`,
    MESSAGES: (conversationId: string | number, token: string | null) => `ws://127.0.0.1:8000/ws/chat/${conversationId}/?token=${token}`,
  },
};
