import * as THREE from "three";
import { useRef, useEffect, RefObject } from "react";
import { ScrollControls, CameraControls } from "@react-three/drei";
import ProjectsGroup from "./ProjectsGroup";

type TCarrouselProps = {
  radius?: number;
  cameraControlsRef: RefObject<CameraControls>;
};

export default function Carrousel({
  radius = 10,
  cameraControlsRef,
}: TCarrouselProps) {
  // Refs
  const projectsGroupRef = useRef<THREE.Group>(null!);

  // Effects
  useEffect(() => {
    cameraControlsRef.current.fitToBox(projectsGroupRef.current, true, {
      paddingLeft: -4,
      paddingRight: -4,
    });
  }, [projectsGroupRef.current]);

  return (
    <ScrollControls
      infinite
      pages={4}
      prepend
      style={{ scrollbarWidth: "none" }}
    >
      <ProjectsGroup radius={radius} projectsGroupRef={projectsGroupRef} />
    </ScrollControls>
  );
}
