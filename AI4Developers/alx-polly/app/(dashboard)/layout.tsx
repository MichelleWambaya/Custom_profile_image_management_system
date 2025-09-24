import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = getSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/auth/sign-in");
  return (
    <div className="mx-auto max-w-6xl w-full p-4 sm:p-6">
      {children}
    </div>
  );
}


