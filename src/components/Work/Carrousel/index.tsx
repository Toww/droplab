import * as THREE from "three";
import { useRef, useEffect, RefObject } from "react";
import { ScrollControls, CameraControls } from "@react-three/drei";
import Card from "./Card";
import useAppStore from "@stores/useAppStore";

type TCarrouselProps = {
  radius?: number;
  touchOffset: RefObject<number>;
  cameraControlsRef: RefObject<CameraControls>;
};

export default function Carrousel({
  radius = 8,
  touchOffset,
  cameraControlsRef
}: TCarrouselProps) {
  // Refs
  const projectsGroupRef = useRef<THREE.Group>(null!);

  // Hooks
  const phase = useAppStore((state) => state.phase);
  const projects = useAppStore((state) => state.projects);

  // Handlers
  const handleCameraControls = () => {
    const windowSize = window.innerWidth;
    cameraControlsRef.current.smoothTime = 0.3;

    if (windowSize > 1280) {
      cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
        paddingLeft: 6,
        paddingRight: 6
      });
    } else if (windowSize > 1024) {
      cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
        paddingLeft: 2,
        paddingRight: 2
      });
    } else if (windowSize > 768) {
      cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
        paddingLeft: -1,
        paddingRight: -1
      });
    } else {
      cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
        paddingLeft: -4,
        paddingRight: -4
      });
    }
  };

  // Effects
  useEffect(() => {
    // When component is loaded
    if (phase === "ready") {
      handleCameraControls();
    }

    // On phase change
    let unsubscribePhase = null;
    if (location.pathname === "/") {
      unsubscribePhase = useAppStore.subscribe(
        (state) => state.phase,
        (currentPhase) => {
          if (currentPhase === "ready") {
            handleCameraControls();
          }
        }
      );
    }

    return () => {
      if (unsubscribePhase) {
        unsubscribePhase();
      }
    };
  }, []);

  return (
    <ScrollControls infinite pages={4} style={{ scrollbarWidth: "none" }}>
      <group position={[0, 0, -50]} ref={projectsGroupRef}>
        {projects.map((project, index) => (
          <Card
            key={`img-${index}`}
            index={index}
            radius={radius}
            side={THREE.DoubleSide}
            touchOffset={touchOffset}
            projectsLength={projects.length}
            projectsGroupRef={projectsGroupRef}
            url={`/images/${project.id}/thumbnail.jpg`}
          />
        ))}
      </group>
    </ScrollControls>
  );
}
