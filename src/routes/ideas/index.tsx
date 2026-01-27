import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/")({
  head: () => ({
    meta: [
    ],
    title: "Brainwave - Your IDEA Hub",
  }),
  component: IdeasPage,
});

export function IdeasPage() {
  return (
    <div className="ideas">
      Hello "/Ideas!"
    </div>
  );
}
