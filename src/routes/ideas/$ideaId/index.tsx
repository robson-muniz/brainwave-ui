import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { fetchIdea, deleteIdea } from '@/api/ideas'


const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: ideaDetalPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function ideaDetalPage() {
  const idea = useSuspenseQuery(ideaQueryOptions(Route.useParams().ideaId))
  const navigate = useNavigate()

  const { mutateAsync: deleteMutation, isPending } = useMutation({
    mutationFn: () => deleteIdea(idea.data.id),
    onSuccess: () => {
      navigate({ to: '/ideas' })
    }
  })

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this idea?')
    if (confirmDelete) {
      await deleteMutation()
    }
  }

  return <div className='p-4'>
    <Link to='/ideas' className='text-blue-500 hover:underline block mb-4'>Back to ideas</Link>
    <h2 className='text-4xl font-bold mb-4'>{idea.data.title}</h2>
    <p className='m-2'>{idea.data.description}</p>
    <button onClick={handleDelete} disabled={isPending} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300'>{isPending ? 'Deleting...' : 'Delete'}</button>
  </div>
}
