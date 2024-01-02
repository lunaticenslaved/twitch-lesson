'use client';

import { Follow, User } from '@prisma/client';

import { useSidebar } from '@/store/use-sidebar';

import { UserItem, UserItemSkeleton } from './user-item';

interface FollowingProps {
  data: Array<Follow & { following: User }>;
}

export function Following({ data }: FollowingProps) {
  const collapsed = useSidebar(s => s.collapsed);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <h3 className="text-sm text-muted-foreground">Following</h3>
        </div>
      )}
      <ul className="space-y-2">
        {data.map(({ following: { id, username, imageUrl } }) => (
          <UserItem key={id} username={username} imageUrl={imageUrl} isLive={true} />
        ))}
      </ul>
    </div>
  );
}

export function FollowingSkeleton() {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array.from({ length: 3 }).map((_, i) => <UserItemSkeleton key={i} />)]}
    </ul>
  );
}
