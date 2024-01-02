'use client';

import { User } from '@prisma/client';

import { useSidebar } from '@/store/use-sidebar';

import { UserItem, UserItemSkeleton } from './user-item';

interface RecommendedProps {
  data: User[];
}

export function Recommended({ data }: RecommendedProps) {
  const { collapsed } = useSidebar();

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <h3 className="text-sm text-muted-foreground">Recommended</h3>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map(user => (
          <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} isLive />
        ))}
      </ul>
    </div>
  );
}

export function RecommendedSkeleton() {
  return (
    <ul className="px-2">{[...Array(3).map((_, index) => <UserItemSkeleton key={index} />)]}</ul>
  );
}
