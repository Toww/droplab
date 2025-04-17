import gsap from "gsap";
import { useRef, useEffect } from "react";
import useAppStore from "@stores/useAppStore";

export default function ProjectTitle() {
  // Refs
  const projectTitleRef = useRef<HTMLHeadingElement>(null!);

  // Hooks
  const hoveredProject = useAppStore((state) => state.hoveredProject);

  // Effects
  useEffect(() => {
    const unsubHoveredProject = useAppStore.subscribe(
      (state) => state.hoveredProject,
      (hoveredProject) => {
        const animDuration = 0.5;
        const animEase: gsap.TweenValue = "power3.out";

        if (hoveredProject !== null && projectTitleRef.current) {
          let tl = gsap.timeline();

          tl.fromTo(
            projectTitleRef.current,
            { y: 100 },
            { y: 0, duration: animDuration, ease: animEase }
          );

          tl.fromTo(
            projectTitleRef.current,
            { opacity: 0 },
            { opacity: 1, duration: animDuration, ease: animEase },
            "<-0.1"
          );
        }
      }
    );

    return () => {
      unsubHoveredProject();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed z-40 flex h-screen w-screen items-center justify-center">
      {/* Text block */}
      <div className="z-50 h-fit overflow-hidden p-4">
        <h1
          ref={projectTitleRef}
          className="pt-4 text-center font-getai text-8xl leading-none text-amber-500 text-shadow-[0_2px_4px_rgb(0_0_0/_0.3)]"
        >
          {hoveredProject?.title}
        </h1>
      </div>
    </div>
  );
}
