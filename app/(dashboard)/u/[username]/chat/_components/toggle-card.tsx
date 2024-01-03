'use client';

import { useCallback, useTransition } from 'react';

import { Stream } from '@prisma/client';
import { toast } from 'sonner';

import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

type FieldType = keyof Pick<Stream, 'isChatDelayed' | 'isChatEnabled' | 'isChatFollowersOnly'>;

interface ToggleCardProps {
  field: FieldType;
  label: string;
  value: boolean;
}

export function ToggleCard({ field, label, value }: ToggleCardProps) {
  const [isPending, startTransition] = useTransition();

  const onChange = useCallback(
    (newValue: boolean) => {
      startTransition(() => {
        updateStream({ [field]: newValue })
          .then(() => toast.success('Chat settings updated'))
          .catch(() => toast.error('Something went wrong'));
      });
    },
    [field],
  );

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch checked={value} onCheckedChange={onChange} disabled={isPending}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function ToggleCardSkeleton() {
  return <Skeleton className="rounded-xl p-10 w-full" />;
}
