import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Idea } from '@/types'
import { createIdea } from '@/api/ideas'
import { FormEvent, useState } from 'react'
export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {

  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading('true')
    try {
      await createIdea({
        title,
        summary,
        description,
        content: description,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
        user: 'user-1',
      })
      navigate({ to: '/ideas' })
    } catch (error) {
      console.error('Failed to create idea', error)
    } finally {
      setLoading('')
    }
  }



  return <div className='space-y-6'>
    <h1 className='text-3xl font-bold mb-6' >Create New Idea</h1>
    <form onSubmit={handleSubmit} className='space-y-4'>
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
        <input type='text' id='tags' value={tags} onChange={(e) => setTags(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md' />
      </div>
      <button type='submit' className='w-full px-3 py-2 bg-blue-600 text-white rounded-md'>Create Idea</button>
    </form>
  </div>
}
