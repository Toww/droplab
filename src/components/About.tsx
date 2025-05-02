import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import GithubIcon from "@assets/github.svg?react";
import LinkedinIcon from "@assets/linkedin.svg?react";

export default function About() {
  // Refs
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Effects
  useGSAP(() => {
    gsap.fromTo(
      imageContainerRef.current,
      { rotation: 0, y: 100, opacity: 0 },
      { rotation: 3.5, y: 10, opacity: 1, duration: 1.5, ease: "back.out(1)" }
    );
  }, []);

  return (
    <div className="mx-auto grid h-full max-w-6xl grid-cols-12 gap-x-8">
      {/* Infos */}
      <div className="sticky top-0 col-span-5 flex h-screen flex-col justify-center">
        {/* -- Title -- */}
        <h1 className="font-getai text-7xl leading-none text-amber-500">
          About
        </h1>
        {/* -- Description -- */}
        <div className="mt-8 flex flex-col gap-8 text-stone-700">
          <p>
            Hello ! My name is Thomas, I’m a front-end developer with an
            important interest in artistic and creative fields.
          </p>
          <p>
            After years working as a graphic designer, I finally came back to my
            original passion for coding and take pleasure in working closely
            with designers.
          </p>
          <p>
            Human is at the center of my work and I’ll always be happy to talk
            about your projects. Feel free to contact me anytime !
          </p>
        </div>
        <div className="mt-10 flex items-center justify-start gap-4 text-amber-500">
          <a href="https://github.com/toww" target="_blank">
            <GithubIcon width={34} height={34} fill="currentColor" />
          </a>
          <a href="https://www.linkedin.com/in/toww/" target="_blank">
            <LinkedinIcon width={32} height={32} fill="currentColor" />
          </a>
        </div>
      </div>

      <div className="col-span-1" />

      {/* // Images */}
      <div className="col-span-6 flex items-center p-4">
        <div
          ref={imageContainerRef}
          className="w-full rounded bg-white p-4 shadow-lg"
        >
          <img src="/images/about/about-pic.jpg" alt="Profile picture" />
        </div>
      </div>
    </div>
  );
}
