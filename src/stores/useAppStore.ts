import * as THREE from 'three'
import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'

type AppStoreState = {
  phase: "loading" | "ready" | null;
  cameraPosition: {
    initial: THREE.Vector3,
    loadingEnd: THREE.Vector3,
  }
};

type AppStoreActions = {
  startLoading: () => void;
  endLoading: () => void;
};

export default create<AppStoreState & AppStoreActions>()(subscribeWithSelector((set) => ({
  phase: null,
  cameraPosition: {
    initial: new THREE.Vector3(0,5,0),
    loadingEnd: new THREE.Vector3(0,0,5)
  },
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
