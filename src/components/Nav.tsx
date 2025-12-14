import gsap from "gsap";
import { useRef, useEffect } from "react";
import { NavLink, NavLinkRenderProps, useLocation } from "react-router";
import useAppStore from "@stores/useAppStore";
import ArrowIcon from "@assets/arrow.svg?react";

export default function Nav() {
  // Refs
  const navContainerRef = useRef<HTMLDivElement>(null!);
  const contactLinkRef = useRef<HTMLAnchorElement>(null);

  // Hooks
  const nextProject = useAppStore((state) => state.nextProject);
  const previousProject = useAppStore((state) => state.previousProject);
  const updateNavDirection = useAppStore((state) => state.updateNavDirection);
  const pathname = useLocation().pathname;

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

  // Getters
  const getNavLinkClasses = ({ isActive }: NavLinkRenderProps): string => {
    return `leading-0 hover:underline ${isActive && "underline"}`;
  };


  const getFooterNavClasses = () => {
    const baseClasses = "items-center gap-10 text-xs";
    const pathClasses = !pathname.includes("projects")
      ? "hidden"
      : "flex lg:hidden";

    return `${pathClasses} ${baseClasses}`;
  };

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
          {/* Contact */}
          <a ref={contactLinkRef} className="leading-0 hover:underline">
            Contact
          </a>
          {/** Status & Tablet / mobile project nav **/}

          {/* -- Tablet / Mobile navigation -- */}
          <div className={getFooterNavClasses()}>
            {previousProject && (
              <div className="w-6 content-center text-amber-500">
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
              <div className="w-6 content-center text-amber-500">
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
          </div>
        </div>
      </nav>

      {/* -- Desktop - Project navigation -- */}
      <div className="hidden lg:block">
        {previousProject && (
          <div className="fixed left-6 z-30 h-screen w-6 content-center text-stone-700">
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
          <div className="fixed right-6 z-30 h-screen w-6 content-center text-stone-700">
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
      </div>
    </>
  );
}
