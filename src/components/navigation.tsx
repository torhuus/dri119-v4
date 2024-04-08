"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import FeedbackDialog from '@/components/feedback-dialog';
import { Button } from "@/components/ui/button";
import { useReducer, useState } from "react";
import { Home, Menu, TicketIcon, X } from "lucide-react";
import Link from "next/link";
import { Token, signout } from "@/actions/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import RoleSwitcher from "./forms/role-switcher-form";
import { Role } from "@prisma/client";
import { other, priority, status } from "@/data/navigation";
import path from "path";

const Navigation = ({ token }: { token: Token }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            onClick={() => setOpen(false)}
            href="/app"
            className="flex items-center gap-2 text-lg font-semibold mb-4"
          >
            {token.exerciseName}
          </Link>
          <MobileLinks token={token} setOpen={setOpen} />
        </nav>
        <div className="mt-auto">{<RoleSwitcher token={token} />}</div>
        <div>
          <Button
            variant="secondary"
            onClick={() => signout()}
            className="flex items-center gap-2 w-full"
          >
            <X className="h-4 w-4" /> Logg ut
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;

const MobileLinks = ({ token, setOpen }: { token: Token; setOpen: any }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let activeClass = "bg-muted text-foreground";
  let defaultClass =
    " flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";

  return (
    <div className="h-full">
      <Link
        onClick={() => setOpen(false)}
        href="/app"
        className={cn(defaultClass, pathname === "/app" && activeClass)}
      >
        <Home className="h-4 w-4" />
        Oversikt
      </Link>
      {token.role === "SUPPORT" && (
        <>
          <h3 className="font-semibold mt-4">Status</h3>
          {status.map((status) => {
            return (
              <Link
                onClick={() => setOpen(false)}
                href={status.href}
                key={status.href}
                className={cn(
                  defaultClass,
                  pathname + "?" + searchParams === status.href && activeClass,
                  ""
                )}
              >
                <TicketIcon className="h-4 w-4" />
                {status.title}
              </Link>
            );
          })}
          <h3 className="font-semibold mt-4">Prioritet</h3>
          {priority.map((status) => {
            return (
              <Link
                key={status.href}
                onClick={() => setOpen(false)}
                href={status.href}
                className={cn(
                  defaultClass,
                  pathname + "?" + searchParams === status.href && activeClass
                )}
              >
                <TicketIcon className="h-4 w-4" />
                {status.title}
              </Link>
            );
          })}
          <h3 className="font-semibold mt-4">Annet</h3>
          {other.map((status) => {
            return (
              <Link
                onClick={() => setOpen(false)}
                key={status.href}
                href={status.href}
                className={cn(
                  defaultClass,
                  pathname + "?" + searchParams === status.href && activeClass
                )}
              >
                <TicketIcon className="h-4 w-4" />
                {status.title}
              </Link>
            );
          })}
        </>
      )}
      <div className="mt-auto">{/* <RoleSwitcher token={token} /> */}</div>
    </div>
  );
};
