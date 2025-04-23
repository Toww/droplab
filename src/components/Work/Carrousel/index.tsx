import * as THREE from "three";
import { useRef, useEffect, RefObject } from "react";
import { ScrollControls, CameraControls } from "@react-three/drei";
import Card from "./Card";
import useAppStore from "@stores/useAppStore";

type TCarrouselProps = {
  radius?: number;
  cameraControlsRef: RefObject<CameraControls>;
};

export default function Carrousel({
  radius = 8,
  cameraControlsRef
}: TCarrouselProps) {
  // Refs
  const projectsGroupRef = useRef<THREE.Group>(null!);

  // Hooks
  const projects = useAppStore((state) => state.projects);

  // Effects
  useEffect(() => {
    // Make te progress bar disappear after load
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          cameraControlsRef.current.smoothTime = 0.3;
          cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
            paddingLeft: -4,
            paddingRight: -4
          });
        }
      }
    );

    return () => {
      unsubscribePhase();
    };
  }, []);

  return (
    <ScrollControls
      prepend
      infinite
      pages={4}
      style={{ scrollbarWidth: "none" }}
    >
      <group position={[0, 0, -50]} ref={projectsGroupRef}>
        {projects.map((project, index) => (
          <Card
            key={`img-${index}`}
            index={index}
            radius={radius}
            side={THREE.DoubleSide}
            projectsLength={projects.length}
            projectsGroupRef={projectsGroupRef}
            url={`./images/${project.id}/thumbnail.jpg`}
          />
        ))}
      </group>
    </ScrollControls>
  );
}
