import { TProjectVideo } from "@projects/projectsList";

type TProps = {
  video: TProjectVideo;
};

export default function ({ video }: TProps) {
  return (
    <div className="gsap-stagger relative mt-0 max-h-screen w-full">
      <iframe
        className="absolute top-0 left-0 h-full w-full border-0"
        src={video.src}
        title={video.title}
      ></iframe>
    </div>
  );
}
