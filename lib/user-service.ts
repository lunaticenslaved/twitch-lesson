import { db } from '@/lib/db';

export async function getUserByUsername(username: string) {
  return await db.user.findUnique({
    where: { username },
    include: {
      stream: true,
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
