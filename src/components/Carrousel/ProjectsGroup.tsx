import * as THREE from "three";
import { RefObject } from "react";
import Card from "./Card";
import useAppStore from "../../stores/useAppStore";

type TProjectsGroupProps = {
  radius: number;
  projectsGroupRef: RefObject<THREE.Group>;
};

export default function ProjectsGroup({
  radius,
  projectsGroupRef,
}: TProjectsGroupProps) {
  const projects = useAppStore((state) => state.projects);

  return (
    <group position={[0, 0, -(radius + 2)]} ref={projectsGroupRef}>
      {projects.map((project, index) => (
        <Card
          key={`img-${index}`}
          index={index}
          radius={radius}
          side={THREE.DoubleSide}
          projectsLength={projects.length}
          projectsGroupRef={projectsGroupRef}
          url={`./carrousel/${project.filename}.jpg`}
        />
      ))}
    </group>
  );
}
