import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Loader() {
  // Refs
  const loaderContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0, yoyo: false });
      tl.to(".noise", { xPercent: -15, yPercent: -20, ease: "steps(8)" });
    },
    { scope: loaderContainerRef }
  );

  return (
    <>
      <div className="loader-container" ref={loaderContainerRef}>
        <div className="loader-bg">
          <div className="noise"></div>
        </div>
      </div>
    </>
  );
}
