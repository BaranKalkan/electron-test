import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports')({
  component: Reports,
})

function Reports() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Raporlama ve Analiz works!</h1>
    </div>
  )
} 