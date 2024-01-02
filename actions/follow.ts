'use server';

import { revalidatePath } from 'next/cache';

import { followUser, unfollowUser } from '@/lib/follow-service';

export async function onFollow(userId: string) {
  try {
    const data = await followUser(userId);

    revalidatePath('/');
    revalidatePath(`/${data.following.username}`);

    return data;
  } catch (error) {
    throw new Error('Internal error');
  }
}

export async function onUnfollow(userId: string) {
  try {
    const data = await unfollowUser(userId);

    revalidatePath('/');
    revalidatePath(`/${data.following.username}`);

    return data;
  } catch (error) {
    throw new Error('Internal error');
  }
}
