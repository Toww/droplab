import { JSX } from "react";
import { TProjectLink } from "@projects/projectsList";

type TProps = {
  links: TProjectLink[];
};

export default function ProjectLinks({ links }: TProps): JSX.Element {
  return (
    <div className="flex space-x-4">
      {links.map((link) => (
        <a href={link.url} className="underline" target="_blank">
          {link.text}
        </a>
      ))}
    </div>
  );
}
