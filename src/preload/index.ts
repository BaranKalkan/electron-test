import { contextBridge, ipcRenderer } from 'electron'
import { User } from '../renderer/src/types/types'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getUsers: (): Promise<User[]> => ipcRenderer.invoke('get-users'),
  addUser: (userWithoutId: Omit<User, 'id'>): Promise<User> => ipcRenderer.invoke('add-user', userWithoutId)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
