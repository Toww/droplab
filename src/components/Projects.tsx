import { Ref } from "react";
import * as THREE from "three";
import { Group } from "three/examples/jsm/libs/tween.module.js";

type TProps = {
  ref: Ref<THREE.Group>;
};

export default function Projects({ ref }: TProps) {
  return (
    <group ref={ref} position={[0, 0, -50]}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="pink" />
      </mesh>
    </group>
  );
}
