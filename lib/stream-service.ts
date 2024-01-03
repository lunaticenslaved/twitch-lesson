import { db } from '@/lib/db';

export function getStreamByUserId(userId: string) {
  return db.stream.findUnique({
    where: { userId },
  });
}
