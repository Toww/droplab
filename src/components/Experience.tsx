import { useRef, useState, useEffect } from "react";
import { OrbitControls, CameraControls, Float } from "@react-three/drei";

import Lights from "./Lights";
import Sticker from "./Sticker";
import Projects from "./Projects";
import useAppStore from "../stores/useAppStore";

export default function Experience() {
  // Refs
  const cameraControlsRef = useRef<CameraControls>(null);

  // State
  const [isFloating, setIsFloating] = useState<boolean>(false);

  // Store variables
  const cameraPosition = useAppStore((state) => state.cameraPosition);

  // Effects
  useEffect(() => {
    const unsubAppStore = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          const { x, y, z } = cameraPosition.loadingEnd;
          cameraControlsRef.current?.setPosition(x, y, z, true);

          setIsFloating(true);
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
      <Float
        rotationIntensity={25}
        speed={isFloating ? 5 : 0}
        floatingRange={[-1.5, 1.5]}
      >
        <Sticker />
      </Float>
      <Projects />
    </>
  );
}
