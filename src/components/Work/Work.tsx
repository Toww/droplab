import { useRef } from "react";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import CameraControlsSource from "camera-controls";
import Fog from "./Fog";
import Lights from "./Lights";
import Clouds from "./Clouds";
import Sticker from "./Sticker/Sticker";
import ProjectTitle from "./Carrousel/ProjectTitle";
import Carrousel from "./Carrousel/Carrousel";
import useAppStore from "../../stores/useAppStore";

export default function Work() {
  // Refs
  const cameraControlsRef = useRef<CameraControls>(null!);

  // Hooks
  const showPerf = useAppStore((state) => state.showPerf);

  return (
    <>
      {/* JSX */}
      <ProjectTitle />

      {/* THREE */}
      <Canvas shadows>
        {/* -- Perf -- */}
        {showPerf && (
          <Perf position="top-left" showGraph={false} logsPerSecond={5} />
        )}

        {/* -- Scene Setup -- */}
        <Lights />
        <CameraControls
          ref={cameraControlsRef}
          mouseButtons={{
            left: CameraControlsSource.ACTION.NONE,
            right: CameraControlsSource.ACTION.NONE,
            middle: CameraControlsSource.ACTION.NONE,
            wheel: CameraControlsSource.ACTION.NONE
          }}
        />
        <Fog near={2} far={25} />

        {/* -- Intro -- */}
        {/* <Sticker /> */}
        {/* <Clouds /> */}

        {/* -- Projects List -- */}
        <Carrousel cameraControlsRef={cameraControlsRef} />
      </Canvas>
    </>
  );
}
