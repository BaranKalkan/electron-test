import { DataService } from '@renderer/services/DataService'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
  loader: () => DataService.getUsers(),
})

function About() {
  const userData = Route.useLoaderData()

  if(userData.success)
    return <div className="p-2 underline">{userData.data.map(user=> <p key={user.id}>{user.id} - {user.name}</p>)}</div>
  
  return <div className="p-2 underline">{userData.error}</div>
}
