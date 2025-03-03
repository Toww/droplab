import * as THREE from "three";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import Fog from "./Fog";
import Floor from "./Floor";
import Lights from "./Lights";
import Sticker from "./Sticker";
import Projects from "./Projects";

export default function Experience() {
  // Refs
  const floorMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  return (
    <>
      <OrbitControls />
      <Lights />
      {/* <Fog /> */}

      <Sticker />
      <Projects />

      <Floor ref={floorMaterialRef} />
    </>
  );
}
