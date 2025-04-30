import { useParams } from "react-router";
import Balancer from "react-wrap-balancer";
import { JSX, useEffect, useRef } from "react";
import ProjectLinks from "./ProjectLinks";
import ProjectModel from "./ProjectModel";
import ProjectVideo from "./ProjectVideo";
import ProjectImages from "./ProjectImages";
import useAppStore from "@stores/useAppStore";

export default function ProjectDetails() {
  // Refs
  const projectTypeRef = useRef<HTMLHeadingElement>(null);

  // Hooks
  const projectID = useParams().pid;
  const projects = useAppStore((state) => state.projects);
  const updateProjectNav = useAppStore((state) => state.updateProjectNav);

  // Variables
  const projectIndex = projects.findIndex(
    (project) => project.id === projectID
  );
  const project = projects[projectIndex];

  useEffect(() => {
    // Update previous and next project links
    updateProjectNav(projectIndex);
  }, [projectIndex]);

  // Getters
  const getProjectContent = (): JSX.Element | undefined => {
    if (project.video !== undefined) {
      return <ProjectVideo video={project.video} />;
    } else if (project.imgFiles !== undefined) {
      return (
        <ProjectImages projectTypeRef={projectTypeRef} project={project} />
      );
    } else if (project.model !== undefined) {
      return <ProjectModel project={project} />;
    }
  };

  return (
    <div className="xl:px-18">
      <div className="mb-12 flex h-full flex-col p-6 xl:mx-auto xl:mb-0 xl:grid xl:max-w-6xl xl:grid-cols-12 xl:gap-x-6 xl:p-0">
        {/* -- Infos -- */}
        <div className="mt-16 flex flex-col xl:sticky xl:top-0 xl:col-span-5 xl:mt-0 xl:h-screen xl:justify-center">
          {/* -- Type --*/}
          <div
            ref={projectTypeRef}
            className="gsap-stagger font-bricolage text-sm leading-none text-stone-400"
          >
            {project?.type}
          </div>
          {/* -- Title -- */}
          <h1 className="gsap-stagger mt-2 font-getai text-5xl leading-14 wrap-break-word hyphens-auto text-amber-500 md:text-7xl md:leading-18 xl:mt-4">
            <Balancer ratio={0.5} preferNative={false}>
              {project?.title}
            </Balancer>
          </h1>
          {/* -- Description -- */}
          <div className="gsap-stagger mt-6 space-y-6 text-stone-700">
            <p>
              <Balancer ratio={1} preferNative={false}>
                {project?.description}
              </Balancer>
            </p>
            {/* -- Links -- */}
            {project.links && project.links.length > 0 && (
              <ProjectLinks links={project.links} />
            )}
          </div>
        </div>

        <div className="hidden xl:col-span-1 xl:block" />

        {/* -- Content -- */}
        <div className="gsap-stagger mt-0 flex xl:col-span-6">
          {getProjectContent()}
        </div>
      </div>
    </div>
  );
}
