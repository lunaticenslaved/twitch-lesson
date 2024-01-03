import { useCallback } from 'react';

import { Volume1, Volume2, VolumeX } from 'lucide-react';

import { Slider } from '@/components/ui/slider';

import { Hint } from '../hint';

interface VolumeControlProps {
  onToggle(): void;
  onChange(value: number): void;
  value: number;
}

export function VolumeControl({ onChange, onToggle, value }: VolumeControlProps) {
  const isMuted = value === 0;
  const isAboveHalf = value > 500;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? 'Unmute' : 'Mute';

  const handleChange = useCallback(
    (value: number[]) => {
      onChange(value[0]);
    },
    [onChange],
  );

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
          <Icon className="h-6 w-6" />
        </button>
      </Hint>

      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
}
