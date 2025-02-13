import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, CameraControls } from "@react-three/drei";

import Lights from "./components/Lights";
import Loader from "./components/Loader";
import useAppStore from "./stores/useAppStore";
import Experience from "./components/Experience";

function App() {
  // Refs
  const cameraControlsRef = useRef<CameraControls>(null);

  // App phase subscription
  useEffect(() => {
    const unsubAppStore = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          cameraControlsRef.current?.setPosition(0, 0, 5, true);
        }
      }
    );

    return () => {
      unsubAppStore();
    };
  }, []);

  return (
    <main id="canvas-container">
      <Canvas camera={{ position: [0, 5, 0] }} shadows>
        <CameraControls ref={cameraControlsRef} />
        <Lights />
        <OrbitControls />
        <Perf position="top-left" showGraph={false} logsPerSecond={5} />

        <Experience />
      </Canvas>
      <Loader />
    </main>
  );
}

export default App;
