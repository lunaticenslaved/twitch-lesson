'use client';

import { useCallback } from 'react';

import { MessageSquareIcon, UsersIcon } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

export function ChatVariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar();

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? UsersIcon : MessageSquareIcon;
  const label = isChat ? 'Community' : 'Go to chat';

  const onToggle = useCallback(() => {
    onChangeVariant(isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT);
  }, [isChat, onChangeVariant]);

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg:transparent">
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
}
