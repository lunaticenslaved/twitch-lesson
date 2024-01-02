import { PropsWithChildren } from 'react';

import { Navbar } from './_components/navbar/index';

export default function BrowseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}
