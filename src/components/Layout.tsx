import gsap from "gsap";
import { useRef, useEffect } from "react";
import useAppStore from "../stores/useAppStore";

export default function Layout() {
  // Refs
  const layoutContainer = useRef<HTMLDivElement>(null!);
  const projectTitleRef = useRef<HTMLHeadingElement>(null!);

  // Hooks
  const hoveredProject = useAppStore((state) => state.hoveredProject);

  // Effects
  useEffect(() => {
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          gsap.to(layoutContainer.current, {
            opacity: 1.0,
            duration: 3,
          });
        }
      },
    );

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
            { y: 0, duration: animDuration, ease: animEase },
          );

          tl.fromTo(
            projectTitleRef.current,
            { opacity: 0 },
            { opacity: 1, duration: animDuration, ease: animEase },
            "<-0.1",
          );
        }
      },
    );

    return () => {
      unsubHoveredProject();
      unsubscribePhase();
    };
  }, []);

  return (
    <div ref={layoutContainer} className="opacity-0">
      {/* Header */}
      <div className="fixed top-5 z-50 grid w-full grid-cols-3 items-center px-6 font-light">
        <div className="text-left">
          <a href="#" className="leading-0 hover:underline">
            Work
          </a>
        </div>
        <div className="text-center text-[32px] leading-0 font-extrabold">
          Drop
        </div>
        <div className="text-right">
          <a className="leading-0 hover:underline" href="#">
            About
          </a>
        </div>
      </div>

      {/* Title */}
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

      {/* Footer */}
      <div className="fixed bottom-6 z-50 flex w-full items-baseline justify-between px-6 font-light">
        <a href="#" className="hover:underline">
          Contact
        </a>
        <div className="flex items-center gap-2 text-xs">
          <p>Available for hire</p>
          <div className="size-2 rounded-full bg-green-500"></div>
        </div>
      </div>
    </div>
  );
}
