import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import projectsList, { TProject } from "@projects/projectsList";

export type TNavDirection = "left" | "right" | null;

type AppStoreState = {
  showPerf: boolean;
  projects: TProject[];
  introLength: number;
  introStartTime: number;
  hoveredProject: TProject | null;
  previousProject: TProject | null;
  nextProject: TProject | null;
  navDirection: TNavDirection;
  phase: "loading" | "intro" | "ready" | null;
};

type AppStoreActions = {
  endIntro: () => void;
  startLoading: () => void;
  endLoading: (location: string) => void;
  updateShowPerf: () => void;
  updateNavDirection: (direction: TNavDirection) => void;
  updateProjectNav: (projectIndex: number | null) => void;
  updateHoveredProject: (projectIndex: number | null) => void;
};

export default create<AppStoreState & AppStoreActions>()(
  subscribeWithSelector((set) => ({
    phase: null,
    showPerf: false,
    introLength: 5000,
    introStartTime: 0,
    hoveredProject: null,
    previousProject: null,
    nextProject: null,
    navDirection: null,
    projects: projectsList,
    startLoading: () =>
      set((state) => {
        if (state.phase === null) {
          return { phase: "loading" };
        }
        return {};
      }),
    endLoading: (location) =>
      set((state) => {
        if (state.phase === "loading" && location === "/") {
          return { phase: "intro", introStartTime: new Date().getTime() };
        } else if (state.phase === "loading") {
          return {
            phase: "ready"
          };
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
    updateNavDirection: (direction) => {
      set(() => {
        return {
          navDirection: direction
        };
      });
    },
    updateProjectNav: (projectIndex) => {
      if (projectIndex !== null) {
        set((state) => {
          const projects = state.projects;

          const getPreviousProject = () => {
            if (projectIndex === 0) {
              return projects[projects.length - 1];
            } else {
              return projects[projectIndex - 1];
            }
          };

          const getNextProject = () => {
            if (projectIndex === projects.length - 1) {
              return projects[0];
            } else {
              return projects[projectIndex + 1];
            }
          };

          return {
            nextProject: getNextProject(),
            previousProject: getPreviousProject()
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
