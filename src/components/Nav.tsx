import gsap from "gsap";
import { useRef, useEffect } from "react";
import { NavLink, NavLinkRenderProps } from "react-router";
import useAppStore from "@stores/useAppStore";
import ArrowIcon from "@assets/arrow.svg?react";

export default function Nav() {
  // Refs
  const navContainerRef = useRef<HTMLDivElement>(null!);
  const contactLinkRef = useRef<HTMLAnchorElement>(null);

  // Getters
  const getNavLinkClasses = ({ isActive }: NavLinkRenderProps): string => {
    return `leading-0 hover:underline ${isActive && "underline"}`;
  };

  // Hooks
  const nextProject = useAppStore((state) => state.nextProject);
  const previousProject = useAppStore((state) => state.previousProject);
  const updateNavDirection = useAppStore((state) => state.updateNavDirection);

  // Adding obfuscated link on first load
  useEffect(() => {
    const link = window.atob("bWFpbHRvOmNvbnRhY3RAZHJvcC1sYWIuY29t");
    contactLinkRef.current?.setAttribute("href", link);
  }, []);

  // Fade in
  useEffect(() => {
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready")
          gsap.fromTo(
            navContainerRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 3
            }
          );
      }
    );

    return () => {
      unsubscribePhase();
    };
  }, []);

  return (
    <>
      <nav ref={navContainerRef} style={{ opacity: 0 }}>
        {/* -- Header -- */}
        <div className="fixed top-5 z-40 grid w-full grid-cols-3 items-center px-6 font-light">
          <div className="text-left">
            <NavLink
              to="/"
              onClick={() => updateNavDirection(null)}
              className={(isActive) => getNavLinkClasses(isActive)}
            >
              Work
            </NavLink>
          </div>
          <NavLink
            to="/"
            onClick={() => updateNavDirection(null)}
            className="text-center text-[32px] leading-0 font-extrabold"
          >
            Drop
          </NavLink>
          <div className="text-right">
            <NavLink
              to="/about"
              onClick={() => updateNavDirection(null)}
              className={(isActive) => getNavLinkClasses(isActive)}
            >
              About
            </NavLink>
          </div>
        </div>

        {/* -- Footer -- */}
        <div className="fixed bottom-6 z-50 flex w-full items-baseline justify-between px-6 font-light">
          <a ref={contactLinkRef} className="leading-0 hover:underline">
            Contact
          </a>
          <div className="flex items-center gap-2 text-xs">
            <p>Available for hire</p>
            <div className="size-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </nav>

      {/* -- Project navigation -- */}
      {previousProject && (
        <div className="fixed left-6 z-30 h-screen w-6 content-center text-stone-500">
          <div>
            <NavLink
              to={`/projects/${previousProject.id}`}
              onClick={() => updateNavDirection("left")}
            >
              <ArrowIcon />
            </NavLink>
          </div>
        </div>
      )}
      {nextProject && (
        <div className="fixed right-6 z-30 h-screen w-6 content-center text-stone-500">
          <div>
            <NavLink
              to={`/projects/${nextProject.id}`}
              onClick={() => updateNavDirection("right")}
            >
              <ArrowIcon className="scale-x-[-1]" />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
