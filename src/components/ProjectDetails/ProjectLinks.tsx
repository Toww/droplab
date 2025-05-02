import { JSX } from "react";
import { TProjectLink } from "@projects/projectsList";

type TProps = {
  links: TProjectLink[];
};

export default function ProjectLinks({ links }: TProps): JSX.Element {
  return (
    <div className="flex gap-4">
      {links.map((link, index) => (
        <a
          target="_blank"
          href={link.url}
          className="leading-none underline"
          key={`projectLink-${index}`}
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}
