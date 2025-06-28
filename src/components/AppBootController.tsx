import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function AppBootController() {
  const setReady = useAppStore((state) => state.setReady);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // replace this with auth check, API call, animation, etc.
      setReady();
    }, 0); // Fake boot delay

    return () => clearTimeout(timeout);
  }, [setReady]);

  return null; // this component just triggers side effects
}
