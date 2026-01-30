import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import Header from '../components/Header'

type RouteContext = {
  queryClient: QueryClient
}


export const Route = createRootRouteWithContext<RouteContext>()({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Brainwave - The AI Assistant for Developers",
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.png' },
    ],
    title: "Brainwave",
  }),

  component: RootLayout,

})

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeadContent />
      <Header />
      <main className="flex justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <Outlet />
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: TanStackRouterDevtoolsPanel,
          },
        ]}
      />
    </div>
  )
}
