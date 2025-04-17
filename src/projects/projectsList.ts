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
  type?: "VJing" | "Graphic design" | "Dev";
  links?: TProjectLink[];
  video?: TProjectVideo;
};

const projectsList: TProject[] = [
  {
    title: "Bassodrome Festival 3.0",
    id: "bassodrome",
    type: "VJing",
    description:
      "VJing / Mapping for the Bassodrome Festival 3.0 realised in collaboration with Benjamin Montjean.",
    video: {
      src: "https://player.vimeo.com/video/107347491?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      title: "VJing / Mapping - Bassodrome Festival 3.0"
    }
  },
  {
    title: "Diploma Thesis",
    id: "diploma",
    type: "Graphic design",
    description:
      "Final diploma thesis (in french) focusing on simplicity and sobriety in graphic design. It focuses on the challenges it represents to bring the light on information and emotion throught simplicity.",
    links: [
      {
        url: "/documents/memoire.pdf",
        text: "Download PDF"
      }
    ],
    imgFiles: ["01", ["02", "03"], "04", ["05", "06"], "07", ["08", "09"], "10"]
  }
];

export default projectsList;
