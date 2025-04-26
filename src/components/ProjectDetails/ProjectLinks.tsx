import { JSX } from "react";
import { TProjectLink } from "@projects/projectsList";

type TProps = {
  links: TProjectLink[];
};

export default function ProjectLinks({ links }: TProps): JSX.Element {
  return (
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a
          target="_blank"
          href={link.url}
          className="underline"
          key={`projectLink-${index}`}
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}
