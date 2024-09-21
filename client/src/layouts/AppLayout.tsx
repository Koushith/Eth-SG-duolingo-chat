import { Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useUser } from "@/context/user.context";

export const RootLayout = () => {
  const { setTheme } = useTheme();
  const { user } = useUser()
  const navigate = useNavigate()
  console.log("user from context", user)
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="container sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            to={""}
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            to={""}
          >
            Home
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            to={"/profile"}
          >
            Profile
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            to={"/settings"}
          >
            Settings
          </Link>
          
        </nav>
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
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                to={""}
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link className="hover:text-foreground" to={""}>
                Home
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                to={""}
              >
                About
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                to={""}
              >
                Developers
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                to={""}
              >
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative hidden">
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 shrink-0 rounded-l-none"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
          {user ? (
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button> */}
             
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </header>
      <main className="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};
