import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: ideaDetalPage,
})

function ideaDetalPage() {
  return <div>Hello "/ideas/$ideaId/"!</div>
}
