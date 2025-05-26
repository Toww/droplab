import { useState, useEffect, JSX, RefObject } from "react";
import { TProject } from "@projects/projectsList";

type TProps = {
  project: TProject;
  projectTypeRef: RefObject<HTMLHeadingElement | null>;
};

export default function ProjectImages({
  project,
  projectTypeRef
}: TProps): JSX.Element {
  // States
  const [imagesMarginTop, setImagesMarginTop] = useState<number>(0);

  // Variables
  const hasMultipleImages = project.imgFiles && project.imgFiles.length > 1;

  // Placing images vertically on desktop
  useEffect(() => {
    if (
      hasMultipleImages &&
      projectTypeRef.current &&
      window.innerWidth >= 1024
    ) {
      setImagesMarginTop(projectTypeRef.current.getBoundingClientRect().top);
    } else {
      setImagesMarginTop(0);
    }
  }, [projectTypeRef.current, project.imgFiles, window.innerWidth]);

  // Getters
  const getProjectImages = () => {
    // Mapping the list of names
    // If an element is a string it's a single image,
    // if it is an array it's multiple images on the same line.
    return project.imgFiles?.map((imgLine) => {
      if (typeof imgLine === "string") {
        return (
          <img
            className="gsap-stagger rounded"
            key={`${project.id}-img-${imgLine}`}
            src={`/images/${project.id}/${imgLine}.jpg`}
            alt={`${project.title} picture ${imgLine}`}
          />
        );
      } else if (typeof imgLine === "object") {
        return (
          <div
            key={`${project.id}-imgs-${imgLine.join("-")}`}
            className="grid w-full max-w-full gap-4 md:grid-cols-2"
          >
            {imgLine.map((num) => {
              return (
                <img
                  className="gsap-stagger rounded"
                  key={`${project.id}-img-${num}}`}
                  src={`/images/${project.id}/${num}.jpg`}
                  alt={`${project.title} picture ${num}`}
                />
              );
            })}
          </div>
        );
      }
    });
  };

  return (
    <div
      style={imagesMarginTop ? { marginTop: imagesMarginTop } : undefined}
      className={`relative mt-8 flex w-full flex-col gap-6 lg:mt-0 ${hasMultipleImages ? "mb-16" : "justify-center"}`}
    >
      {getProjectImages()}
    </div>
  );
}
