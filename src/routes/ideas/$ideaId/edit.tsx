import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { fetchIdea } from '@/api/ideas'
import { useState } from 'react'

const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: IdeaEditPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function IdeaEditPage() {

  const { ideaId } = Route.useParams()
  const navigate = useNavigate()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))

  const [title, setTitle] = useState(idea.title)
  const [summary, setSummary] = useState(idea.summary)
  const [description, setDescription] = useState(idea.description)
  const [category, setCategory] = useState(idea.category)
  const [tagsInput, setTagsInput] = useState(idea.tags.join(','))

  return (

    <form className='space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold'>Edit Idea</h1>
        <Link to='/ideas' className='text-blue-600 hover:underline'>Back to Ideas</Link>
      </div>
      <div className='space-y-2'>
        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>Title</label>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md' />
      </div>
      <div className='space-y-2'>
        <label htmlFor='summary' className='block text-sm font-medium text-gray-700'>Summary</label>
        <input type='text' id='summary' value={summary} onChange={(e) => setSummary(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md' />
      </div>
      <div className='space-y-2'>
        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
        <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md' />
      </div>
      <div className='space-y-2'>
        <label htmlFor='tags' className='block text-sm font-medium text-gray-700'>Tags</label>
        <input type='text' id='tags' value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md' />
      </div>
      <button
        type='submit'
        className='w-full px-3 py-2 bg-blue-600 text-white rounded-md'>
        Update Idea
      </button>
    </form>
  )
}
