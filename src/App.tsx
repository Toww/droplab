import { Perf } from "r3f-perf";
import { Leva, useControls } from "leva";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import Loader from "./components/Loader";
import useAppStore from "./stores/useAppStore";
import Experience from "./components/Experience";

function App() {
  // Leva
  const { showPerf } = useControls("Perf", { showPerf: true });

  // Store variables
  const cameraPosition = useAppStore((state) => state.cameraPosition);

  // States
  const [showDebug, setShowDebug] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    const hasDebugHash = window.location.hash === "#debug";

    hasDebugHash ? setShowDebug(true) : setShowDebug(false);
  }, [window.location.hash]);

  return (
    <>
      <main id="canvas-container">
        <Leva hidden={!showDebug} />
        <Canvas camera={{ position: cameraPosition.initial }} shadows>
          {showDebug && showPerf && (
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
