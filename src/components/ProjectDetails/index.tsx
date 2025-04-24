import { useParams } from "react-router";
import { Canvas } from "@react-three/fiber";
import { JSX, useEffect, useRef, useState } from "react";
import { Center, OrbitControls } from "@react-three/drei";
import ProjectLinks from "./ProjectLinks";
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

  // States
  const [imagesMarginTop, setImagesMarginTop] = useState<number>(0);

  // Effects
  useEffect(() => {
    if (projectTypeRef.current && project.imgFiles) {
      setImagesMarginTop(projectTypeRef.current.getBoundingClientRect().top);
    }
  }, [projectTypeRef.current, project.imgFiles]);

  useEffect(() => {
    // Update previous and next project links
    updateProjectNav(projectIndex);
  }, [projectIndex]);

  // Getters
  const getProjectContent = (): JSX.Element | undefined => {
    if (project.video !== undefined) {
      return <ProjectVideo video={project.video} />;
    } else if (project.imgFiles !== undefined) {
      return <ProjectImages marginTop={imagesMarginTop} project={project} />;
    } else if (project.model !== undefined) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-full w-full">
            <Canvas
              flat
              camera={{ fov: 45, near: 0.1, far: 200, position: [1, 1, 9] }}
            >
              <OrbitControls />
              <color args={["#ebebeb"]} attach="background" />
              <Center>{project.model}</Center>
            </Canvas>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* // Project detail */}
      <div className="mx-auto grid h-full max-w-6xl grid-cols-12 gap-x-6">
        {/* Infos */}
        <div className="sticky top-0 col-span-5 flex h-screen flex-col justify-center">
          {/* -- Type --*/}
          <div
            ref={projectTypeRef}
            className="font-bricolage text-sm leading-none text-stone-400"
          >
            {project?.type}
          </div>
          {/* -- Title -- */}
          <h1 className="mt-4 font-getai text-7xl leading-18 text-amber-500">
            {project?.title}
          </h1>
          {/* -- Description -- */}
          <div className="mt-8 space-y-8 text-stone-700">
            <p>{project?.description}</p>
            {/* -- Links -- */}
            {project.links && project.links.length > 0 && (
              <ProjectLinks links={project.links} />
            )}
          </div>
        </div>

        <div className="col-span-1" />

        {/* // Content */}
        <div className="col-span-6 flex">{getProjectContent()}</div>
      </div>
    </>
  );
}
