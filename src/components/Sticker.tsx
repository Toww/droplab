import { gsap } from "gsap";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, RefObject } from "react";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import stickerVertexShader from "../shaders/sticker/vertex.glsl";
import stickerFragmentShader from "../shaders/sticker/fragment.glsl";

type TProps = {
  ref: RefObject<THREE.Group>;
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
    // CustomShaderMaterial props
    baseMaterial: THREE.MeshStandardMaterial,
    // MeshStandardMaterial props
    map: headTexture,
    uniforms: uniforms,
    side: THREE.DoubleSide,
    vertexShader: stickerVertexShader,
    fragmentShader: stickerFragmentShader,
  });

  const stickerDepthMaterial = new CustomShaderMaterial({
    // CustomShaderMaterial props
    baseMaterial: THREE.MeshDepthMaterial,
    // MeshDepthMaterial props
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
      material={stickerMaterial}
      customDepthMaterial={stickerDepthMaterial}
    >
      <circleGeometry args={[0.7, 64]} />
    </mesh>
  );
});

export default function Sticker({ ref: stickerRef }: TProps) {
  // Leva
  const { floatSpeed, floatRotationIntensity, floatingRange } = useControls(
    "Sticker",
    {
      floatSpeed: {
        value: 8,
        min: 0,
        max: 15,
        step: 0.01,
      },
      floatRotationIntensity: {
        value: 7,
        min: 0,
        max: 25,
        step: 0.01,
      },
      floatingRange: [-0.7, 0.7],
    },
  );

  // Mouse movement
  useFrame((state) => {
    const { pointer, viewport } = state;

    const stickerX = (pointer.x * viewport.width) / 2;
    const stickerY = (pointer.y * viewport.height) / 2;

    gsap.to(stickerRef.current.position, {
      x: stickerX,
      y: stickerY,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
  });

  return (
    <group ref={stickerRef}>
      <Float
        floatIntensity={1}
        rotationIntensity={floatRotationIntensity}
        floatingRange={floatingRange}
        speed={floatSpeed}
      >
        <StickerMesh />
      </Float>
    </group>
  );
}
