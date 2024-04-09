"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { signout } from "@/actions/auth";

export const LogoutButton = () => {
  return (
    <Button className="w-full" onClick={() => signout()}>
      Logg ut
    </Button>
  );
};
