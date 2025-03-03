import { useControls } from "leva";

export default function Fog() {
  // Leva
  const { fogNear, fogFar } = useControls("Fog", {
    fogNear: 1,
    fogFar: 10,
  });

  return <fog args={["white", fogNear, fogFar]} />;
}
