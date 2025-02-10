import * as THREE from "three";
import { useControls } from "leva";
import { Helper } from "@react-three/drei";

export default function Lights() {
  // Leva
  const { lightsPosition } = useControls("Lights", {
    lightsPosition: [1, 1, 1],
  });

  return (
    <>
      <directionalLight
        castShadow
        intensity={3}
        shadow-normalBias={0.3}
        position={lightsPosition}
      >
        <Helper type={THREE.DirectionalLightHelper} />
      </directionalLight>

      <ambientLight intensity={0.2} />
    </>
  );
}
