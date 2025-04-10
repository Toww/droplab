import { gsap } from "gsap";
import * as THREE from "three";
import { useControls } from "leva";
import { Float } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import StickerMesh from "./StickerMesh";
import useAppStore from "../../../stores/useAppStore";

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

  // Effects
  useEffect(() => {
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          gsap.to(stickerRef.current.position, {
            x: -8,
            y: -4,
            z: 10,
            duration: 3,
            ease: "power2.in"
          });
        }
      }
    );

    return () => {
      unsubscribePhase();
    };
  }, []);

  // Frame loop
  useFrame((state) => {
    const phase = useAppStore.getState().phase;

    const { pointer, viewport } = state;

    const stickerX = (pointer.x * viewport.width) / 2;
    const stickerY = (pointer.y * viewport.height) / 2;

    if (phase === "loading") {
      gsap.to(stickerRef.current.position, {
        x: stickerX,
        y: stickerY,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true
      });
    }
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
