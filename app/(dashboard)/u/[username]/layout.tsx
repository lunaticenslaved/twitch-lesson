import { PropsWithChildren } from 'react';

import { redirect } from 'next/navigation';

import { getSelfByUsername } from '@/lib/auth-service';

import { Container } from './_components/container';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

interface CreatorLayoutProps extends PropsWithChildren {
  params: { username: string };
}

export default async function CreatorLayout({
  children,
  params: { username },
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(username);

  if (!self) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
