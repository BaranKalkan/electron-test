import { DataService } from '@renderer/services/DataService'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='p-2'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>( DataService.getUsers().then(value => alert(JSON.stringify(value))))}>
        Send IPC - getUsers - alert example
      </button>
    </div>
  )
}
