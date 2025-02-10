import gsap from "gsap";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
// Shaders
import stickerVertexShader from "../shaders/sticker/vertex.glsl";
import stickerFragmentShader from "../shaders/sticker/fragment.glsl";

export default function Sticker() {
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

  // GSAP
  gsap.to(headTexture.offset, {
    x: 11 / 12,
    duration: 0.75,
    ease: "steps(11)",
    repeat: -1,
  });

  // Uniforms
  const uniforms = {
    uTime: new THREE.Uniform(0),
    uWobbleFactor: new THREE.Uniform(uWobbleFactor),
    uLoadingProgress: new THREE.Uniform(uLoadingProgress),
  };

  // Animation
  useFrame((state) => {
    const { clock } = state;
    uniforms.uTime.value = clock.getElapsedTime();
  });

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

  const stickerDepthmaterial = new CustomShaderMaterial({
    // CustomShaderMaterial
    baseMaterial: THREE.MeshDepthMaterial,
    // MeshDepthMaterial
    uniforms: uniforms,
    vertexShader: stickerVertexShader,
    depthPacking: THREE.RGBADepthPacking,
  });

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        rotation={[0, 0, 0]}
        position={[-1, 0, -0.03]}
        material={stickerMaterial}
        customDepthMaterial={stickerDepthmaterial}
      >
        <circleGeometry args={[1, 64]} />
      </mesh>
    </>
  );
}
