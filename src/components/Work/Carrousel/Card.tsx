import gsap from "gsap";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router";
import { useFrame } from "@react-three/fiber";
import { useRef, RefObject, useMemo, useState, useEffect } from "react";
import { Image, ImageProps, Float, useScroll } from "@react-three/drei";
import { getCardConfig } from "./config";
import useAppStore from "@stores/useAppStore";

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
  projectsLength
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

  // Getters
  const cardConfig = getCardConfig(index, projectsLength, radius);

  // Hooks
  const scroll = useScroll();
  const navigate = useNavigate();
  const phase = useAppStore((state) => state.phase);
  const hoveredProject = useAppStore((state) => state.hoveredProject);
  const updateHoveredProject = useAppStore(
    (state) => state.updateHoveredProject
  );
  const zRotation = useMemo(
    () =>
      index !== 0
        ? Math.random() * (cardConfig.maxZRotation * 2) -
          cardConfig.maxZRotation
        : 0,
    []
  );

  // Handlers
  const handlePointerOver = (e: MouseEvent) => {
    e.stopPropagation();

    if (imgRef.current.position.z > 0 && phase === "ready") {
      updateHoveredProject(index);
      setIsHovered(true);
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerLeave = (e: MouseEvent) => {
    e.stopPropagation();
    if (hoveredProject !== null) {
      updateHoveredProject(null);
      setIsHovered(false);
      document.body.style.cursor = "auto";
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (phase === "ready" && hoveredProject?.id) {
      navigate(`/projects/${hoveredProject?.id}`);
      updateHoveredProject(null);
      setIsHovered(false);
    }
  };

  // GSAP / Phase handling
  useGSAP(() => {
    if (phase === "ready") {
      gsap.fromTo(
        imgRef.current.material,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          delay: 1
        }
      );
    }
  }, [phase]);

  // GSAP
  useGSAP(() => {
    // Card animation on hover
    if (isHovered) {
      gsap.to(imgRef.current.material, {
        radius: cardConfig.radius.hovered,
        duration: cardConfig.animation.duration,
        ease: cardConfig.animation.ease
      });

      gsap.to(imgRef.current.position, {
        x: cardConfig.position.hovered.x,
        y: cardConfig.position.hovered.y,
        z: radius + 1,
        duration: cardConfig.animation.duration,
        ease: cardConfig.animation.ease
      });

      gsap.to(imgRef.current.scale, {
        x: cardConfig.scale.hovered.x,
        y: cardConfig.scale.hovered.y,
        duration: cardConfig.animation.duration,
        ease: cardConfig.animation.ease
      });
    } else {
      gsap.to(imgRef.current.material, {
        radius: cardConfig.radius.initial,
        duration: cardConfig.animation.duration,
        ease: cardConfig.animation.ease
      });

      gsap.to(imgRef.current.scale, {
        x: cardConfig.scale.initial.x,
        y: cardConfig.scale.initial.y,
        duration: cardConfig.animation.duration,
        ease: cardConfig.animation.ease
      });
    }
  }, [isHovered]);

  // Frame loop
  useFrame((state) => {
    // Raycasting on every frame insted of on pointer move
    state.events.update && state.events.update(); // Raycasts every frame rather than on pointer-move

    // Card position on scroll
    const targetXPos =
      Math.sin((index / projectsLength - scroll.offset) * Math.PI * 2) * radius;
    const targetZPos =
      Math.cos((index / projectsLength - scroll.offset) * Math.PI * 2) * radius;

    gsap.to(imgRef.current.position, {
      x: targetXPos,
      y: targetXPos / 3,
      z: targetZPos,
      duration: 0.2,
      ease: "none",
      overwrite: true
    });

    // When the card is not hovered, or a card is hovered but not this one
    if (!isHovered) {
      if (hoveredProject !== null) {
        gsap.to(imgRef.current.scale, {
          x: 4,
          y: 2.25,
          duration: cardConfig.animation.duration,
          ease: cardConfig.animation.ease
        });
      } else {
        gsap.to(imgRef.current.scale, {
          x: cardConfig.scale.initial.x,
          y: cardConfig.scale.initial.y,
          duration: cardConfig.animation.duration,
          ease: cardConfig.animation.ease
        });
      }
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
        radius={cardConfig.radius.initial}
        scale={[cardConfig.scale.initial.x, cardConfig.scale.initial.y]}
        rotation={[0, 0, zRotation]}
        onPointerOver={handlePointerOver}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        opacity={0}
        position={
          Object.values(cardConfig.position.initial) as [number, number, number]
        }
      />
    </Float>
  );
}
