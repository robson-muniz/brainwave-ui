import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { Idea } from '@/types'



const fetchIdeas = async (ideaId: string): Promise<Idea> => {
  const res = await fetch(`http://localhost:8000/ideas/${ideaId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch idea')
  }

  return res.json()
}

const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdeas(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: ideaDetalPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function ideaDetalPage() {
  const idea = useSuspenseQuery(ideaQueryOptions(Route.useParams().ideaId))
  return <div className='p-4'>
    <Link to='/ideas' className='text-blue-500 hover:underline block mb-4'>Back to ideas</Link>
    <h2 className='text-4xl font-bold mb-4'>{idea.data.title}</h2>
    <p className='m-2'>{idea.data.description}</p>
  </div>
}
