'use client';

import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

export function Wrapper({ children }: PropsWithChildren) {
  const { collapsed } = useCreatorSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50',
        {
          'w-[70px]': collapsed,
        },
      )}>
      {children}
    </aside>
  );
}
