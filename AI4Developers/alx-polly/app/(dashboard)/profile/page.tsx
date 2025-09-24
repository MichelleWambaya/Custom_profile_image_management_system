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
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName((user.user_metadata?.name as string) || "");
      setAvatarUrl((user.user_metadata?.avatar_url as string) || null);
    }
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
          <label className="text-sm">Avatar</label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-foreground text-background grid place-items-center text-sm">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                (user.user_metadata?.name || user.email || "U").slice(0,2).toUpperCase()
              )}
            </div>
            <AvatarUpload onUploaded={(url) => { setAvatarUrl(url); setMessage("Avatar updated"); }} uploading={uploading} setUploading={setUploading} userId={user.id} />
          </div>
        </div>
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

function AvatarUpload({ userId, uploading, setUploading, onUploaded }: { userId: string; uploading: boolean; setUploading: (v: boolean) => void; onUploaded: (url: string) => void; }) {
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = getSupabaseBrowser();
    const bucket = "avatars";
    const path = `${userId}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { cacheControl: "3600", upsert: true });
    if (upErr) {
      setUploading(false);
      alert(upErr.message);
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = data.publicUrl;
    const { error: profErr } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
    setUploading(false);
    if (profErr) {
      alert(profErr.message);
      return;
    }
    onUploaded(publicUrl);
  }
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm inline-flex items-center gap-2 cursor-pointer">
        <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        <Button type="button" variant="outline" disabled={uploading}>{uploading ? "Uploading..." : "Change"}</Button>
      </label>
    </div>
  );
}


