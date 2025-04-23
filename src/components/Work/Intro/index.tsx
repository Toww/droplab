import gsap from "gsap";
import * as THREE from "three";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import Clouds from "./Clouds";
import Sticker from "./Sticker";
import useAppStore from "@stores/useAppStore";

export default function Intro() {
  // Refs
  const cloudsRef = useRef<THREE.Group>(null!);
  const stickerRef = useRef<THREE.Group>(null!);
  const isStickerFollowing = useRef<boolean>(true);

  // Hooks
  const endIntro = useAppStore((state) => state.endIntro);
  const introLength = useAppStore((state) => state.introLength);

  useGSAP(() => {
    // After intro length, animate intro out
    const timeout = setTimeout(() => {
      // Sticker movement out
      isStickerFollowing.current = false;

      gsap.to(stickerRef.current.position, {
        z: 6,
        duration: 1,
        delay: 0.2,
        ease: "power2.in"
      });

      // Clouds fade out
      const cloudsMesh = cloudsRef.current.children[1] as THREE.Mesh;
      const cloudsMaterial = cloudsMesh.material as THREE.Material;

      gsap.to(cloudsMaterial, {
        opacity: 0,
        duration: 2,
        onComplete: () => {
          endIntro();
        }
      });
    }, introLength);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Frame loop
  useFrame((state) => {
    if (isStickerFollowing.current) {
      const { pointer, viewport } = state;

      const stickerX = (pointer.x * viewport.width) / 2;
      const stickerY = (pointer.y * viewport.height) / 2;

      gsap.to(stickerRef.current.position, {
        x: stickerX,
        y: stickerY,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true
      });
    }
  });

  return (
    <>
      <Clouds ref={cloudsRef} />
      <Sticker ref={stickerRef} />
    </>
  );
}
