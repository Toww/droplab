import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import useAppStore from "@stores/useAppStore";

export default function LoadingBar() {
  // Refs
  const loaderContainerRef = useRef<HTMLDivElement>(null!);
  const loaderProgressBarRef = useRef<HTMLDivElement>(null!);

  // Hooks
  const loading = useProgress();

  // Effects
  useEffect(() => {
    // Make te progress bar disappear after load
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          gsap.to(loaderContainerRef.current, {
            opacity: 0,
            duration: 3
          });
        }
      }
    );

    return () => {
      unsubscribePhase();
    };
  }, []);

  // Handle progress bar width on loading
  useGSAP(() => {
    gsap.to(loaderProgressBarRef.current, {
      width: `${loading.progress}%`,
      duration: 0.2,
      ease: "power2.out"
    });
  }, [loading.progress]);

  return (
    <div
      ref={loaderContainerRef}
      className="bg-gray fixed bottom-0 h-3 w-full bg-stone-200"
    >
      <div ref={loaderProgressBarRef} className="h-full w-0 bg-stone-800" />
    </div>
  );
}
