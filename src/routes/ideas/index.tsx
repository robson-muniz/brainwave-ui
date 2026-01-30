import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getIdeas } from "@/api/ideas";

const ideasQueryOptions = () => queryOptions({
  queryKey: ["ideas"],
  queryFn: getIdeas,
});


export const Route = createFileRoute("/ideas/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Brainwave - Your IDEA Hub",
      },
    ],
    title: "Brainwave - Your IDEA Hub",
  }),
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

export function IdeasPage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ideas</h1>
      <div className="grid gap-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="border p-4 rounded shadow">
            <Link to="/ideas/$ideaId" params={{ ideaId: idea.id }} className="text-xl font-semibold text-blue-600 hover:underline">
              {idea.title}
            </Link>
            <p className="text-gray-600">{idea.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
