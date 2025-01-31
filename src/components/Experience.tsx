import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
  // Refs
  const cubeRef = useRef<THREE.Mesh>(null);

  // Hooks
  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}
