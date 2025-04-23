import { gsap } from "gsap";
import { memo } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import useAppStore from "@stores/useAppStore";
import stickerVertexShader from "@shaders/sticker/vertex.glsl";
import stickerFragmentShader from "@shaders/sticker/fragment.glsl";

const StickerMesh = memo(() => {
  // Leva
  const { uWobbleFactor } = useControls("Sticker", {
    uWobbleFactor: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.001
    }
  });

  // GSAP
  useGSAP(() => {
    gsap.to(headTexture.offset, {
      x: 11 / 12,
      duration: 0.75,
      ease: "steps(11)",
      repeat: -1
    });
  });

  // Hooks
  const introLength = useAppStore((state) => state.introLength);
  const introStartTime = useAppStore((state) => state.introStartTime);

  // Getters
  const getTimerProgress = (introLength: number, introStartTime: number) => {
    return (new Date().getTime() - introStartTime) / introLength;
  };

  // Textures
  const textureLoader = new THREE.TextureLoader();
  const headTexture = textureLoader.load("./head-spritesheet.png");
  headTexture.colorSpace = THREE.SRGBColorSpace;
  headTexture.minFilter = THREE.NearestFilter;
  headTexture.repeat.set(1 / 12, 1);

  // Uniforms
  const uniforms = {
    uTime: new THREE.Uniform(0),
    uWobbleFactor: new THREE.Uniform(uWobbleFactor),
    uTimerProgress: new THREE.Uniform(
      getTimerProgress(introLength, introStartTime)
    )
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
    fragmentShader: stickerFragmentShader
  });

  const stickerDepthMaterial = new CustomShaderMaterial({
    // CustomShaderMaterial props
    baseMaterial: THREE.MeshDepthMaterial,
    // MeshDepthMaterial props
    uniforms: uniforms,
    vertexShader: stickerVertexShader,
    depthPacking: THREE.RGBADepthPacking
  });

  // Frame loop
  useFrame((_, delta) => {
    // Updating uTime
    uniforms.uTime.value += delta;

    // Updating material's uTimerProgress
    stickerMaterial.uniforms.uTimerProgress.value = getTimerProgress(
      introLength,
      introStartTime
    );
  });

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

export default StickerMesh;
