import { db } from '@/lib/db';

export async function getUserByUsername(username: string) {
  return await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true
        }
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });
}
