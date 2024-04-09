"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DesktopNavigationLink = ({ children, url }: any) => {
  const pathname = usePathname();
  const activeClasses = "bg-muted text-primary";
  return (
    <Link
      href={url}
      className={cn(
        pathname === url && activeClasses,
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
};

export const MobileNavigationLink = ({ children, url }: any) => {
  const pathname = usePathname();
  const activeClasses = "bg-muted text-primary";
  return (
    <Link
      href={url}
      className={cn(
        pathname === url && activeClasses,
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
};
