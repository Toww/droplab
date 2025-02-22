import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";

import useAppStore from "../stores/useAppStore";

export default function Loader() {
  // Refs
  const loaderRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { contextSafe } = useGSAP(() => {}, { scope: loaderRef });

  // Handlers
  const handleLoadingEnd = contextSafe(() => {
    const tl = gsap.timeline();
    tl.to(".loader-container", {
      padding: 0,
      duration: 2,
      ease: "power2.out",
    });
    tl.to(
      ".loader-bg",
      {
        borderRadius: 0,
        duration: 2,
        opacity: 0,
        ease: "power2.out",
      },
      "<"
    );
  });

  // Effects
  useEffect(() => {
    const appStore = useAppStore.getState();
    appStore.startLoading();

    // Faking loading for development purpose
    // -----
    // TODO - Implement real loading state once the rest of the app is ready.
    // -----
    const startTime = Date.now();
    let elapsedTime = 0;
    const finishTime = 2; // Finish time in seconds

    const unsubPhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          handleLoadingEnd();
        }
      }
    );

    // Effects in sync with useFrame
    const unsubEffect = addEffect(() => {
      elapsedTime = (Date.now() - startTime) / 1000; // elapsedTime in seconds

      if (elapsedTime > finishTime) {
        appStore.endLoading();
      }
    });

    return () => {
      unsubEffect();
      unsubPhase();
      elapsedTime = 0;
    };
  }, []);

  return (
    <div ref={loaderRef}>
      <div className="loader-container">
        <div className="loader-bg"></div>
      </div>
    </div>
  );
}
