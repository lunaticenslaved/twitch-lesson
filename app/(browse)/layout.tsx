import { PropsWithChildren } from 'react';

import { Container } from './_components/container';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

export default function BrowseLayout({ children }: PropsWithChildren) {
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
