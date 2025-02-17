import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";

import Loader from "./components/Loader";
import Debug from "./components/Debug";
import useAppStore from "./stores/useAppStore";
import Experience from "./components/Experience";

function App() {
  // Leva
  const { showPerf } = useControls("Perf", { showPerf: true });

  // Store variables
  const cameraPosition = useAppStore((state) => state.cameraPosition);

  return (
    <>
      <main id="canvas-container">
        <Debug />
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
