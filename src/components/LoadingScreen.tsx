import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router";
import { useProgress } from "@react-three/drei";
import useAppStore from "@stores/useAppStore";

export default function LoadingScreen() {
  // Refs
  const loaderScreenRef = useRef<HTMLDivElement>(null!);
  const loaderProgressBarRef = useRef<HTMLDivElement>(null!);
  const loaderBarContainerRef = useRef<HTMLDivElement>(null!);

  // Hooks
  const loading = useProgress();
  const location = useLocation();
  // Hooks
  const phase = useAppStore((state) => state.phase);
  const startLoading = useAppStore((state) => state.startLoading);
  const endLoading = useAppStore((state) => state.endLoading);

  useGSAP(() => {
    // Declare loading start on first render and display loading bar
    if (phase === null) {
      startLoading();
      gsap.fromTo(
        loaderBarContainerRef.current,
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
      endLoading(location.pathname);
      gsap.to(loaderScreenRef.current, {
        opacity: 0,
        duration: 1.5,
        delay: 0.7
      });
    }
  }, [loading.progress, loading.loaded]);

  return (
    <div
      ref={loaderScreenRef}
      className="pointer-events-none fixed z-50 flex h-screen w-screen items-center justify-center bg-white"
    >
      <div ref={loaderBarContainerRef} className="w-full opacity-0">
        <div className="mr-6 mb-2 text-right text-xs text-stone-700">{`${Math.round(loading.progress)}%`}</div>
        <div className="h-0.5 w-full bg-stone-200">
          <div ref={loaderProgressBarRef} className="h-full w-0 bg-stone-700" />
        </div>
      </div>
    </div>
  );
}
