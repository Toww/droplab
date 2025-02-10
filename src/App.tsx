import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// Components
import Lights from "./components/Lights";
import Experience from "./components/Experience";

function App() {
  return (
    <main id="canvas-container">
      <Canvas camera={{ position: [0, 0, 5] }} shadows>
        <Lights />
        <OrbitControls />
        <Perf position="top-left" showGraph={false} logsPerSecond={5} />

        <Experience />
      </Canvas>
    </main>
  );
}

export default App;
