import gsap from "gsap";
import { useRef, useEffect } from "react";
import { NavLink, NavLinkRenderProps } from "react-router";
import useAppStore from "../stores/useAppStore";

export default function Nav() {
  // Refs
  const NavContainer = useRef<HTMLDivElement>(null!);

  // Getters
  const getNavLinkClasses = ({ isActive }: NavLinkRenderProps): string => {
    return `leading-0 hover:underline ${isActive && "underline"}`;
  };

  useEffect(() => {
    const unsubscribePhase = useAppStore.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          gsap.to(NavContainer.current, {
            opacity: 1.0,
            duration: 3
          });
        }
      }
    );

    return () => {
      unsubscribePhase();
    };
  });

  return (
    <>
      {/* -- Header -- */}
      <div className="fixed top-5 z-50 grid w-full grid-cols-3 items-center px-6 font-light">
        <div className="text-left">
          <NavLink to="/" className={(isActive) => getNavLinkClasses(isActive)}>
            Work
          </NavLink>
        </div>
        <div className="text-center text-[32px] leading-0 font-extrabold">
          Drop
        </div>
        <div className="text-right">
          <NavLink
            to="/about"
            className={(isActive) => getNavLinkClasses(isActive)}
          >
            About
          </NavLink>
        </div>
      </div>

      {/* -- Footer -- */}
      <div className="fixed bottom-6 z-50 flex w-full items-baseline justify-between px-6 font-light">
        <a href="#" className="leading-0 hover:underline">
          Contact
        </a>
        <div className="flex items-center gap-2 text-xs">
          <p>Available for hire</p>
          <div className="size-2 rounded-full bg-green-500"></div>
        </div>
      </div>
    </>
  );
}
