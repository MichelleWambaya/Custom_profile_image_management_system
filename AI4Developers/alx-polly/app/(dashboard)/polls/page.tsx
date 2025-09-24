import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { listPolls } from "@/lib/polls";

export default function PollsListPage() {
  const polls = listPolls();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Polls</h1>
        <Link href="/polls/new">
          <Button>Create Poll</Button>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {polls.map((poll) => (
          <Link key={poll.id} href={`/polls/${poll.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{poll.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">{poll.description}</p>
                <p className="text-xs text-foreground/60 mt-3">
                  {poll.options.length} options • {poll.options.reduce((a, o) => a + o.votes, 0)} total votes
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}


