import { PropsWithChildren } from 'react';

import { Logo } from './_components/logo';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex items-center flex-col justify-center h-full w-full space-y-6">
      <Logo />
      {children}
    </main>
  );
}
