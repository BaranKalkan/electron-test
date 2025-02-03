import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

export const Route = createFileRoute('/vehicles')({
  component: Vehicles,
})

// Örnek veri
const vehiclesData = [
  {
    id: '1',
    plate: '34 ABC 123',
    customerName: 'Ahmet Yılmaz',
    model: 'Ford Focus',
    lastService: '15.01.2024',
    status: 'Tamamlandı',
    details: {
      motorNo: 'ABC123456',
      chassisNo: 'XYZ789012',
      mileage: '75.000',
      customer: {
        phone: '0532 123 45 67',
        email: 'ahmet@email.com'
      }
    }
  },
  {
    id: '2',
    plate: '06 XYZ 456',
    customerName: 'Mehmet Demir',
    model: 'Toyota Corolla',
    lastService: '20.01.2024',
    status: 'Bekliyor',
    details: {
      motorNo: 'DEF456789',
      chassisNo: 'KLM345678',
      mileage: '120.000',
      customer: {
        phone: '0533 234 56 78',
        email: 'mehmet@email.com'
      }
    }
  },
  {
    id: '3',
    plate: '35 DEF 789',
    customerName: 'Ayşe Kaya',
    model: 'Hyundai i20',
    lastService: '23.01.2024',
    status: 'Devam Ediyor',
    details: {
      motorNo: 'GHI789012',
      chassisNo: 'NOP901234',
      mileage: '45.000',
      customer: {
        phone: '0535 345 67 89',
        email: 'ayse@email.com'
      }
    }
  }
]

function Vehicles() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filtreleme fonksiyonu
  const filteredVehicles = vehiclesData.filter(vehicle => {
    const matchesSearch = 
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage)

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Menü işlemleri
  const handleMenuClick = (vehicleId: string) => {
    setActiveMenu(activeMenu === vehicleId ? null : vehicleId)
  }

  const handleAction = (vehicleId: string, action: string) => {
    console.log(`${action} for ${vehicleId}`)
    setActiveMenu(null)
    if (action === 'view-details') {
      setSelectedVehicle(vehicleId)
      setShowSidebar(true)
    }
  }

  return (
    <div className="p-4">
      {/* Başlık ve Hızlı İşlemler */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <span className="text-xl">🚗</span>
            </div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Araç Yönetimi
            </h1>
          </div>
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isDark 
                ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}>
              <span>➕</span>
              <span>Yeni Araç Ekle</span>
            </button>
          </div>
        </div>

        {/* Arama ve Filtreleme */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Plaka, müşteri adı veya model ara..."
                className={`w-full bg-transparent border-none focus:outline-none ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Araç Listesi */}
      <div className={`rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Plaka</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Müşteri Adı</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Araç Marka/Model</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Son Servis Tarihi</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedVehicles.map((vehicle) => (
                <tr key={vehicle.id} className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <span>{vehicle.plate}</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{vehicle.customerName}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{vehicle.model}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{vehicle.lastService}</td>
                  <td className="py-4 px-6 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(vehicle.id)
                      }}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-600/50' 
                          : 'hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                    {activeMenu === vehicle.id && (
                      <div 
                        className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                          isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                        } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          <button
                            onClick={() => handleAction(vehicle.id, 'view-details')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">📄</span>
                            <span className="font-medium">Detayları Görüntüle</span>
                          </button>
                          <button
                            onClick={() => handleAction(vehicle.id, 'add-service')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">🛠️</span>
                            <span className="font-medium">Servis İşlemi Ekle</span>
                          </button>
                          <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                          <button
                            onClick={() => handleAction(vehicle.id, 'delete')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-red-400 hover:bg-red-500/20' 
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <span className="mr-3 text-base">🗑️</span>
                            <span className="font-medium">Araç Kaydını Sil</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sayfalama */}
        <div className={`flex items-center justify-between px-6 py-4 ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-b-2xl border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Toplam {filteredVehicles.length} araç
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? currentPage === 1 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-blue-400' 
                  : currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className={`flex items-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg px-2`}>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                const isCurrentPage = pageNumber === currentPage
                const isNearCurrentPage = Math.abs(pageNumber - currentPage) <= 1
                const isFirstPage = pageNumber === 1
                const isLastPage = pageNumber === totalPages

                if (isNearCurrentPage || isFirstPage || isLastPage) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`min-w-[2rem] h-8 mx-0.5 text-sm font-medium rounded-md transition-all duration-200 ${
                        isCurrentPage
                          ? isDark 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-blue-100 text-blue-600'
                          : isDark 
                            ? 'text-gray-400 hover:text-blue-400' 
                            : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                } else if (
                  (pageNumber === currentPage - 2 && pageNumber > 1) ||
                  (pageNumber === currentPage + 2 && pageNumber < totalPages)
                ) {
                  return (
                    <span 
                      key={pageNumber} 
                      className={`min-w-[2rem] h-8 mx-0.5 flex items-center justify-center text-sm ${
                        isDark ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      ···
                    </span>
                  )
                }
                return null
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? currentPage === totalPages 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-blue-400' 
                  : currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Yan Panel - Araç Detayları */}
      {showSidebar && selectedVehicle && (
        <div className={`fixed inset-y-0 right-0 w-96 ${
          isDark ? 'bg-gray-800/95' : 'bg-white/95'
        } backdrop-blur-sm shadow-2xl border-l ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } p-6 transform transition-transform duration-300 translate-x-0`}>
          <div className="h-full flex flex-col">
            {/* Başlık */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Araç Detayları
              </h2>
              <button
                onClick={() => setShowSidebar(false)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                ✕
              </button>
            </div>

            {/* Detay İçeriği */}
            <div className="flex-1 overflow-y-auto">
              {/* Araç Bilgileri */}
              <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Araç Bilgileri
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Plaka</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.plate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Marka/Model</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Motor No</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.details.motorNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Şasi No</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.details.chassisNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Kilometre</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.details.mileage} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Müşteri Bilgileri */}
              <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Müşteri Bilgileri
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ad Soyad</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Telefon</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.details.customer.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>E-posta</span>
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {vehiclesData.find(v => v.id === selectedVehicle)?.details.customer.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Servis Geçmişi */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Son Servis Kayıtları
                </h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        23.01.2024
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'
                      }`}>
                        Tamamlandı
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Motor yağı değişimi, filtre değişimi
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Parçalar: Yağ filtresi, Hava filtresi
                      </span>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        1,250₺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alt Butonlar */}
            <div className="mt-6 space-y-3">
              <button className={`w-full py-2.5 px-4 rounded-xl transition-colors duration-200 ${
                isDark 
                  ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}>
                Yeni Servis İşlemi Ekle
              </button>
              <button className={`w-full py-2.5 px-4 rounded-xl transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
                Tüm Servis Geçmişini Görüntüle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 