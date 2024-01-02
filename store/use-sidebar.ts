import { create } from 'zustand';

interface ISidebarStore {
  collapsed: boolean;
  onExpand(): void;
  onCollapse(): void;
}

export const useSidebar = create<ISidebarStore>(set => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));
