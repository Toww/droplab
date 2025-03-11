import gsap from "gsap";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { addEffect } from "@react-three/fiber";
import useAppStore from "../stores/useAppStore";

export default function Loader() {
  // Store variables
  const phase = useAppStore((state) => state.phase);

  // GSAP
  useGSAP(
    () => {
      if (phase === "ready") {
        const tl = gsap.timeline();
        tl.to(
          ".loader-container",
          {
            padding: 0,
            duration: 1,
            ease: "power1.out",
          },
          0
        );
        tl.to(
          ".loader",
          {
            borderRadius: 0,
            duration: 1,
            ease: "power1.out",
          },
          "<"
        );
        tl.to(
          ".loader-container",
          {
            opacity: 0,
            duration: 0.5,
          },
          ">"
        );
      }
    },
    { dependencies: [phase] }
  );

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

    const unsubEffect = addEffect(() => {
      elapsedTime = (Date.now() - startTime) / 1000; // elapsedTime in seconds

      if (elapsedTime > finishTime) {
        appStore.endLoading();
      }
    });

    return () => {
      unsubEffect();
      elapsedTime = 0;
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}
