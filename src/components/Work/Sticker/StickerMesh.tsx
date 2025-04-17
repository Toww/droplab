import { gsap } from "gsap";
import { memo } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import stickerVertexShader from "@shaders/sticker/vertex.glsl";
import stickerFragmentShader from "@shaders/sticker/fragment.glsl";

const StickerMesh = memo(() => {
  // Leva
  const { uLoadingProgress, uWobbleFactor } = useControls("Sticker", {
    uLoadingProgress: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.001
    },
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
    uLoadingProgress: new THREE.Uniform(uLoadingProgress)
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
  useFrame((state) => {
    const { clock } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    // -----
    // TODO - Implement real loading progress
    // -----
    uniforms.uLoadingProgress.value += 0.002;
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
