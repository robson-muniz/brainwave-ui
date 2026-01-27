import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [],
    title: 'Brainwave - Home',
  }),
  component: App,
})

function App() {
  return (
    <div>
      <h1>Brainwave UI</h1>
    </div>
  )
}
