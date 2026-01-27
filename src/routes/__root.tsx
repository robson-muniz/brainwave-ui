import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'


export const Route = createRootRoute({
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

  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
