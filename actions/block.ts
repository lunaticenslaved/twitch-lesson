'use server';

import { revalidatePath } from 'next/cache';

import { blockUser, unblockUser } from '@/lib/block-service';

export async function onBlock(userId: string) {
  try {
    // TODO: Adapt to disconnect from livestream
    // TODO: allow ability to kick the guest
    const data = await blockUser(userId);

    revalidatePath('/');
    revalidatePath(`/${data.blocked.username}`);

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
