"use server";
import { createPoll } from "@/lib/polls";
import { redirect } from "next/navigation";

export async function createPollAction(formData: FormData) {
  const title = String(formData.get("title") || "");
  const description = (formData.get("description") as string) || "";
  const option1 = (formData.get("option1") as string) || "";
  const option2 = (formData.get("option2") as string) || "";
  const option3 = (formData.get("option3") as string) || "";
  const option4 = (formData.get("option4") as string) || "";

  const poll = createPoll(title, description, [option1, option2, option3, option4]);
  redirect(`/polls/${poll.id}`);
}


