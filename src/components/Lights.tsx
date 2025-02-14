import * as THREE from "three";
import { useControls } from "leva";
import { Helper } from "@react-three/drei";

export default function Lights() {
  // Leva
  const { lightsPosition, showHelper } = useControls("Lights", {
    lightsPosition: [0, 3, 0],
    showHelper: false,
  });

  return (
    <>
      <directionalLight
        castShadow
        intensity={3}
        shadow-normalBias={0.3}
        position={lightsPosition}
      >
        {showHelper && <Helper type={THREE.DirectionalLightHelper} />}
      </directionalLight>

      <ambientLight intensity={0.2} />
    </>
  );
}
