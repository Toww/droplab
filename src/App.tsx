import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Helper } from "@react-three/drei";

function Box(): JSX.Element {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    boxRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function App() {
  return (
    <main id="canvas-container">
      <Canvas>
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
