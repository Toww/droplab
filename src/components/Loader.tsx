import { useEffect } from "react";
import { addEffect } from "@react-three/fiber";
import useAppStore from "../stores/useAppStore";

export default function Loader() {
  // Store variables
  const phase = useAppStore((state) => state.phase);

  // Effects
  useEffect(() => {
    const appStore = useAppStore.getState();
    appStore.startLoading();

    // Faking loading for development purpose
    // -----
    // TODO - Implement real loading state once the rest of the app is ready.
    // -----
    const startTime = Date.now();
    let elapsedTime = 0;
    const finishTime = 3.2; // Finish time in seconds

    const unsubEffect = addEffect(() => {
      elapsedTime = (Date.now() - startTime) / 1000; // elapsedTime in seconds

      if (elapsedTime > finishTime) {
        appStore.endLoading();
      }
    });

    return () => {
      unsubEffect();
      elapsedTime = 0;
    };
  }, []);

  return <div className="loader-container"></div>;
}
