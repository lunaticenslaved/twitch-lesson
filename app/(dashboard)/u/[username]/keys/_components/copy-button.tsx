'use client';

import { useCallback, useState } from 'react';

import { CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  value?: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopied(false), 1000);
  }, [value]);

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button disabled={!value || isCopied} onClick={onCopy} variant="ghost" size="sm">
      <Icon className="h-4 w-4" />
    </Button>
  );
}
