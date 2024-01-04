'use client';

import { useMemo, useTransition } from 'react';

import { toast } from 'sonner';

import { onBlock } from '@/actions/block';
import { onFollow, onUnfollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';

interface ActionsProps {
  userId: string;
  isFollowing: boolean;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const { followUser, unfollowUser, blockUser } = useMemo(
    () => ({
      followUser() {
        startTransition(() => {
          onFollow(userId)
            .then(({ following }) => toast.success(`You are following ${following.username}`))
            .catch(() => toast.error('Something went wrong'));
        });
      },
      unfollowUser() {
        startTransition(() => {
          onUnfollow(userId)
            .then(({ following }) => toast.success(`You have unfollowed ${following.username}`))
            .catch(() => toast.error('Something went wrong'));
        });
      },
      blockUser() {
        startTransition(() => {
          onBlock(userId)
            .then(data =>
              toast.success(
                data ? `You have blocked ${data.blocked.username}` : 'You have blocked the user',
              ),
            )
            .catch(() => toast.error('Something went wrong'));
        });
      },
    }),
    [userId],
  );

  return (
    <>
      <Button
        disabled={isPending}
        variant="primary"
        onClick={isFollowing ? unfollowUser : followUser}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={blockUser} disabled={isPending}>
        Block
      </Button>
    </>
  );
}
