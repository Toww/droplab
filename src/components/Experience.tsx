import * as THREE from "three";
import { useRef, RefObject } from "react";
import Fog from "./Fog";
import Clouds from "./Clouds";
import Camera from "./Camera";
import Lights from "./Lights";
import Sticker from "./Sticker";
import Projects from "./Projects";
import MotionPaths from "./MotionPaths";

type TProps = {
  stickerRef: RefObject<THREE.Group>;
};

export default function Experience({ stickerRef }: TProps) {
  // Refsch
  const projectsRef = useRef<THREE.Group>(null!);

  return (
    <>
      <Lights />

      <Clouds />
      <Fog near={2} far={25} />

      <Camera stickerRef={stickerRef} projectsRef={projectsRef} />
      <MotionPaths stickerRef={stickerRef} />

      <Sticker ref={stickerRef} />
      <Projects ref={projectsRef} />
    </>
  );
}
