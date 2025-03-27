import { gsap } from "gsap";
import { Perf } from "r3f-perf";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import Debug from "./components/Debug";
import Loader from "./components/Loader";
import Experience from "./components/Experience";

function App() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  // States
  const [showPerf, setShowPerf] = useState<boolean>(true);

  return (
    <>
      <main id="canvas-container">
        <Debug showPerf={showPerf} setShowPerf={setShowPerf} />
        <Canvas shadows>
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
