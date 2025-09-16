"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

const Library = ({ songs, accessToken }) => {
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs, accessToken); // pass token if needed

  const handleUpload = () => {
    // With Spotify OAuth-only flow, no upload feature
    // You can remove or disable upload or show info/alternative
    alert("Uploading songs is not supported with Spotify playback.");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleUpload}
          className="text-neutral-400 cursor-not-allowed opacity-50"
          title="Uploading not supported with Spotify playback"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            data={song}
            onClick={() => onPlay(song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
