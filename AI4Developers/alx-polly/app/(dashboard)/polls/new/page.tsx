import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPollAction } from "./actions";

export default function NewPollPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create New Poll</h1>
        <p className="text-sm text-foreground/70">Enter details for your poll.</p>
      </div>
      <form className="space-y-4" action={createPollAction}>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="title">Poll Title</label>
          <Input id="title" name="title" placeholder="What should we build next?" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="description">Description (optional)</label>
          <Input id="description" name="description" placeholder="Provide more context" />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="option1">Option 1</label>
          <Input id="option1" name="option1" placeholder="Option 1" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="option2">Option 2</label>
          <Input id="option2" name="option2" placeholder="Option 2" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="option3">Option 3</label>
          <Input id="option3" name="option3" placeholder="Option 3" />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="option4">Option 4</label>
          <Input id="option4" name="option4" placeholder="Option 4" />
        </div>
        <Button type="submit">Create Poll</Button>
      </form>
    </div>
  );
}


