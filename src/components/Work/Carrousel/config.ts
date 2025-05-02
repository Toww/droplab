type TCardConfig = {
  scale: {
    initial: { x: number; y: number };
    hovered: { x: number; y: number };
    reduced: {x: number, y: number};
  };
  radius: {
    initial: number;
    hovered: number;
  };
  position: {
    initial: {
      x: number;
      y: number;
      z: number;
    };
    hovered: {
      x: number;
      y: number;
      z: number;
    };
  };
  maxZRotation: number;
  animation: {
    duration: number;
    ease: gsap.EaseString;
  };
};

export function getCardConfig(
  index: number,
  projectsLength: number,
  radius: number
): TCardConfig {
  return {
    scale: {
      initial: { x: 8, y: 4.5 },
      hovered: { x: 12, y: 6.8 },
      reduced: { x: 4, y: 2.25 }
    },
    radius: {
      initial: 0.25,
      hovered: 0.05
    },
    position: {
      initial: {
        x: Math.sin((index / projectsLength) * Math.PI * 2) * radius,
        y: (Math.sin((index / projectsLength) * Math.PI * 2) * radius) / 3,
        z: Math.cos((index / projectsLength) * Math.PI * 2) * radius
      },
      hovered: {
        x: 0,
        y: 0,
        z: radius + 1
      }
    },
    maxZRotation: Math.PI * 0.04,
    animation: {
      duration: 0.5,
      ease: "power3.out"
    }
  };
}
