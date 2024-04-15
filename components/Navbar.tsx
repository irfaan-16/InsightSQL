"use client";
import Link from "next/link";
import { CircleUserRound, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="relative p-4 bg-zinc-950 text-white flex justify-between items-center shadow-sm shadow-white">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">InsightSQL</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/docs/sql/sql_where">
            <h4>SQL Tutorial</h4>
          </Link>
          <Link href="/docs/plsql/plsql_procedures">
            <h4>PL/SQL Tutorial</h4>
          </Link>
        </div>
      </div>

      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none bg-zinc-900 p-2 rounded-md hover:bg-zinc-700 transition-all">
            <div className="flex gap-2 items-center">
              <Image
                src={session.user.image as string}
                height={40}
                width={40}
                alt="User Profile"
                className="rounded-full"
              />
              <p>{session.user.name}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36 bg-zinc-950 text-zinc-50">
            <DropdownMenuLabel>Profile Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/user/${session.user.email}`}>
                <DropdownMenuItem className="cursor-pointer mb-1">
                  <CircleUserRound size={18} className="mr-2" />
                  <p>Profile</p>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="border-none cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut size={18} className="mr-2" />
                <Button
                  variant="destructive"
                  className="max-w-24 text-xs max-h-[1.8rem] py-0"
                >
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button onClick={() => signIn("google", { redirect: false })}>
          Sign in
        </button>
      )}
    </nav>
  );
};

export default Navbar;
