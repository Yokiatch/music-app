"use client";

import { useState } from "react";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";


const MediaItem = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const [imgSrc, setImgSrc] = useState(imageUrl || "/images/liked.png");

  const handleClick = () => {
    if (onClick) return onClick(data.id);
  };

  const handleImageError = () => {
    setImgSrc("/images/liked.png");
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div
        className="relative h-[48px] w-[48px] rounded-md overflow-hidden flex-shrink-0"
        style={{ position: "relative" }}
      >
        <Image
          src={imgSrc}
          alt={data.name || "Media Item"}
          fill
          className="object-cover"
          onError={handleImageError}
          priority={false}
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.name || "Untitled"}</p>
        <p className="text-neutral-400 text-sm truncate">
          {data.artists?.[0]?.name || "Unknown Artist"}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
