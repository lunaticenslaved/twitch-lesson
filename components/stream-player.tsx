'use client';

import { Stream, User } from '@prisma/client';

import { useViewerToken } from '@/hooks/use-viewer-token';

interface StreamPlayerProps {
  user: User;
  stream: Stream;
  isFollowing: boolean;
}

export function StreamPlayer({ user }: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }

  return <div>Allowed to watch the stream</div>;
}
