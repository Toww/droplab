import gsap from "gsap";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import useAppStore from "../stores/useAppStore";

export default function Loader() {
  // Refs
  const loaderContainer = useRef<HTMLDivElement>(null!);
  const loaderProgress = useRef<HTMLDivElement>(null!);

  // Effects
  useEffect(() => {
    useAppStore.getState().startLoading();

    // Faking loading for development purpose
    // -----
    // TODO - Implement real loading state once the rest of the app is ready.
    // -----
    const startTime = Date.now();
    let elapsedTime = 0;
    const finishTime = 2; // Finish time in seconds
    let loadingPercent = 0;

    const unsubEffect = addEffect(() => {
      const phase = useAppStore.getState().phase;

      elapsedTime = (Date.now() - startTime) / 1000; // elapsedTime in seconds
      loadingPercent = (elapsedTime / finishTime) * 100;

      if (elapsedTime < finishTime && phase === "loading") {
        gsap.to(loaderProgress.current, {
          width: `${loadingPercent}%`,
          duration: 0.2,
          ease: "power2.out",
          overwrite: true,
        });
      }

      if (elapsedTime >= finishTime && phase === "loading") {
        useAppStore.getState().endLoading();
      }
    });

    return () => {
      unsubEffect();
    };
  }, []);

  useEffect(() => {
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          gsap.to(loaderContainer.current, {
            opacity: 0,
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
    <div
      ref={loaderContainer}
      className="bg-gray fixed bottom-0 h-1 w-full bg-stone-200"
    >
      <div ref={loaderProgress} className="h-full w-0 bg-stone-800" />
    </div>
  );
}
