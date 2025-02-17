import gsap from "gsap";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useAppStore from "../stores/useAppStore";
import { memo, forwardRef, useState, useEffect } from "react";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import stickerVertexShader from "../shaders/sticker/vertex.glsl";
import stickerFragmentShader from "../shaders/sticker/fragment.glsl";

const Sticker = memo(
  forwardRef<THREE.Mesh, {}>((_, ref) => {
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

    // States
    const [isFloating, setIsFloating] = useState<boolean>(false);

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

    const stickerDepthmaterial = new CustomShaderMaterial({
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

    return (
      <Float
        rotationIntensity={25}
        speed={isFloating ? 5 : 0}
        floatingRange={[-1.5, 1.5]}
      >
        <mesh
          ref={ref}
          castShadow
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          material={stickerMaterial}
          customDepthMaterial={stickerDepthmaterial}
        >
          <circleGeometry args={[1, 64]} />
        </mesh>
      </Float>
    );
  })
);

export default Sticker;
