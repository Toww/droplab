import gsap from "gsap";
import { useRef, useEffect } from "react";
import useAppStore from "../stores/useAppStore";

export default function Layout() {
  const layoutContainer = useRef<HTMLDivElement>(null!);

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

    return () => {
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
