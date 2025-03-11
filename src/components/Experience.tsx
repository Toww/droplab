import * as THREE from "three";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import Fog from "./Fog";
import Clouds from "./Clouds";
import Lights from "./Lights";
import Sticker from "./Sticker";
import Projects from "./Projects";
import MotionPaths from "./MotionPaths";

export default function Experience() {
  // Refsch
  const stickerRef = useRef<THREE.Group>(null!);
  const projectsRef = useRef<THREE.Group>(null!);

  return (
    <>
      <OrbitControls />
      <Lights />

      <Clouds />
      <Fog near={2} far={25} />

      <MotionPaths stickerRef={stickerRef} projectsRef={projectsRef} />

      <Sticker ref={stickerRef} />
      <Projects ref={projectsRef} />
    </>
  );
}
