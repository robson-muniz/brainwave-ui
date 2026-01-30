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
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <Link
        to="/"
        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-medium transition-all hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
      >
        <span>Go back home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
