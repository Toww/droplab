import gsap from "gsap";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import { useRef, RefObject, useMemo, useState } from "react";
import { Image, ImageProps, Float, useScroll } from "@react-three/drei";

type TCard = {
  url: string;
  index: number;
  radius: number;
  projectsLength: number;
  projectsGroupRef: RefObject<THREE.Group>;
} & ImageProps;

export default function Card({
  url,
  side,
  index,
  radius,
  projectsLength,
}: TCard) {
  // Refs
  const imgRef = useRef<
    THREE.Mesh<
      THREE.BufferGeometry,
      THREE.Material & { radius: number; zoom: number }
    >
  >(null!);

  // States
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Hooks
  const scroll = useScroll();

  // Handlers
  const handlePointerIn = (e: MouseEvent) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (e: MouseEvent) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  // Variables
  // Scale values
  const initialScale = [8, 4.5] as [number, number];
  const hoveredScale = [14, 7.8] as [number, number];

  // Radius values
  const initialRadius = 0.25;
  const hoveredRadius = 0.05;

  // GSAP
  useGSAP(() => {
    const animDuration = 0.5;
    const animEase: gsap.EaseString = "power3.out";

    if (isHovered && imgRef.current.position.z > 0) {
      gsap.to(imgRef.current.material, {
        radius: hoveredRadius,
        duration: animDuration,
        ease: animEase,
      });

      gsap.to(imgRef.current.position, {
        z: radius + 1,
        x: 0,
        y: 0,
        duration: animDuration,
        ease: animEase,
      });

      gsap.to(imgRef.current.scale, {
        x: hoveredScale[0],
        y: hoveredScale[1],
        duration: animDuration,
        ease: animEase,
      });
    } else {
      gsap.to(imgRef.current.material, {
        radius: initialRadius,
        duration: animDuration,
        ease: animEase,
      });

      gsap.to(imgRef.current.scale, {
        x: initialScale[0],
        y: initialScale[1],
        duration: animDuration,
        ease: animEase,
      });
    }
  }, [isHovered]);

  // Position values
  let xPosition = Math.sin((index / projectsLength) * Math.PI * 2) * radius;
  let zPosition = Math.cos((index / projectsLength) * Math.PI * 2) * radius;

  // Rotation values
  const maxZRotation = Math.PI * 0.04;
  const zRotation = useMemo(
    () => (index !== 0 ? Math.random() * (maxZRotation * 2) - maxZRotation : 0),
    [],
  );

  useFrame(() => {
    const targetXPos =
      Math.sin((index / projectsLength - scroll.offset) * Math.PI * 2) * radius;
    const targetZPos =
      Math.cos((index / projectsLength - scroll.offset) * Math.PI * 2) * radius;

    if (!isHovered) {
      gsap.to(imgRef.current.position, {
        x: targetXPos,
        y: -targetXPos / 3,
        z: targetZPos,
        duration: 0.2,
        ease: "none",
        overwrite: true,
      });
    }
  });

  return (
    <Float
      floatingRange={[-0.05, 0.05]}
      floatIntensity={0.8}
      rotationIntensity={0.7}
    >
      <Image
        url={url}
        side={side}
        transparent
        ref={imgRef}
        radius={initialRadius}
        scale={initialScale}
        rotation={[0, 0, zRotation]}
        onPointerOver={handlePointerIn}
        onPointerLeave={handlePointerOut}
        position={[xPosition, -xPosition / 3, zPosition]}
      />
    </Float>
  );
}
