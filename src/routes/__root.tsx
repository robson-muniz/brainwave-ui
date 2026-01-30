import { HeadContent, Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
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
  notFoundComponent: NotFound,

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

function NotFound() {
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <Link className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" to="/">Go to home</Link>
    </div>
  )
}
