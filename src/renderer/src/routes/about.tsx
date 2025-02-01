import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function About() {
  return <div className="p-2">Hello from About!</div>
}
