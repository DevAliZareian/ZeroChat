import { createBrowserRouter } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import Application from "@/pages/Application";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/app",
    element: <Application />,
    children: [
      {
        path: "chat/:id",
        element: <></>,
      },
    ],
  },
]);
