import { gsap } from "gsap";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useState, useEffect, Ref } from "react";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import useAppStore from "../stores/useAppStore";
import stickerVertexShader from "../shaders/sticker/vertex.glsl";
import stickerFragmentShader from "../shaders/sticker/fragment.glsl";

type TProps = {
  ref: Ref<THREE.Group>;
};

const StickerMesh = memo(() => {
  // Leva
  const { uLoadingProgress, uWobbleFactor } = useControls("Sticker", {
    uLoadingProgress: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    uWobbleFactor: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.001,
    },
  });

  // Textures
  const textureLoader = new THREE.TextureLoader();
  const headTexture = textureLoader.load("./head-spritesheet.png");
  headTexture.colorSpace = THREE.SRGBColorSpace;
  headTexture.minFilter = THREE.NearestFilter;
  headTexture.repeat.set(1 / 12, 1);

  // Head animation
  useGSAP(() => {
    gsap.to(headTexture.offset, {
      x: 11 / 12,
      duration: 0.75,
      ease: "steps(11)",
      repeat: -1,
    });
  });

  // Uniforms
  const uniforms = {
    uTime: new THREE.Uniform(0),
    uWobbleFactor: new THREE.Uniform(uWobbleFactor),
    uLoadingProgress: new THREE.Uniform(uLoadingProgress),
  };

  // Materials
  const stickerMaterial = new CustomShaderMaterial({
    // CustomShaderMaterial
    baseMaterial: THREE.MeshStandardMaterial,
    // MeshStandardMaterial
    map: headTexture,
    uniforms: uniforms,
    side: THREE.DoubleSide,
    vertexShader: stickerVertexShader,
    fragmentShader: stickerFragmentShader,
  });

  const stickerDepthMaterial = new CustomShaderMaterial({
    // CustomShaderMaterial
    baseMaterial: THREE.MeshDepthMaterial,
    // MeshDepthMaterial
    uniforms: uniforms,
    vertexShader: stickerVertexShader,
    depthPacking: THREE.RGBADepthPacking,
  });

  // Animation
  useFrame((state) => {
    const { clock } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    // -----
    // TODO - Implement real loading progress
    // -----
    uniforms.uLoadingProgress.value += 0.002;
  });

  // -----
  // TODO  Soften Sticker Floating start animation
  // -----

  return (
    <mesh
      castShadow
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      material={stickerMaterial}
      customDepthMaterial={stickerDepthMaterial}
    >
      <circleGeometry args={[1, 64]} />
    </mesh>
  );
});

export default function Sticker({ ref }: TProps) {
  // States
  const [isFloating, setIsFloating] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    const unsubAppStore = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          setIsFloating(true);
        }
      }
    );

    return () => {
      unsubAppStore();
    };
  });

  return (
    <group ref={ref}>
      <Float
        floatIntensity={1}
        rotationIntensity={15}
        floatingRange={[-1, 1]}
        speed={isFloating ? 10 : 0}
      >
        <StickerMesh />
      </Float>
    </group>
  );
}
