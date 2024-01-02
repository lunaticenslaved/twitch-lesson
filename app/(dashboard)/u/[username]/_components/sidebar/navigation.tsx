'use client';

import { useMemo } from 'react';

import { useUser } from '@clerk/nextjs';
import { FullscreenIcon, KeyRound, MessageSquare, UsersIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavItem, NavItemSkeleton } from './nav-item';

export function Navigation() {
  const pathname = usePathname();
  const { user } = useUser();
  const routes = useMemo(
    () => [
      {
        label: 'Stream',
        href: `/u/${user?.username}`,
        icon: FullscreenIcon,
      },
      {
        label: 'Keys',
        href: `/u/${user?.username}/keys`,
        icon: KeyRound,
      },
      {
        label: 'Chat',
        href: `/u/${user?.username}/chat`,
        icon: MessageSquare,
      },
      {
        label: 'Community',
        href: `/u/${user?.username}/community`,
        icon: UsersIcon,
      },
    ],
    [user?.username],
  );

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {routes.map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map(({ label, href, icon }) => (
        <NavItem key={label} label={label} icon={icon} href={href} isActive={pathname === href} />
      ))}
    </ul>
  );
}
