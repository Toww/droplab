import * as THREE from "three";
import { useControls } from "leva";
import { Helper } from "@react-three/drei";

export default function Lights() {
  const { lightsPosition } = useControls("Lights", {
    lightsPosition: [1, 1, 0],
  });

  return (
    <>
      <directionalLight position={lightsPosition} intensity={3}>
        <Helper type={THREE.DirectionalLightHelper} />
      </directionalLight>

      <ambientLight intensity={0.2} />
    </>
  );
}
