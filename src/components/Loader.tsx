import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";

import useAppStore from "../stores/useAppStore";

export default function Loader() {
  // Refs
  const timeRef = useRef<HTMLDivElement>(null!);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { contextSafe } = useGSAP(() => {}, { scope: loaderRef });

  // Noise animation
  useGSAP(
    () => {
      gsap.to(".noise", {
        xPercent: -15,
        yPercent: -20,
        ease: "steps(8)",
        repeat: -1,
      });
    },
    { scope: loaderRef }
  );

  // Handlers
  const handleLoadingEnd = contextSafe(() => {
    const tl = gsap.timeline();
    tl.to(".noise", {
      opacity: 0,
      duration: 1,
    });
    tl.to(".loader-container", {
      // opacity: 1,
      padding: 0,
      duration: 1,
      ease: "power2.out",
    });
    tl.to(
      ".loader-bg",
      {
        borderRadius: 0,
        duration: 1,
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
    // TODO - Clean store / state change logic
    // -----
    const startTime = Date.now();
    let elapsedTime = 0;
    const finishTime = 0.1; // Finish time in seconds
    let hasLoaded = false;

    const unsubPhase = useAppStore.subscribe(
      (state) => state.phase,
      () => {
        hasLoaded = true;
        handleLoadingEnd();
      }
    );

    // Effects in sync with useFrame
    const unsubEffect = addEffect(() => {
      elapsedTime = (Date.now() - startTime) / 1000; // elapsedTime in seconds

      if (elapsedTime > finishTime && !hasLoaded) {
        timeRef.current.textContent = "Loaded !";
        appStore.endLoading();
      } else if (elapsedTime < finishTime) {
        timeRef.current.textContent = `${Math.round(elapsedTime * 10)}%`;
      }
    });

    return () => {
      unsubEffect();
      unsubPhase();
      elapsedTime = 0;
    };
  }, []);

  return (
    <>
      <div ref={timeRef} className="time">
        0.00
      </div>
      <div ref={loaderRef}>
        <div className="loader-container">
          <div className="loader-bg">
            <div className="noise"></div>
          </div>
        </div>
      </div>
    </>
  );
}
