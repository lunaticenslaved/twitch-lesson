import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { Results, ResultsSkeleton } from './_components/results';

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default function SearchPage({ searchParams: { term } }: SearchPageProps) {
  if (!term) {
    redirect('/');
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={term} />
      </Suspense>
    </div>
  );
}
