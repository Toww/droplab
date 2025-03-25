import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useEffect, useState, useRef, RefObject } from "react";
import useAppStore from "../stores/useAppStore";

type TProps = {
  stickerRef: RefObject<THREE.Group>;
  projectsRef: RefObject<THREE.Group>;
};

export default function Camera({ stickerRef, projectsRef }: TProps) {
  // Refs
  const cameraControlsRef = useRef<CameraControls>(null!);

  // States
  const [focusProjects, setFocusProjects] = useState(false);

  // Effects
  useEffect(() => {
    if (phase === "ready" && focusProjects) {
      cameraControlsRef.current.fitToBox(projectsRef.current, true, {
        paddingTop: 1,
        paddingRight: 1,
        paddingBottom: 1,
        paddingLeft: 1,
      });
    }
  }, [focusProjects]);

  // Store
  const { phase } = useAppStore();

  // Animation
  useFrame(() => {
    const stickerPosition = stickerRef.current.position;

    if (phase === "ready" && !focusProjects) {
      const cameraPosition = new THREE.Vector3(
        stickerPosition.x,
        stickerPosition.y,
        stickerPosition.z + 5
      );

      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        stickerPosition.x,
        stickerPosition.y,
        stickerPosition.z,
        true
      );
    }

    if (stickerPosition.z < -50 && !focusProjects) {
      setFocusProjects(true);
    }
  });

  return <CameraControls ref={cameraControlsRef} />;
}
