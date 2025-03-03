import { Ref } from "react";
import * as THREE from "three";

type TProps = {
  ref: Ref<THREE.MeshStandardMaterial>;
};

export default function Floor({ ref }: TProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial ref={ref} color="pink" opacity={0} transparent />
    </mesh>
  );
}
