'use client';

import { PropsWithChildren } from 'react';

import { useIsClient } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

import { RecommendedSkeleton } from './recommended';
import { ToggleSkeleton } from './toggle';

export function Wrapper({ children }: PropsWithChildren) {
  const isClient = useIsClient();
  const { collapsed } = useSidebar();

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

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
