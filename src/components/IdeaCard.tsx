import type { Idea } from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

const IdeaCard = ({
  idea,
  button = true,
}: {
  idea: Idea;
  button?: boolean;
}) => {
  const linkClass = clsx({
    'text-blue-600 hover:underline mt-3': !button,
    "text-center mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition": button,
  })


  return (
    <div className="border border-gray-300 rounded-lg shadow p-4 bg-white">
      <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
      <p className="text-gray-600 mb-2">{idea.summary}</p>
      <Link to="/ideas/$ideaId" params={{ ideaId: idea.id }}
        className={linkClass}> {button ? "View Idea" : "Read more →"} </Link>
    </div>
  );
}

export default IdeaCard;
