import { TProjectVideo } from "@projects/projectsList";

type TProps = {
  video: TProjectVideo;
};

export default function ({ video }: TProps) {
  return (
    <div
      className="gsap-stagger relative mt-10 w-full xl:m-0 xl:p-0"
      style={{ paddingBottom: "56.25%" }}
    >
      <iframe
        className="absolute top-0 left-0 m-0 h-full w-full border-0 p-0"
        style={{ pointerEvents: "auto" }}
        src={video.src}
        title={video.title}
      ></iframe>
    </div>
  );
}
