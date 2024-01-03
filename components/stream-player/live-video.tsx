'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useEventListener } from 'usehooks-ts';

import { FullscreenControl } from './fullscreen-control';
import { VolumeControl } from './volume-control';

interface LiveVideoProps {
  participant: Participant;
}

export function LiveVideo({ participant }: LiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(track => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const handleFullscreenChange = useCallback(() => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setFullscreen(isCurrentlyFullscreen);
  }, []);

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  }, [isFullscreen]);

  const onVolumeChange = useCallback((value: number) => {
    setVolume(value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const newValue = volume === 0 ? 50 : 0;

    setVolume(newValue);

    if (videoRef.current) {
      videoRef.current.muted = newValue === 0;
      videoRef.current.volume = +newValue * 0.01;
    }
  }, [volume]);

  useEffect(() => {
    onVolumeChange(volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl onChange={onVolumeChange} onToggle={toggleMute} value={volume} />
          <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
        </div>
      </div>
    </div>
  );
}
