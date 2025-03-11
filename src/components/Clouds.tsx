import { Cloud } from "@react-three/drei";
import { useControls } from "leva";

export default function Clouds() {
  const { volume, segments, color, opacity, showClouds } = useControls(
    "Clouds",
    {
      showClouds: false,
      volume: 40,
      segments: 3,
      color: "black",
      opacity: { value: 0.8, min: 0, max: 1 },
    }
  );

  return showClouds ? (
    <Cloud
      color={color}
      volume={volume}
      opacity={opacity}
      bounds={[5, 5, 3]}
      segments={segments}
      concentrate="inside"
      position={[-5, 0, -9]}
    />
  ) : null;
}
