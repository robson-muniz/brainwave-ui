import { createFileRoute } from '@tanstack/react-router'

const fetchIdeas = async ({ ideaId }: { ideaId: string }) => {
  const res = await fetch(`http://localhost:8000/ideas/${ideaId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch idea')
  }

  return res.json()
}

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: ideaDetalPage,
  loader: async ({ params }) => {
    return fetchIdeas({ ideaId: params.ideaId })
  }
})

function ideaDetalPage() {
  const idea = Route.useLoaderData()
  return <div>{idea.title}</div>
}
