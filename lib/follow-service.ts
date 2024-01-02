import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

export async function isFollowingUser(userId: string): Promise<boolean> {
  try {
    const self = await getSelf();

    if (userId === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirstOrThrow({
      where: {
        followerId: self.id,
        followingId: userId,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
}

export async function followUser(userId: string) {
  const self = await getSelf();

  if (userId === self.id) {
    throw new Error('Cannot follow yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: userId,
    },
  });

  if (existingFollow) {
    throw new Error('Already following');
  }

  return await db.follow.create({
    data: {
      followerId: self.id,
      followingId: userId,
    },
    include: {
      following: true,
    },
  });
}

export async function unfollowUser(userId: string) {
  const self = await getSelf();

  if (userId === self.id) {
    throw new Error('Cannot unfollow yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: userId,
    },
  });

  if (!existingFollow) {
    throw new Error('Not following');
  }

  return await db.follow.delete({
    where: { id: existingFollow.id },
    include: {
      following: true,
    },
  });
}

export async function getFollowedUsers() {
  try {
    const self = await getSelf();

    return await db.follow.findMany({
      where: {
        followerId: self.id,
      },
      include: {
        following: true,
      },
    });
  } catch {
    return [];
  }
}
