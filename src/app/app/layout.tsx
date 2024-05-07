import Link from "next/link";
import {
  Home,
  HomeIcon,
  LineChart,
  Menu,
  MessageCircle,
  Plus,
  Ticket,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Token, getToken } from "@/actions/auth";
import {
  DesktopNavigationLink,
  MobileNavigationLink,
} from "@/components/v2/navigation-links";
import { LogoutButton } from "@/components/v2/logout-button";
import { RoleSwitcher } from "@/components/v2/role-switcher";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await getToken()) as Token;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/app" className="flex items-center gap-2 font-semibold">
              {token.exerciseName}
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <DesktopNavigationLink url="/app">
                <Home className="h-4 w-4" />
                Dashboard
              </DesktopNavigationLink>
              <DesktopNavigationLink url="/app/tickets">
                <Ticket className="h-4 w-4" />
                Henvendelser
              </DesktopNavigationLink>
              <DesktopNavigationLink url="/app/reports">
                <LineChart className="h-4 w-4" />
                Rapporter
              </DesktopNavigationLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <div className="flex flex-col gap-4">
              <RoleSwitcher token={token} />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/app"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  {token.exerciseName}
                </Link>
                <MobileNavigationLink url="/app">
                  <HomeIcon className="h-6 w-6" />
                  Dashboard
                </MobileNavigationLink>
                <MobileNavigationLink url="/app/tickets">
                  <Ticket className="h-6 w-6" />
                  Henvendelser
                </MobileNavigationLink>
                <MobileNavigationLink url="/app/reports">
                  <LineChart className="h-6 w-6" />
                  Rapporter
                </MobileNavigationLink>
              </nav>
              <div className="flex flex-col gap-4 mt-auto">
                <RoleSwitcher token={token} />
                <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
          <div className="capitalize">
            <p className="text-sm font-medium">
              {token.activeArea.replaceAll("_", " ").toLowerCase()}
            </p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" size="icon" asChild>
              <Link href="/app/tickets/new">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
