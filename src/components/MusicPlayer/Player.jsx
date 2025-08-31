/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);

  // Play / Pause control
  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play().catch(() => {});
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  // Volume control
  useEffect(() => {
    if (ref.current) ref.current.volume = volume;
  }, [volume]);

  // Seek control
  useEffect(() => {
    if (ref.current) ref.current.currentTime = seekTime;
  }, [seekTime]);

  // Pick the best available audio src
  const audioSrc =
    activeSong?.hub?.actions?.find((a) => a.type === 'uri')?.uri ||
    activeSong?.hub?.options?.[0]?.actions?.[0]?.uri ||
    activeSong?.attributes?.previews?.[0]?.url || // <--- Apple Music preview fallback
    activeSong?.attributes?.preview?.url ||
    activeSong?.attributes?.url || // sometimes contains a link (not always audio)
    '';

  if (!audioSrc) {
    return <div className="text-white">No audio source available for this song.</div>;
  }

  return (
    <audio
      src={audioSrc}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;