import * as THREE from "three";
import { useControls } from "leva";
import { useRef, RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Clouds, Cloud } from "@react-three/drei";

type TProps = {
  ref: RefObject<THREE.Group>;
};

export default function CloudsComponent({ ref }: TProps) {
  // Refs
  const cloudRef = useRef<THREE.Group>(null!);

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

  // Frame loop
  useFrame((_, delta) => {
    cloudRef.current.position.z += delta * 7;
  });

  return showClouds ? (
    <Clouds ref={ref}>
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
