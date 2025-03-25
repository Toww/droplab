import { gsap } from "gsap";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Debug from "./components/Debug";
import Loader from "./components/Loader";
import Experience from "./components/Experience";

function App() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  // States
  const [showPerf, setShowPerf] = useState<boolean>(false);

  // Refs
  const stickerRef = useRef<THREE.Group>(null!);

  // Store variables
  return (
    <>
      <main id="canvas-container">
        <Debug setShowPerf={setShowPerf} />
        <Canvas shadows camera={{ position: [0, 5, 0] }}>
          {showPerf && (
            <Perf position="top-left" showGraph={false} logsPerSecond={5} />
          )}
          <Experience stickerRef={stickerRef} />
        </Canvas>
        <Loader />
      </main>
    </>
  );
}

export default App;
