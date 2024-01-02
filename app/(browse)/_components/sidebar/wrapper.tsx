'use client';

import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

import { Toggle } from './toggle';

export function Wrapper({ children }: PropsWithChildren) {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50',
        {
          'w-[70px]': collapsed,
        },
      )}>
      <Toggle />
      {children}
    </aside>
  );
}
