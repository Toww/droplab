import * as THREE from "three";
import { useControls } from "leva";
import { useRef, useEffect } from "react";
import { OrbitControls, CameraControls } from "@react-three/drei";

import Lights from "./Lights";
import Sticker from "./Sticker";
import Projects from "./Projects";
import useAppStore from "../stores/useAppStore";

export default function Experience() {
  // Refs
  const cameraControlsRef = useRef<CameraControls>(null);
  const stickerRef = useRef<THREE.Mesh>(null!);

  // Store variables
  const cameraPosition = useAppStore((state) => state.cameraPosition);

  // Leva
  const { fogNear, fogFar } = useControls("Fog", {
    fogNear: 1,
    fogFar: 10,
  });

  // Effects
  useEffect(() => {
    const unsubAppStore = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          const { x, y, z } = cameraPosition.loadingEnd;
          cameraControlsRef.current?.setPosition(x, y, z, true);
        }
      }
    );

    return () => {
      unsubAppStore();
    };
  }, []);

  return (
    <>
      <fog attach="fog" color="white" near={fogNear} far={fogFar} />
      <CameraControls ref={cameraControlsRef} />
      <OrbitControls />
      <Lights />

      <Sticker ref={stickerRef} />
      <Projects />

      {/* ----- Setup ------ */}
      {/* Clouds */}
      {/* <Cloud opacity={0.2} color="black" bounds={[5, 5, 1]} position={[0, 0, -1]} /> */}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="rgb(209, 209, 209)" />
      </mesh>
    </>
  );
}
