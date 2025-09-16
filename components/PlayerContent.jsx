"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

const PlayerContent = ({ song, accessToken }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [deviceId, setDeviceId] = useState(null);

  // Sync volume and playback state with Spotify player if needed
  useEffect(() => {
    if (player.playerInstance) {
      setDeviceId(player.deviceId);
      player.playerInstance.getCurrentState().then((state) => {
        if (!state) {
          setIsPlaying(false);
        } else {
          setIsPlaying(!state.paused);
        }
      });
    }
  }, [player]);

  // Play or pause the Spotify Web Playback SDK player
  const handlePlay = () => {
    if (!deviceId || !accessToken) return;
    if (isPlaying) {
      player.playerInstance.pause();
      setIsPlaying(false);
    } else {
      player.playerInstance.resume();
      setIsPlaying(true);
    }
  };

  // Play next track via context or direct API call
  const onPlayNext = () => {
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) return player.setId(player.ids[0]);
    return player.setId(nextSong);
  };

  // Play previous track via context or direct API call
  const onPlayPrevious = () => {
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) return player.setId(player.ids[player.ids.length - 1]);
    return player.setId(previousSong);
  };

  // Toggle mute by setting volume to 0 or previous volume
  const toggleMute = () => {
    if (!player.playerInstance) return;
    if (volume === 0) {
      player.playerInstance.setVolume(1);
      setVolume(1);
    } else {
      player.playerInstance.setVolume(0);
      setVolume(0);
    }
  };

  // Handle volume change slider
  const handleVolumeChange = (value) => {
    setVolume(value);
    if (player.playerInstance) {
      player.playerInstance.setVolume(value);
    }
  };

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} accessToken={accessToken} />
        </div>
      </div>
      <div
        className="flex md:hidden col-auto w-full justify-end items-center"
      >
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon className="text-black" size={30} />
        </div>
      </div>
      <div
        className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6"
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon size={34} onClick={toggleMute} className="cursor-pointer" />
          <Slider value={volume} onChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
