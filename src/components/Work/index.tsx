import gsap from "gsap";
import { Perf } from "r3f-perf";
import { TouchEvent, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import CameraControlsSource from "camera-controls";
import { clamp } from "@utils/maths";
import Fog from "@components/Work/Fog";
import Intro from "@components/Work/Intro/";
import Lights from "@components/Work/Lights";
import useAppStore from "@stores/useAppStore";
import Carrousel from "@components/Work/Carrousel";
import ProjectTitle from "@components/Work/Carrousel/ProjectTitle";

export default function Work() {
  // Refs
  const lastTouch = useRef<number>(0);
  const touchOffset = useRef<number>(0);
  const cameraControlsRef = useRef<CameraControls>(null!);

  // Hooks
  const phase = useAppStore((state) => state.phase);
  const showPerf = useAppStore((state) => state.showPerf);

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const difference = e.touches[0].clientX - lastTouch.current;

    gsap.to(touchOffset, {
      current: touchOffset.current + clamp(difference, -30, 30) / 20,
      duration: 0.4,
      ease: "none",
      overwrite: true
    });

    lastTouch.current = e.touches[0].clientX;
  };

  return (
    <>
      {/* JSX */}
      <ProjectTitle />

      {/* THREE */}
      <div onTouchMove={handleTouchMove} className="h-screen w-full">
        <Canvas shadows>
          {/* -- Perf -- */}
          {showPerf === true && (
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
            touches={{
              one: CameraControlsSource.ACTION.NONE,
              two: CameraControlsSource.ACTION.NONE,
              three: CameraControlsSource.ACTION.NONE
            }}
          />
          <Fog near={2} far={25} />

          {/* -- Intro -- */}
          {phase !== "ready" && <Intro />}

          {/* -- Projects List -- */}
          <Carrousel
            touchOffset={touchOffset}
            cameraControlsRef={cameraControlsRef}
          />
        </Canvas>
      </div>
    </>
  );
}
