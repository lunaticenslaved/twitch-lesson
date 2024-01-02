import { create } from 'zustand';

interface ICreatorSidebarStore {
  collapsed: boolean;
  onExpand(): void;
  onCollapse(): void;
}

export const useCreatorSidebar = create<ICreatorSidebarStore>(set => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));
