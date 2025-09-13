"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user, userDetails } = useUser();

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
          <p>Email: {user?.email}</p>
          <p>Account created: {new Date(user?.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-xl mb-2">Music Library</h2>
        <div className="text-neutral-400">
          <p>All your uploaded songs and favorites are stored securely</p>
          <p>Connect to Spotify for additional music streaming</p>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
