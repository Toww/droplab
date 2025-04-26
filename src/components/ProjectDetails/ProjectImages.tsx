import { JSX } from "react";
import { TProject } from "@projects/projectsList";

type TProps = {
  marginTop: number;
  project: TProject;
};

export default function ProjectImages({
  project,
  marginTop
}: TProps): JSX.Element {
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
            className="grid w-full max-w-full grid-cols-2 gap-6"
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
      style={{ marginTop: marginTop }}
      className="relative mb-12 w-full space-y-6"
    >
      {getProjectImages()}
    </div>
  );
}
