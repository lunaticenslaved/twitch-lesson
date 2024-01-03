'use client';

import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CopyButton } from './copy-button';

interface KeyCardProps {
  value: string | null;
}

export function KeyCard({ value }: KeyCardProps) {
  const [isShow, setIsShow] = useState(false);

  const toggleShow = useCallback(() => {
    setIsShow(v => !v);
  }, []);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-4">
        <p className="font-semibold shrink-0">Stream key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ''}
              type={isShow ? 'text' : 'password'}
              placeholder="Stream key"
              disabled
            />
            <CopyButton value={value || ''} />
          </div>
          <Button size="sm" variant="link" onClick={toggleShow}>
            {isShow ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  );
}
