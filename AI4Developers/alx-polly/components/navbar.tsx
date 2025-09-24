"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { getSupabaseBrowser } from "@/lib/supabase/client";

const links = [
  { href: "/", label: "Home" },
  { href: "/polls", label: "Polls" },
  { href: "/polls/new", label: "New Poll" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  async function handleSignOut() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = "/auth/sign-in";
  }
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          ALX Polly
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-foreground/80 hover:text-foreground transition-colors",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 relative">
          {loading ? null : user ? (
            <UserMenu onSignOut={handleSignOut} displayName={user.user_metadata?.name || user.email || "User"} />
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function initialsOf(nameOrEmail: string): string {
  const fromEmail = nameOrEmail.split("@")[0];
  const source = nameOrEmail.includes("@") ? fromEmail : nameOrEmail;
  const parts = source.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "U";
  const second = parts.length > 1 ? parts[1][0] : "";
  return (first + second).toUpperCase();
}

function UserMenu({ displayName, onSignOut }: { displayName: string; onSignOut: () => void }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest?.('[data-user-menu="root"]')) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);
  return (
    <div data-user-menu="root" className="relative">
      <button
        aria-label="User menu"
        onClick={() => setOpen((v) => !v)}
        className="h-8 w-8 rounded-full bg-foreground text-background text-xs font-semibold grid place-items-center"
      >
        {initialsOf(displayName)}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-black/[.08] dark:border-white/[.145] bg-background shadow-sm p-1 z-50">
          <div className="px-2 py-2 text-xs text-foreground/70 truncate">{displayName}</div>
          <button
            className="w-full text-left text-sm px-2 py-2 rounded hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
            onClick={() => (window.location.href = "/profile")}
          >
            Profile
          </button>
          <button
            className="w-full text-left text-sm px-2 py-2 rounded hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}


