import { useRef, useEffect } from "react";
import { OrbitControls, CameraControls } from "@react-three/drei";

import Lights from "./Lights";
import Sticker from "./Sticker";
import useAppStore from "../stores/useAppStore";

export default function Experience() {
  // Refs
  const cameraControlsRef = useRef<CameraControls>(null);

  // Effects
  useEffect(() => {
    const unsubAppStore = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          cameraControlsRef.current?.setPosition(0, 0, 5, true);
        }
      }
    );

    return () => {
      unsubAppStore();
    };
  }, []);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <OrbitControls />
      <Lights />
      <Sticker />
    </>
  );
}
