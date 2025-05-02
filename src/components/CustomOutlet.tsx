import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation, useOutlet } from "react-router";
import { JSX, useEffect, useRef, useState } from "react";
import useAppStore from "@stores/useAppStore";

export default function CustomOutlet() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const navDirectionRef = useRef<string | null>(null);
  const displayedLocationRef = useRef<string | null>(null);

  // States
  const [displayOutlet, setDisplayOutlet] = useState<JSX.Element | null>(null);

  // Hooks
  const location = useLocation();
  const currentOutlet = useOutlet();
  const updateProjectNav = useAppStore((state) => state.updateProjectNav);

  // Effects
  useEffect(() => {
    const unsubNavDir = useAppStore.subscribe(
      (state) => state.navDirection,
      (navDir) => {
        navDirectionRef.current = navDir;
      }
    );

    return () => {
      unsubNavDir();
    };
  }, []);

  // GSAP
  useGSAP(
    () => {
      // -- Variables --
      const animDuration = 0.5;
      const isDisplayedLocationRefProject =
        displayedLocationRef.current?.includes("projects");
      const isNextLocationProject = location.pathname.includes("projects");

      // -- Animations --
      const containerFadeIn = () => {
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
      };

      const containerFadeOutIn = () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: animDuration,
          onComplete: () => {
            // After animation out, display new path's component
            setDisplayOutlet(currentOutlet);
            // -- Container --
            gsap.to(containerRef.current, {
              opacity: 1,
              duration: animDuration
            });
            // After new component in, set new displayed location pathname.
            displayedLocationRef.current = location.pathname;
          }
        });
      };

      const animateBetweenProjects = () => {
        const getAnimDetails = () => {
          switch (navDirectionRef.current) {
            case "left":
              return {
                x: 100,
                stagger: -0.1
              };
            case "right":
              return {
                x: -100,
                stagger: 0.1
              };
            default:
              return {
                x: 0,
                stagger: 0
              };
          }
        };

        gsap.fromTo(
          ".gsap-stagger",
          { opacity: 1 },
          {
            x: getAnimDetails().x,
            stagger: getAnimDetails().stagger,
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
              // After animation out, display new path's component
              // and update previous location pathname.
              setDisplayOutlet(currentOutlet);
              window.scrollTo({ top: 0, left: 0 });
              // -- Container --
              gsap.fromTo(
                ".gsap-stagger",
                { x: getAnimDetails().x * -1, opacity: 0 },
                {
                  opacity: 1,
                  x: 0,
                  stagger: getAnimDetails().stagger,
                  duration: 0.6
                }
              );
              displayedLocationRef.current = location.pathname;
            }
          }
        );
      };

      // -- Location changes --
      if (
        displayedLocationRef.current !== location.pathname &&
        displayOutlet !== null
      ) {
        if (isDisplayedLocationRefProject && isNextLocationProject) {
          // When current and next locations are projects
          animateBetweenProjects();
        } else {
          // Entering or leaving projects page
          containerFadeOutIn();
          if (!isNextLocationProject) {
            // Hide project navigation if next location isn't a project
            updateProjectNav(null);
          }
        }
      } else {
        // Initial render
        setDisplayOutlet(currentOutlet);
        containerFadeIn();
        displayedLocationRef.current = location.pathname;
      }
    },
    {
      scope: containerRef,
      dependencies: [location.pathname]
    }
  );

  return (
    <div ref={containerRef} className="opacity-0">
      {displayOutlet}
    </div>
  );
}
