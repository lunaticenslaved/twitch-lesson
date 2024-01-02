import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

export async function isBlockedByUser(userId: string): Promise<boolean> {
  try {
    const self = await getSelf();

    if (self.id === userId) {
      return false;
    }

    const otherUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!otherUser) {
      throw new Error('User not found');
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: otherUser.id,
          blockerId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch  {
    return false;
  }
}

export async function isBlockingUser(userId: string) {

}

export async function blockUser(userId: string) {
  const self = await getSelf();

  if (self.id === userId) {
    throw new Error('Cannot block yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error('Already blocked');
  }

  const block = await db.block.create({
    data: {
      blockedId: otherUser.id,
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
}

export async function unblockUser(userId: string) {
  const self = await getSelf();

  if (self.id === userId) {
    throw new Error('Cannot unblock yourself');
  }

  const otherUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!otherUser) {
    throw new Error('User not found');
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
    include: { blocked: true },
  });

  if (!existingBlock) {
    throw new Error('Not blocked');
  }

  return await db.block.delete({
    where: { id: existingBlock.id },
    include: { blocked: true },
  });
}
