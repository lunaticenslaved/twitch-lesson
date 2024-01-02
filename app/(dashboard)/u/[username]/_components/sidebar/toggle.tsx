'use client';

import { ArrowLeftFromLineIcon, ArrowRightFromLine } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

export function Toggle() {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar();
  const label = collapsed ? 'Expand' : 'Collapse';

  if (collapsed) {
    return (
      <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
        <Hint label={label} side="right" asChild>
          <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
        </Hint>
      </div>
    );
  }

  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex justify-between items-center w-full">
      <p className="font-semibold text-primary">Dashboard</p>
      <Hint label={label} side="right" asChild>
        <Button onClick={onCollapse} variant="ghost" className="h-auto p-2">
          <ArrowLeftFromLineIcon className="h-4 w-4" />
        </Button>
      </Hint>
    </div>
  );
}
