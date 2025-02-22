import { gsap } from "gsap";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

import Lights from "./Lights";
import Sticker from "./Sticker";
import Projects from "./Projects";
import useAppStore from "../stores/useAppStore";

export default function Experience() {
  // Refs
  const floorMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Store variables
  const phase = useAppStore((state) => state.phase);

  // Leva
  // const { fogNear, fogFar } = useControls("Fog", {
  //   fogNear: 1,
  //   fogFar: 10,
  // });

  // GSAP
  useGSAP(
    () => {
      if (phase === "ready") {
        gsap.to(floorMaterialRef.current, { opacity: 1, duration: 2 });
      }
    },
    { dependencies: [phase] }
  );

  return (
    <>
      {/* <fog attach="fog" color="white" near={fogNear} far={fogFar} /> */}
      <OrbitControls />
      <Lights />

      <Sticker />
      <Projects />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          ref={floorMaterialRef}
          color="rgb(209, 209, 209)"
          opacity={0.0}
          transparent
        />
      </mesh>
    </>
  );
}
