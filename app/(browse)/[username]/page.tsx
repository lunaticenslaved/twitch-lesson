import { notFound } from 'next/navigation';

import { StreamPlayer } from '@/components/stream-player';
import { isBlockedByUser } from '@/lib/block-service';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params: { username } }: UserPageProps) {
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedByUser(user.id);

  if (isBlockedByThisUser) {
    notFound();
  }

  return <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />;
}
