import gsap from "gsap";
import * as THREE from "three";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Clouds, Cloud } from "@react-three/drei";
import useAppStore from "../../stores/useAppStore";

export default function CloudsComponent() {
  // Refs
  const cloudRef = useRef<THREE.Group>(null!);
  const cloudsRef = useRef<THREE.Group>(null!);

  // Leva
  const { volume, segments, color, opacity, showClouds, position } =
    useControls("Clouds", {
      showClouds: true,
      volume: 15,
      segments: {
        value: 30,
        min: 1,
        max: 40,
        step: 1
      },
      color: "black",
      opacity: { value: 0.35, min: 0, max: 1, steps: 0.01 },
      position: {
        value: [0, 0, -40]
      },
      scale: {
        value: 1.0,
        min: 0.1,
        max: 4.0,
        step: 0.001
      }
    });

  // Effects
  useEffect(() => {
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      () => {
        gsap.to((cloudsRef.current.children[1] as THREE.Mesh).material, {
          opacity: 0,
          duration: 3
        });
      }
    );

    return () => {
      unsubscribePhase();
    };
  }, []);

  // Frame loop
  useFrame((_, delta) => {
    cloudRef.current.position.z += 7 * delta;
  });

  return showClouds ? (
    <Clouds ref={cloudsRef}>
      <Cloud
        speed={0.2}
        color={color}
        ref={cloudRef}
        volume={volume}
        opacity={opacity}
        bounds={[5, 1, 50]}
        segments={segments}
        position={position}
      />
    </Clouds>
  ) : null;
}
