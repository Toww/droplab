import { useRef } from "react";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import CameraControlsSource from "camera-controls";
import Fog from "@components/Work/Fog";
import Intro from "@components/Work/Intro/";
import Lights from "@components/Work/Lights";
import useAppStore from "@stores/useAppStore";
import Carrousel from "@components/Work/Carrousel";
import ProjectTitle from "@components/Work/Carrousel/ProjectTitle";

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
      <div className="h-screen">
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
          <Intro />

          {/* -- Projects List -- */}
          <Carrousel cameraControlsRef={cameraControlsRef} />
        </Canvas>
      </div>
    </>
  );
}
