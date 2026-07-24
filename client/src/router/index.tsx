// router.tsx
import { createBrowserRouter } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import Application from "@/pages/Application";
import AuthGuard from "@/components/AuthGuard";
import Home from "@/features/desktop/home/Home";
import Friends from "@/features/desktop/friends/Friends";
import Settings from "@/features/desktop/settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "app",
        element: (
          <AuthGuard>
            <Application />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <Home /> }, // /app
          { path: "chat", element: <Home /> }, // /app/chats
          { path: "chat/:id", element: <Home /> }, // /app/chats/:id (specific conversation)
          { path: "friends", element: <Friends /> }, // /app/friends
          { path: "settings", element: <Settings /> }, // /app/settings
        ],
      },
    ],
  },
]);
