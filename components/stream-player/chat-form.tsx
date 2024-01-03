'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { ChatInfo } from './chat-info';

interface ChatFormProps {
  onSubmit(): void;
  onChange(value: string): void;
  value: string;
  isHidden: boolean;
  isEnabled: boolean;
  isDelayed: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
}

export function ChatForm({
  value,
  isFollowersOnly,
  isFollowing,
  isHidden,
  isDelayed,
  onSubmit,
  onChange,
}: ChatFormProps) {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleSubmit}>
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={e => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn('border-white/10', isFollowersOnly && 'rounded-t-none border-t-0')}
        />
      </div>
      <div>
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
}

export function ChatFormSkeleton() {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
}