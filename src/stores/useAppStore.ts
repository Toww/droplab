import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type TProject = { filename: string; title: string; id: string };

type AppStoreState = {
  phase: "loading" | "ready" | null;
  hoveredProject: TProject | null;
  projects: TProject[];
  showPerf: boolean;
};

type AppStoreActions = {
  startLoading: () => void;
  endLoading: () => void;
  updateShowPerf: () => void;
  updateHoveredProject: (project: number | null) => void;
};

export default create<AppStoreState & AppStoreActions>()(
  subscribeWithSelector((set) => ({
    phase: null,
    showPerf: false,
    hoveredProject: null,
    projects: [
      { filename: "bassodrome", title: "Bassodrome", id: "bassodrome" },
      { filename: "diploma", title: "Diploma Thesis", id: "diploma" },
      { filename: "pinata", title: "Piñata Radio", id: "pinata" },
      { filename: "bassodrome", title: "Bassodrome", id: "bassodrome2" },
      { filename: "diploma", title: "Diploma Thesis", id: "diploma2" },
      { filename: "pinata", title: "Piñata Radio", id: "pinata2" }
    ],
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
      })
  }))
);
