import { DataService } from "@renderer/types/types"

const ElectronDataService: DataService = {
    addUser: (userWithoutId) => window.electron.ipcRenderer.invoke('add-user', userWithoutId),
    getUsers: () => window.electron.ipcRenderer.invoke('get-users')
}

// Eğer cloud a taşımaya karar verirsek burada fetchDataService benzeri bir nesne dönebiliriz
export { ElectronDataService as DataService } 
