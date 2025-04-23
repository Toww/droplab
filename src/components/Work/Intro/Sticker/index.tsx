import * as THREE from "three";
import { RefObject } from "react";
import { useControls } from "leva";
import { Float } from "@react-three/drei";
import StickerMesh from "./StickerMesh";

type TProps = {
  ref: RefObject<THREE.Group>;
};

export default function Sticker({ ref }: TProps) {
  // Leva
  const { floatSpeed, floatRotationIntensity, floatingRange } = useControls(
    "Sticker",
    {
      floatSpeed: {
        value: 8,
        min: 0,
        max: 15,
        step: 0.01
      },
      floatRotationIntensity: {
        value: 7,
        min: 0,
        max: 25,
        step: 0.01
      },
      floatingRange: [-0.7, 0.7]
    }
  );

  return (
    <group ref={ref} position={[0, 0, -2]}>
      <Float
        floatIntensity={1}
        speed={floatSpeed}
        floatingRange={floatingRange}
        rotationIntensity={floatRotationIntensity}
      >
        <StickerMesh />
      </Float>
    </group>
  );
}
