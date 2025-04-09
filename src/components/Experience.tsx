import { useRef } from "react";
import { CameraControls } from "@react-three/drei";
import CameraControlsSource from "camera-controls";
import Sticker from "./Sticker/Sticker";
import Clouds from "./Clouds";
import Fog from "./Fog";
import Lights from "./Lights";
import Carrousel from "./Carrousel/Carrousel";

export default function Experience() {
  const cameraControlsRef = useRef<CameraControls>(null!);

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        mouseButtons={{
          left: CameraControlsSource.ACTION.NONE,
          right: CameraControlsSource.ACTION.NONE,
          middle: CameraControlsSource.ACTION.NONE,
          wheel: CameraControlsSource.ACTION.NONE,
        }}
      />

      <Lights />

      {/* // Intro */}
      {/* <Sticker /> */}
      {/* <Clouds /> */}
      <Carrousel cameraControlsRef={cameraControlsRef} />

      <Fog near={2} far={25} />
    </>
  );
}
