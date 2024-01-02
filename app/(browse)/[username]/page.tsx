import { notFound } from 'next/navigation';

import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';

import { Actions } from './_components/actions';

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params: { username } }: UserPageProps) {
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>ID: {user.id}</p>
      <p>isFollowing: {String(isFollowing)}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
}