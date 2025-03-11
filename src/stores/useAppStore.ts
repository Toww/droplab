import * as THREE from 'three'
import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'

type AppStoreState = {
  phase: "loading" | "ready" | null;
};

type AppStoreActions = {
  startLoading: () => void;
  endLoading: () => void;
};

export default create<AppStoreState & AppStoreActions>()(subscribeWithSelector((set) => ({
  phase: null,
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
})));
