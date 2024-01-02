import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

export async function getRecommended() {
  const self = await getSelf().catch(() => undefined);

  if (self) {
    return await db.user.findMany({
      where: {
        AND: [
          {
            NOT: { id: self.id },
          },
          {
            NOT: { followedBy: { some: { followerId: self.id } } },
          },
          {
            NOT: { blockedBy: { some: { blockerId: self.id } } },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    return await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
