import { useControls } from "leva";

type TProps = {
  near: number;
  far: number;
};

export default function Fog({ near, far }: TProps) {
  // Leva
  const { fogNear, fogFar, showFog } = useControls("Fog", {
    showFog: true,
    fogNear: near,
    fogFar: far,
  });

  return showFog ? (
    <fog attach="fog" args={["white", fogNear, fogFar]} />
  ) : null;
}
