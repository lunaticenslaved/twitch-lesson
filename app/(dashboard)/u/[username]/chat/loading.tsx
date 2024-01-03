import { ToggleCardSkeleton } from '@/app/(dashboard)/u/[username]/chat/_components/toggle-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatLoadingPage() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
}
