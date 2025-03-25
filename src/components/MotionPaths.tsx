import gsap from "gsap";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useControls, button } from "leva";
import { useRef, RefObject } from "react";
import { MotionPathRef, MotionPathControls } from "@react-three/drei";
import useAppStore from "../stores/useAppStore";

type TProps = {
  stickerRef: RefObject<THREE.Group>;
};

export default function MotionPaths({ stickerRef }: TProps) {
  // Ref
  const tl = useRef<GSAPTimeline>(null);
  const stickerMotionPathRef = useRef<MotionPathRef>(null!);

  // States
  const phase = useAppStore((state) => state.phase);

  // GSAP
  const { contextSafe } = useGSAP(
    () => {
      if (phase === "ready") {
        tl.current = gsap.timeline().to(stickerMotionPathRef.current.motion, {
          duration: 10,
          current: 1,
          onUpdate: ({ current }) => {
            console.log(current);
          },
        });
      }
    },
    { dependencies: [phase] }
  );

  const motionReset = contextSafe(() => {
    tl.current && tl.current.restart();
  });

  // Leva buttons
  // TODO - Reset camera position with it
  useControls("Sticker", {
    resetTravel: button(motionReset),
  });

  // Curves
  const stickerCurve = [
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-30, 10, -20),
      new THREE.Vector3(20, -10, -40),
      new THREE.Vector3(-5, 5, -80)
    ),
  ];

  return (
    <MotionPathControls
      debug
      damping={0}
      loop={false}
      object={stickerRef}
      curves={stickerCurve}
      ref={stickerMotionPathRef}
    />
  );
}
