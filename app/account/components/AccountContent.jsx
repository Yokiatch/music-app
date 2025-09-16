"use client";

import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser(); // user has Spotify profile info

  useEffect(() => {
    if (!isLoading && !user) router.replace("/");
  }, [isLoading, user, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-7 px-6">
      <div className="mb-4">
        <h1 className="text-white text-3xl font-semibold">Account Settings</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-xl mb-2">Profile Information</h2>
        <div className="text-neutral-400">
          <p>Email: {user?.email || "Not available"}</p>
          <p>Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-xl mb-2">Music Library</h2>
        <div className="text-neutral-400">
          <p>Your favorites and playlists are managed via Spotify.</p>
          <p>Enjoy seamless music streaming with your connected Spotify account.</p>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
