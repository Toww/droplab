import * as THREE from "three";
import { useControls } from "leva";
import { Helper } from "@react-three/drei";

export default function Lights() {
  // Leva
  const { lightsPosition, showHelper } = useControls("Lights", {
    lightsPosition: [1, 1, 6],
    showHelper: true,
  });

  return (
    <>
      <directionalLight
        castShadow
        intensity={3}
        shadow-normalBias={0.3}
        position={lightsPosition}
      >
        {showHelper && (
          <Helper type={THREE.DirectionalLightHelper} args={[1, "red"]} />
        )}
      </directionalLight>

      <ambientLight intensity={0.2} />
    </>
  );
}
