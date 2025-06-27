import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAppStore } from "./store/useAppStore";
import AppBootController from "./components/AppBootController";
import AppLoader from "./components/AppLoader";

function App() {
  const isReady = useAppStore((state) => state.isReady);
  return (
    <>
      <AppBootController />
      {isReady ? <RouterProvider router={router} /> : <AppLoader />}
    </>
  );
}

export default App;
