import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/")({
  component: IdeasPage,
});

export function IdeasPage() {
  return (
    <div className="ideas">
      Hello "/Ideas!"
    </div>
  );
}
