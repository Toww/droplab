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
  radius = 10,
  cameraControlsRef
}: TCarrouselProps) {
  // Refs
  const projectsGroupRef = useRef<THREE.Group>(null!);

  // Hooks
  const projects = useAppStore((state) => state.projects);

  // Effects
  useEffect(() => {
    cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
      paddingLeft: -4,
      paddingRight: -4
    });
  }, [projectsGroupRef.current]);

  return (
    <ScrollControls
      infinite
      pages={4}
      prepend
      style={{ scrollbarWidth: "none" }}
    >
      <group position={[0, 0, -(radius + 2)]} ref={projectsGroupRef}>
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
