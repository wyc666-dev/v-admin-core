import { create } from "zustand";
import type { TabItem } from "@/routes/types";

interface LayoutState {
  isCollapse: boolean;
  visitedTabs: TabItem[];
  collapseMenu: () => void;
  addVisitedTab: (tab: TabItem) => void;
  removeVisitedTab: (path: string) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isCollapse: false,
  visitedTabs: [
    {
      path: "/home",
      title: "首页",
      affix: true,
    },
  ],
  collapseMenu: () => set((state) => ({ isCollapse: !state.isCollapse })),
  addVisitedTab: (tab) =>
    set((state) => {
      const exists = state.visitedTabs.some((item) => item.path === tab.path);
      return exists ? state : { visitedTabs: [...state.visitedTabs, tab] };
    }),
  removeVisitedTab: (path) =>
    set((state) => ({
      visitedTabs: state.visitedTabs.filter(
        (item) => item.path === "/home" || item.path !== path,
      ),
    })),
}));
