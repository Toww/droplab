import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// Components
import Lights from "./components/Lights";
import Loader from "./components/Loader";
import Experience from "./components/Experience";

function App() {
  return (
    <main id="canvas-container">
      <Canvas camera={{ position: [0, 5, 0] }} shadows>
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
