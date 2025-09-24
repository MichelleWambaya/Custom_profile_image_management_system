export type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export type Poll = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  options: PollOption[];
};

type PollStore = {
  polls: Poll[];
};

declare global {
  // eslint-disable-next-line no-var
  var __pollStore: PollStore | undefined;
}

function getStore(): PollStore {
  if (!global.__pollStore) {
    global.__pollStore = {
      polls: [
        {
          id: "1",
          title: "Favorite Programming Language",
          description: "What programming language do you prefer to use?",
          createdAt: new Date().toISOString(),
          options: [
            { id: "1", text: "JavaScript", votes: 12 },
            { id: "2", text: "Python", votes: 10 },
            { id: "3", text: "Java", votes: 8 },
            { id: "4", text: "C#", votes: 6 },
            { id: "5", text: "Go", votes: 6 },
          ],
        },
        {
          id: "2",
          title: "Best Frontend Framework",
          description: "Which frontend framework do you think is the best?",
          createdAt: new Date().toISOString(),
          options: [
            { id: "1", text: "React", votes: 14 },
            { id: "2", text: "Vue", votes: 12 },
            { id: "3", text: "Svelte", votes: 6 },
            { id: "4", text: "Solid", votes: 6 },
          ],
        },
        {
          id: "3",
          title: "Preferred Database",
          description: "What database do you prefer to work with?",
          createdAt: new Date().toISOString(),
          options: [
            { id: "1", text: "PostgreSQL", votes: 10 },
            { id: "2", text: "MySQL", votes: 8 },
            { id: "3", text: "MongoDB", votes: 5 },
            { id: "4", text: "SQLite", votes: 4 },
            { id: "5", text: "SQL Server", votes: 0 },
          ],
        },
      ],
    };
  }
  return global.__pollStore;
}

export function listPolls(): Poll[] {
  return getStore().polls;
}

export function getPollById(id: string): Poll | undefined {
  return getStore().polls.find((p) => p.id === id);
}

let nextIdCounter = 1000;

export function createPoll(
  title: string,
  description: string | undefined,
  optionTexts: string[]
): Poll {
  const store = getStore();
  const id = String(nextIdCounter++);
  const nowIso = new Date().toISOString();
  const options: PollOption[] = optionTexts
    .filter((t) => t && t.trim().length > 0)
    .map((text, index) => ({ id: String(index + 1), text: text.trim(), votes: 0 }));

  const poll: Poll = {
    id,
    title: title.trim(),
    description: description?.trim() || undefined,
    createdAt: nowIso,
    options,
  };
  store.polls.unshift(poll);
  return poll;
}


