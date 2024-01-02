'use client';

import { useCallback, useTransition } from 'react';

import { toast } from 'sonner';

import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';

interface ActionsProps {
  userId: string;
  isFollowing: boolean;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const unfollowUser = useCallback(() => {
    startTransition(() => {
      onUnfollow(userId)
        .then(({ following }) => toast.success(`You have unfollowed ${following.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  }, [userId]);

  const followUser = useCallback(() => {
    startTransition(() => {
      onFollow(userId)
        .then(({ following }) => toast.success(`You are following ${following.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  }, [userId]);

  return (
    <Button
      disabled={isPending}
      variant="primary"
      onClick={isFollowing ? unfollowUser : followUser}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
