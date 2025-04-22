import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import useAppStore from "@stores/useAppStore";
import Clouds from "@components/Work/Intro/Clouds";
import Sticker from "@components/Work/Intro/Sticker";

export default function Intro() {
  // Hooks
  const progress = useProgress();
  const startLoading = useAppStore((state) => state.startLoading);
  const endLoading = useAppStore((state) => state.endLoading);

  // Start Loading on first render
  useEffect(() => {
    startLoading();
  }, []);

  useEffect(() => {
    let loadEndTimeout = null;

    // Wait for a few seconds after load for intro to fade out
    if (progress.loaded) {
      loadEndTimeout = setTimeout(() => {
        endLoading();
      }, 3000);
    }

    return () => {
      if (loadEndTimeout) {
        clearTimeout(loadEndTimeout);
      }
    };
  }, [progress.loaded]);

  return (
    <>
      <Clouds />
      <Sticker />
    </>
  );
}
