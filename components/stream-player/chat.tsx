'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useMediaQuery } from 'usehooks-ts';

import { ChatCommunity } from '@/components/stream-player/chat-community';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import { ChatForm } from './chat-form';
import { ChatHeader } from './chat-header';
import { ChatList } from './chat-list';

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export function Chat({
  hostIdentity,
  hostName,
  viewerName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
}: ChatProps) {
  const { variant, onCollapse, onExpand } = useChatSidebar();
  const matches = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!send) return;

    send(value);
    setValue('');
  }, [send, value]);

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={sendMessage}
            value={value}
            onChange={setValue}
            isHidden={isHidden}
            isEnabled={isChatEnabled}
            isDelayed={isChatDelayed}
            isFollowersOnly={isChatFollowersOnly}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
      )}
    </div>
  );
}
