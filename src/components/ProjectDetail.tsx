import useAppStore from "../stores/useAppStore";
import { useParams } from "react-router";

export default function ProjectDetail() {
  // Hooks
  const projectID = useParams().pid;
  const projects = useAppStore((state) => state.projects);
  const project = projects.find((project) => project.id === projectID);

  return (
    <div>Project page basics, here is a title example : ${project?.title}</div>
  );
}
