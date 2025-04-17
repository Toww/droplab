import gsap from "gsap";
import * as THREE from "three";
import { useRef } from "react";
import { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import { extend, ThreeElement, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial
} from "@react-three/drei";
import portalVertexShader from "@shaders/portal/vertex.glsl";
import portalFragmentShader from "@shaders/portal/fragment.glsl";

type GLTFResult = GLTF & {
  nodes: {
    baked: THREE.Mesh;
    lampLightA: THREE.Mesh;
    lampLightB: THREE.Mesh;
    portalLight: THREE.Mesh;
  };
  materials: {};
};

// Portal Material
const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000")
  },
  portalVertexShader,
  portalFragmentShader
);

// Extend Fiber's Three Elements
extend({ PortalMaterial });

// Add types to fiber's Three Elements
declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: ThreeElement<typeof PortalMaterial>;
  }
}

export default function Portal() {
  // GLTF
  const { nodes } = useGLTF(
    "/models/portal/portal.glb"
  ) as unknown as GLTFResult;

  // Textures
  const bakedTexture = useTexture("/models/portal/baked.jpg");
  bakedTexture.flipY = false;

  // Refs
  const modelGroupRef = useRef<THREE.Group>(null!);
  const portalMaterialRef = useRef<THREE.Material & { uTime: number }>(null!);

  // GSAP
  useGSAP(() => {
    gsap.to(modelGroupRef.current.rotation, {
      y: -Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none"
    });
  }, []);

  // Frame Loop
  useFrame((_, delta) => {
    portalMaterialRef.current.uTime += delta;
  });

  return (
    <>
      <Sparkles
        size={4}
        scale={[4, 1, 4]}
        position-y={1}
        speed={0.4}
        count={30}
        color="#F8991C"
      />
      <group ref={modelGroupRef}>
        <mesh
          name="baked"
          geometry={nodes.baked.geometry}
          material={nodes.baked.material}
          position={[1.058, -0.001, -0.129]}
          scale={1.14}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        {/* Lamp Lights */}
        <mesh
          name="lampLightA"
          geometry={nodes.lampLightA.geometry}
          material={nodes.lampLightA.material}
          position={[-0.691, 0.852, -0.129]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.14}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          name="lampLightB"
          geometry={nodes.lampLightB.geometry}
          position={[0.765, 0.852, -0.128]}
          scale={1.14}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        {/* Portal */}
        <mesh
          name="portalLight"
          geometry={nodes.portalLight.geometry}
          position={[0, 0.797, -1.746]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/models/portal/portal.glb");
