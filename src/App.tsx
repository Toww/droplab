import { gsap } from "gsap";
import { Perf } from "r3f-perf";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import Debug from "./components/Debug";
import Loader from "./components/Loader";
import useAppStore from "./stores/useAppStore";
import Experience from "./components/Experience";

function App() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  // States
  const [showPerf, setShowPerf] = useState<boolean>(false);

  // Store variables
  const cameraPosition = useAppStore((state) => state.cameraPosition);

  return (
    <>
      <main id="canvas-container">
        <Debug setShowPerf={setShowPerf} />
        <Canvas camera={{ position: cameraPosition.initial }} shadows>
          {showPerf && (
            <Perf position="top-left" showGraph={false} logsPerSecond={5} />
          )}
          <Experience />
        </Canvas>
        <Loader />
      </main>
    </>
  );
}

export default App;
