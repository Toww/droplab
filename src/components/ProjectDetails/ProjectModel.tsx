import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { TProject } from "@projects/projectsList";

type TProps = {
  project: TProject;
};

export default function ProjectModel({ project }: TProps) {
  const getCameraPosition = (): [number, number, number] => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1280) {
      return [1, 1, 9];
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      return [1, 0.4, 6];
    } else {
      return [1, 0, 11];
    }
  };

  return (
    <div className="gsap-stagger mt-8 flex h-96 w-full cursor-grab items-center justify-center lg:mt-0 lg:h-full">
      <div className="h-full w-full bg-stone-100">
        <Canvas
          flat
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: getCameraPosition()
          }}
        >
          <OrbitControls />
          <Center>{project.model}</Center>
        </Canvas>
      </div>
    </div>
  );
}
