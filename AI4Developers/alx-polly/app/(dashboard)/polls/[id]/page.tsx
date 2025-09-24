import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPollById } from "@/lib/polls";

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const poll = getPollById(params.id);
  if (!poll) {
    return <div className="text-sm text-foreground/70">Poll not found.</div>;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{poll.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{poll.description || "No description"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {poll.options.map((opt) => (
              <li key={opt.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>{opt.text}</span>
                <span className="text-xs text-foreground/60">{opt.votes} votes</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


