import { JSX } from "react";
import Portal from "@components/Models/Portal";

export type TProjectLink = {
  url: string;
  text: string;
};

export type TProjectVideo = {
  src: string;
  title: string;
};

export type TProjectImgFiles = (string | [string, string])[];

export type TProject = {
  id: string;
  title: string;
  imgFiles?: TProjectImgFiles;
  description: string;
  type?: string;
  links?: TProjectLink[];
  video?: TProjectVideo;
  model?: JSX.Element;
};

const projectsList: TProject[] = [
  {
    title: "Portal",
    id: "portal",
    type: "Dev | 3D",
    description:
      "Sculpting, baking and exporting of a portal made in Blender for integration as a 3D model in Three.js. This exercise is part of Bruno Simon's ThreeJS Journey course.",
    model: <Portal />
  },
  {
    title: "Marble Race",
    id: "marble",
    type: "Dev",
    description:
      "Final project from Bruno Simon's Three.js Journey, combining some of the techniques learned through the course. It uses React, Zustand, Three.js with React Three Fiber and Drei, and Rapier to handle physics.",
    links: [
      {
        url: "https://marble-race-iota.vercel.app/",
        text: "Play ! (desktop)"
      },
      {
        url: "https://github.com/Toww/marble-race",
        text: "View on Github"
      }
    ],
    imgFiles: ["01"]
  },
  {
    title: "Bassodrome Festival 3.0",
    id: "bassodrome",
    type: "VJing",
    description:
      "VJing / Mapping for the Bassodrome Festival 3.0, realised in collaboration with Benjamin Montjean.",
    video: {
      src: "https://player.vimeo.com/video/107347491?h=498591ad04",
      title: "VJing / Mapping - Bassodrome Festival 3.0"
    }
  },
  {
    title: "Diploma Thesis",
    id: "diploma",
    type: "Graphic design",
    description:
      "Final diploma thesis (in french), focusing on simplicity and sobriety in graphic design. It focuses on the challenges it represents to bring the light on information and emotion through simplicity.",
    links: [
      {
        url: "/documents/memoire.pdf",
        text: "Download PDF"
      }
    ],
    imgFiles: ["01", ["02", "03"], "04", ["05", "06"], "07", ["08", "09"], "10"]
  },
  {
    title: "Drop",
    id: "drop",
    type: "Dev | 3D",
    description:
      "The website you are visiting, made with Typescript, React, React Router, Zustand, Three.js with React Three Fiber and Drei, GSAP and TailwindCSS.",
    links: [
      {
        url: "https://github.com/Toww/droplab",
        text: "View on Github"
      }
    ],
    imgFiles: ["01"]
  }
];

export default projectsList;
