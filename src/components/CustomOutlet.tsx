import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { JSX, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router";

export default function CustomOutlet() {
  // States
  const [displayOutlet, setDisplayOutlet] = useState<JSX.Element | null>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const previousLocationPathname = useRef<string | null>(null);

  // Hooks
  const location = useLocation();
  const currentOutlet = useOutlet();

  useGSAP(() => {
    const animDuration = 0.5;

    if (
      previousLocationPathname.current &&
      previousLocationPathname.current !== location.pathname
    ) {
      // On path change, animate current component out
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: animDuration,
        onComplete: () => {
          // After animation out, display new path's component
          // and update previous location pathname.
          setDisplayOutlet(currentOutlet);
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: animDuration
          });
          previousLocationPathname.current = location.pathname;
        }
      });
    } else {
      // Initial render

      // Display current react-router's outlet with slow fade in animation
      // and set previous location pathname
      setDisplayOutlet(currentOutlet);
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: animDuration
        }
      );
      previousLocationPathname.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      {displayOutlet}
    </div>
  );
}
