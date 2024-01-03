'use server';

import { AccessToken } from 'livekit-server-sdk';
import { v4 } from 'uuid';

import { getSelf } from '@/lib/auth-service';
import { isBlockedByUser } from '@/lib/block-service';
import { getUserById } from '@/lib/user-service';

export async function createViewerToken(hostIdentify: string) {
  const self = await getSelf()
    .then(user => ({ id: user.id, username: user.username }))
    .catch(() => ({ id: v4(), username: `guest#${Math.floor(Math.random() * 1000)}` }));

  const host = await getUserById(hostIdentify);

  if (!host) {
    throw new Error('User not found');
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error('User is blocked');
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
    identity: isHost ? `host-${self.id}` : self.id,
    name: self.username,
  });

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return token.toJwt();
}
