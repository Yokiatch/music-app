"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";

const SongItem = ({ onClick, data, key }) => {
  const imagePath = data.image_path || "/images/music-placeholder.png";
  
  return (
    <div 
      onClick={onClick}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <div className="flex items-center justify-center bg-green-500 p-4 drop-shadow-md rounded-full opacity-0 group-hover:opacity-100 transition">
          <FaPlay className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default SongItem;
