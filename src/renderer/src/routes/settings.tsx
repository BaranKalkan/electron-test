import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ayarlar ve Yedekleme works!</h1>
    </div>
  )
} 