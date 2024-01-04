'use server';

import { RoomServiceClient } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import { blockUser, unblockUser } from '@/lib/block-service';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
);

export async function onBlock(userId: string) {
  try {
    const self = await getSelf();

    // TODO: Adapt to disconnect from livestream
    // TODO: allow ability to kick the guest

    // When the user is a guest return null
    const data = await blockUser(userId).catch(() => null);

    await roomService.removeParticipant(self.id, userId).catch(() => {
      // When the user is not in the room
    });

    revalidatePath(`/u/${self.username}/community`);

    return data;
  } catch (error) {
    throw new Error('Internal error');
  }
}

export async function onUnblock(userId: string) {
  try {
    const data = await unblockUser(userId);

    revalidatePath('/');
    revalidatePath(`/${data.blocked.username}`);

    return data;
  } catch (error) {
    throw new Error('Internal error');
  }
}
