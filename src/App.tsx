import * as THREE from "three";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Helper } from "@react-three/drei";

function Box(): JSX.Element {
  const { positionX } = useControls("Cube", {
    positionX: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.1,
    },
  });

  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    boxRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={boxRef} position-x={positionX}>
      <boxGeometry />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function App() {
  return (
    <main id="canvas-container">
      <Canvas>
        <Perf position="top-left" showGraph={false} logsPerSecond={5} />
        <OrbitControls />

        <directionalLight position={[1, 2, 3]} intensity={3}>
          <Helper type={THREE.DirectionalLightHelper} />
        </directionalLight>

        <ambientLight intensity={0.2} />

        <Box />
      </Canvas>
    </main>
  );
}

export default App;
