import { createBrowserRouter } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import Application from "@/pages/Application";
import AuthGuard from "@/components/AuthGuard";

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
          {
            path: "chat/:id",
            element: <></>,
          },
        ],
      },
    ],
  },
]);
