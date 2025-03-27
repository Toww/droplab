import { OrbitControls } from "@react-three/drei";
import Fog from "./Fog";
import Clouds from "./Clouds";
import Lights from "./Lights";
import Sticker from "./Sticker/Sticker";

export default function Experience() {
  return (
    <>
      <OrbitControls />

      <Lights />

      <Sticker />
      <Clouds />

      <Fog near={2} far={25} />
    </>
  );
}
