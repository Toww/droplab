import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import projectsList, { TProject } from "../projects/projectsList";

type AppStoreState = {
  showPerf: boolean;
  projects: TProject[];
  previousProject: TProject | null;
  nextProject: TProject | null;
  hoveredProject: TProject | null;
  phase: "loading" | "ready" | null;
};

type AppStoreActions = {
  endLoading: () => void;
  startLoading: () => void;
  updateShowPerf: () => void;
  updateProjectNav: (projectIndex: number) => void;
  updateHoveredProject: (projectIndex: number | null) => void;
};

export default create<AppStoreState & AppStoreActions>()(
  subscribeWithSelector((set) => ({
    phase: null,
    showPerf: false,
    nextProject: null,
    previousProject: null,
    hoveredProject: null,
    projects: projectsList,
    startLoading: () =>
      set((state) => {
        if (state.phase === null) {
          return { phase: "loading" };
        }
        return {};
      }),
    endLoading: () =>
      set((state) => {
        if (state.phase === "loading") {
          return { phase: "ready" };
        }
        return {};
      }),
    updateShowPerf: () => {
      set((state) => {
        return {
          showPerf: !state.showPerf
        };
      });
    },
    updateHoveredProject: (projectIndex) =>
      set((state) => {
        return {
          hoveredProject:
            projectIndex !== null ? state.projects[projectIndex] : null
        };
      }),
    updateProjectNav: (projectIndex) =>
      set((state) => {
        return {
          nextProject: state.projects[projectIndex + 1] || null,
          previousProject: state.projects[projectIndex - 1] || null
        };
      })
  }))
);
