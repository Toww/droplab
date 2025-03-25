import Fog from "./Fog";
import Clouds from "./Clouds";
import Lights from "./Lights";
import * as THREE from "three";
import Sticker from "./Sticker";
import { RefObject } from "react";
import { OrbitControls } from "@react-three/drei";

type TProps = {
  stickerRef: RefObject<THREE.Group>;
};

export default function Experience({ stickerRef }: TProps) {
  return (
    <>
      <OrbitControls />

      <Lights />

      <Clouds />
      <Fog near={2} far={25} />

      <Sticker ref={stickerRef} />
    </>
  );
}
