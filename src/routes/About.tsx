import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Balancer from "react-wrap-balancer";
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
      {
        rotation: 3.5,
        y: 10,
        opacity: 1,
        delay: 0.7,
        duration: 1.5,
        ease: "back.out(0.8)"
      }
    );
  }, []);

  return (
    <div className="overflow-x-hidden lg:px-18">
      <div className="mb-12 flex h-full flex-col p-6 lg:mx-auto lg:mb-0 lg:grid lg:max-w-6xl lg:grid-cols-12 lg:gap-x-8 lg:p-0">
        {/* -- Infos -- */}
        <div className="mt-16 flex flex-col md:max-w-3/4 lg:col-span-6 lg:mt-0 lg:h-screen lg:max-w-full lg:justify-center">
          {/* Title */}
          <h1>About</h1>
          {/* Text */}
          <div className="mt-8 flex flex-col gap-8 text-stone-700">
            <Balancer as="p" preferNative={false}>
              Hello ! My name is Thomas, I’m a front-end developer with an
              important interest in artistic and creative fields.
            </Balancer>
            <Balancer as="p" preferNative={false}>
              After years working as a graphic designer, I finally came back to
              my original passion for coding and take pleasure in working
              closely with designers.
            </Balancer>
            <Balancer as="p" preferNative={false}>
              Human is at the center of my work and I’ll always be happy to talk
              about your projects. Feel free to contact me anytime !
            </Balancer>
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

        {/* -- Photo -- */}
        <div className="mt-12 mb-12 flex items-center justify-center sm:mx-8 md:mx-24 lg:col-span-6 lg:m-0 lg:mt-0">
          <div
            ref={imageContainerRef}
            className="w-full max-w-[480px] rounded bg-white p-2 shadow-lg lg:p-4"
          >
            <img src="/images/about/about-pic.jpg" alt="Profile picture" />
          </div>
        </div>
      </div>
    </div>
  );
}
