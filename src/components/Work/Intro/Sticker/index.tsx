import { gsap } from "gsap";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import StickerMesh from "./StickerMesh";

export default function Sticker() {
  // Ref
  const stickerRef = useRef<THREE.Group>(null!);

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

  // Frame loop
  useFrame((state) => {
    const { pointer, viewport } = state;

    const stickerX = (pointer.x * viewport.width) / 2;
    const stickerY = (pointer.y * viewport.height) / 2;

    gsap.to(stickerRef.current.position, {
      x: stickerX,
      y: stickerY,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true
    });
  });

  return (
    <group ref={stickerRef}>
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
