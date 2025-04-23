import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import useAppStore from "@stores/useAppStore";

export default function LoadingScreen() {
  // Refs
  const loaderScreenRef = useRef<HTMLDivElement>(null!);
  const loaderProgressBarRef = useRef<HTMLDivElement>(null!);

  // Hooks
  const loading = useProgress();

  // Hooks
  const phase = useAppStore((state) => state.phase);
  const startLoading = useAppStore((state) => state.startLoading);
  const endLoading = useAppStore((state) => state.endLoading);

  useGSAP(() => {
    // Declare loading start on first render and display loading bar
    if (phase === null) {
      startLoading();
      gsap.fromTo(
        loaderScreenRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5
        }
      );
    }
  }, []);

  // Loading progress
  useGSAP(() => {
    gsap.to(loaderProgressBarRef.current, {
      width: `${loading.progress}%`,
      duration: 0.2,
      ease: "power2.out"
    });

    // Loading end
    if (loading.loaded) {
      endLoading();
      gsap.to(loaderScreenRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1
      });
    }
  }, [loading.progress, loading.loaded]);

  return (
    <div
      ref={loaderScreenRef}
      style={{ opacity: 0 }}
      className="test pointer-events-none fixed z-50 flex h-screen w-screen items-center justify-center bg-white"
    >
      <div className="w-full text-right text-xs text-stone-700">
        <div className="mr-6 mb-1">{`${Math.round(loading.progress)}%`}</div>
        <div className="h-0.5 w-full bg-stone-200">
          <div ref={loaderProgressBarRef} className="h-full w-0 bg-stone-800" />
        </div>
      </div>
    </div>
  );
}
