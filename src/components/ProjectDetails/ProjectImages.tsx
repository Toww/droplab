import { JSX } from "react";
import { TProject } from "../../projects/projectsList";

type TProps = {
  marginTop: number;
  project: TProject;
};

export default function ProjectImages({
  project,
  marginTop
}: TProps): JSX.Element {
  return (
    <div
      style={{ marginTop: marginTop }}
      className="relative mb-12 w-full space-y-6"
    >
      {project.imgFiles?.map((imgFileNumbers: string | string[]) => {
        if (typeof imgFileNumbers === "string") {
          return (
            <img
              className="rounded"
              src={`/images/${project.id}/${imgFileNumbers}.jpg`}
              alt={`${project.title} picture ${imgFileNumbers}`}
            />
          );
        } else {
          return (
            <div className="grid w-full max-w-full grid-cols-2 gap-6">
              {imgFileNumbers.map((num) => {
                return (
                  <img
                    className="rounded"
                    src={`/images/${project.id}/${num}.jpg`}
                    alt={`${project.title} picture ${num}`}
                  />
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
}
