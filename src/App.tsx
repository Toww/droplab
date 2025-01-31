import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Lights from "./components/Lights";
import Experience from "./components/Experience";

function App() {
  return (
    <main id="canvas-container">
      <Canvas>
        <Perf position="top-left" showGraph={false} logsPerSecond={5} />
        <OrbitControls />
        <Lights />
        <Experience />
      </Canvas>
    </main>
  );
}

export default App;
