import gsap from "gsap";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useControls, button } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef, RefObject, useState } from "react";
import { MotionPathRef, MotionPathControls } from "@react-three/drei";
import useAppStore from "../stores/useAppStore";

type TProps = {
  stickerRef: RefObject<THREE.Group>;
  projectsRef: RefObject<THREE.Group>;
};

export default function MotionPaths({ stickerRef, projectsRef }: TProps) {
  // Ref
  const tl = useRef<GSAPTimeline>(null);
  const cameraDebugBoxRef = useRef<THREE.Mesh>(null!);
  const cameraMotionPathRef = useRef<MotionPathRef>(null!);
  const stickerMotionPathRef = useRef<MotionPathRef>(null!);

  // States
  const phase = useAppStore((state) => state.phase);
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  // Leva
  const { cameraView } = useControls("Motion", {
    cameraView: true,
    cameraCurrent: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (newValue) => {
        cameraMotionPathRef.current.motion.current = newValue;
      },
    },
  });

  // GSAP
  const { contextSafe } = useGSAP(
    () => {
      if (phase === "ready") {
        tl.current = gsap
          .timeline()
          .to(stickerMotionPathRef.current.motion, {
            duration: 5,
            current: 1,
          })
          .to(
            cameraMotionPathRef.current.motion,
            {
              duration: 5,
              current: 1,
            },
            "<"
          );
      }
    },
    { dependencies: [phase, cameraView, cameraMotionPathRef] }
  );

  const motionReset = contextSafe(() => {
    tl.current && tl.current.restart();
  });

  // Leva buttons
  useControls("Motion", {
    reset: button(motionReset),
  });

  // Curves
  const stickerCurve = [
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-30, 10, -10),
      new THREE.Vector3(20, -10, -20),
      new THREE.Vector3(-30, 5, -30)
    ),
  ];

  const cameraCurve = [
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, 5),
      new THREE.Vector3(-25, 10, -5),
      new THREE.Vector3(15, 0, -20),
      new THREE.Vector3(-10, 0, -15)
    ),
  ];

  // Animation
  const cameraMotion = cameraMotionPathRef?.current?.motion || null;

  useFrame((state) => {
    console.log(smoothedCameraTarget);

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(projectsRef.current.position);

    console.log(smoothedCameraTarget);

    if (
      phase === "ready" &&
      cameraMotion?.current &&
      cameraMotion.current > 0.8
    ) {
      state.camera.lookAt(projectsRef.current.position);
    } else {
      state.camera.lookAt(stickerRef.current.position);
    }
  });

  return (
    <>
      <mesh ref={cameraDebugBoxRef}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color="purple" />
      </mesh>

      <MotionPathControls
        debug
        damping={0.5}
        loop={false}
        object={stickerRef}
        curves={stickerCurve}
        ref={stickerMotionPathRef}
      />

      <MotionPathControls
        debug
        damping={0.5}
        focusDamping={0.5}
        loop={false}
        object={cameraView ? undefined : cameraDebugBoxRef}
        focus={stickerRef}
        curves={cameraCurve}
        ref={cameraMotionPathRef}
      />
    </>
  );
}
