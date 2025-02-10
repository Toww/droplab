import Sticker from "./Sticker";

export default function Experience() {
  return (
    <>
      <Sticker />

      {/* Floor */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow position={[0, -2, 0]}>
        <boxGeometry args={[10, 10, 0.5]} />
        <meshStandardMaterial color="yellowgreen" />
      </mesh>
    </>
  );
}
