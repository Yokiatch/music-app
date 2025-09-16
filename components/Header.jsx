"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import Button from "./Button";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "streaming",
  "user-modify-playback-state",
  "user-read-playback-state",
].join(" ");

const getAccessToken = () => {
  // Get token from localStorage or other storage
  return localStorage.getItem("spotify_access_token");
};

const Header = ({ children, className }) => {
  const router = useRouter();
  const player = usePlayer();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
  }, []);

  const handleLogout = () => {
    // Clear stored access token on logout
    localStorage.removeItem("spotify_access_token");
    setAccessToken(null);
    player.reset();
    router.refresh();
    toast.success("Logged out from Spotify");
  };

  const handleSpotifyLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      SCOPES,
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className,
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {accessToken ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                Logout
              </Button>
              <Button className="bg-white" onClick={() => router.push("/account")}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-white px-6 py-2"
              onClick={handleSpotifyLogin}
            >
              Login with Spotify
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
