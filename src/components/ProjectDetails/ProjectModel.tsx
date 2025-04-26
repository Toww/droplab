import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { TProject } from "@projects/projectsList";

type TProps = {
  project: TProject;
};

export default function ProjectModel({ project }: TProps) {
  return (
    <div className="gsap-stagger flex h-full w-full cursor-grab items-center justify-center">
      <div className="h-full w-full bg-stone-100">
        <Canvas
          flat
          camera={{ fov: 45, near: 0.1, far: 200, position: [1, 1, 9] }}
        >
          <OrbitControls />
          <Center>{project.model}</Center>
        </Canvas>
      </div>
    </div>
  );
}
