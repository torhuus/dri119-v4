import { Token, getToken } from "@/actions/auth";
import RoleSwitcher from "./forms/role-switcher-form";
import Navigation from "./navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const Header = async () => {
  const token = (await getToken()) as Token;

  // TODO: Fix mobile menu button disappearing when mobile menu open, causing shift of header layout
  return (
    <header className="grid grid-cols-3 items-center  border-b py-3 px-4">
      <div className="mr-auto col-span-1">
        <Navigation token={token} />
      </div>
      <div className="mx-auto col-span-1">
        <Link href="/app" className="text-2xl font-semibold">
          {token.exerciseName.length > 10
            ? token.exerciseName.slice(0, 9) + "..."
            : token.exerciseName}
        </Link>
      </div>
      <div className="ml-auto col-span-1">
        <Button asChild variant="outline">
          <Link href="/app/tickets/new">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
