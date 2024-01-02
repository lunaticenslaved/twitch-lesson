'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

export function Container({ children }: PropsWithChildren) {
  const { collapsed, onCollapse, onExpand } = useSidebar();
  const matches = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn('flex-1', {
        'ml-[70px]': collapsed,
        'ml-[70px] lg:ml-60': !collapsed,
      })}>
      {children}
    </div>
  );
}
