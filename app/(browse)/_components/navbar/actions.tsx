import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export async function Actions() {
  const user = await currentUser();

  return (
    <div className="felx items-center justify-end gap-x-2 lg:ml-2">
      {!user ? (
        <SignInButton>
          <Button variant="primary">Login</Button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild>
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}
