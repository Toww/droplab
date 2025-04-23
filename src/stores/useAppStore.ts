import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import projectsList, { TProject } from "@projects/projectsList";

type AppStoreState = {
  showPerf: boolean;
  projects: TProject[];
  introLength: number;
  nextProject: TProject | null;
  introStartTime: number;
  hoveredProject: TProject | null;
  previousProject: TProject | null;
  phase: "loading" | "intro" | "ready" | null;
};

type AppStoreActions = {
  endIntro: () => void;
  endLoading: () => void;
  startLoading: () => void;
  updateShowPerf: () => void;
  updateProjectNav: (projectIndex: number | null) => void;
  updateHoveredProject: (projectIndex: number | null) => void;
};

export default create<AppStoreState & AppStoreActions>()(
  subscribeWithSelector((set) => ({
    phase: null,
    showPerf: false,
    nextProject: null,
    introLength: 6000,
    introStartTime: 0,
    hoveredProject: null,
    previousProject: null,
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
          return { phase: "intro", introStartTime: new Date().getTime() };
        }
        return {};
      }),
    endIntro: () =>
      set((state) => {
        if (state.phase === "intro") {
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
    updateProjectNav: (projectIndex) => {
      if (projectIndex !== null) {
        set((state) => {
          return {
            nextProject: state.projects[projectIndex + 1] || null,
            previousProject: state.projects[projectIndex - 1] || null
          };
        });
      } else {
        set(() => ({
          nextProject: null,
          previousProject: null
        }));
      }
    }
  }))
);
