"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/actions";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  async function handleLogout() {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      <div>hello</div>
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </Button>
    </>
  );
}
