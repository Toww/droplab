import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type TProject = { filename: string; title: string };

type AppStoreState = {
  phase: "loading" | "ready" | null;
  hoveredProject: TProject | null;
  projects: TProject[];
};

type AppStoreActions = {
  startLoading: () => void;
  endLoading: () => void;
  updateHoveredProject: (project: number | null) => void;
};

export default create<AppStoreState & AppStoreActions>()(
  subscribeWithSelector((set) => ({
    phase: null,
    hoveredProject: null,
    projects: [
      { filename: "bassodrome", title: "Bassodrome" },
      { filename: "diploma", title: "Diploma Thesis" },
      { filename: "pinata", title: "Piñata Radio" },
      { filename: "bassodrome", title: "Bassodrome" },
      { filename: "diploma", title: "Diploma Thesis" },
      { filename: "pinata", title: "Piñata Radio" },
    ],
    updateHoveredProject: (projectIndex) =>
      set((state) => {
        return {
          hoveredProject:
            projectIndex !== null ? state.projects[projectIndex] : null,
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
      }),
  })),
);
