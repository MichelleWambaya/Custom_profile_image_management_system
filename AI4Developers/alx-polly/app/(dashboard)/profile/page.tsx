"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) setName((user.user_metadata?.name as string) || "");
  }, [user]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.updateUser({ data: { name } });
    if (error) setMessage(error.message);
    else setMessage("Profile saved");
    setSaving(false);
  }

  if (loading) return <div className="text-sm text-foreground/70">Loading...</div>;
  if (!user) return <div className="text-sm text-foreground/70">You are not signed in.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <p className="text-sm text-foreground/70">Manage your account details.</p>
      </div>
      <form className="space-y-4" onSubmit={onSave}>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="email">Email</label>
          <Input id="email" value={user.email || ""} readOnly />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="name">Display Name</label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        {message && <p className="text-sm text-foreground/70">{message}</p>}
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
      </form>
    </div>
  );
}


