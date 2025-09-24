"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const name = String(formData.get("name") || "");
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) setError(error.message);
    setLoading(false);
    if (!error) window.location.href = "/polls";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-foreground/70">
          Start creating and voting on polls.
        </p>
      </div>
      <form className="space-y-4" action={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="name">Name</label>
          <Input id="name" name="name" placeholder="Ada Lovelace" />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button disabled={loading} type="submit" className="w-full">{loading ? "Creating..." : "Create account"}</Button>
      </form>
      <p className="text-sm text-foreground/70">
        Already have an account? <Link className="underline" href="/auth/sign-in">Sign in</Link>
      </p>
    </div>
  );
}


