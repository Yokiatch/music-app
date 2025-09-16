"use client";

import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LikeButton = ({ songId, accessToken }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  // Check if track is saved by user on Spotify
  useEffect(() => {
    if (!accessToken || !songId) return;

    const checkIfLiked = async () => {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/me/tracks/contains?ids=${songId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!res.ok) throw new Error("Failed to check liked status");

        const data = await res.json();
        setIsLiked(data[0] || false);
      } catch (error) {
        toast.error(error.message);
      }
    };

    checkIfLiked();
  }, [songId, accessToken]);

  const LikeIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!accessToken) {
      toast.error("You must be logged in to like songs.");
      return;
    }

    try {
      if (isLiked) {
        // Remove from saved tracks
        const res = await fetch(
          `https://api.spotify.com/v1/me/tracks?ids=${songId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!res.ok) throw new Error("Failed to remove like");

        setIsLiked(false);
        toast.success("Removed from liked songs");
      } else {
        // Save track
        const res = await fetch(
          `https://api.spotify.com/v1/me/tracks?ids=${songId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!res.ok) throw new Error("Failed to like track");

        setIsLiked(true);
        toast.success("Liked!");
      }
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <LikeIcon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
