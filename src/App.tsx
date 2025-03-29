import { gsap } from "gsap";
import { Perf } from "r3f-perf";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import Debug from "./components/Debug";
import Loader from "./components/Loader";
import Layout from "./components/Layout";
import Experience from "./components/Experience";

function App() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  // States
  const [showPerf, setShowPerf] = useState<boolean>(false);

  return (
    <>
      <main id="main-container">
        {/* Debug */}
        <Debug showPerf={showPerf} setShowPerf={setShowPerf} />

        <Loader />

        <Layout />
        <Canvas shadows>
          {showPerf && (
            <Perf position="top-left" showGraph={false} logsPerSecond={5} />
          )}
          <Experience />
        </Canvas>
      </main>
    </>
  );
}

export default App;
