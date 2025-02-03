import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

export const Route = createFileRoute('/services')({
  component: Services,
})

// Örnek servis verileri
const servicesData = [
  {
    id: '1',
    plate: '34 ABC 123',
    customerName: 'Ahmet Yılmaz',
    model: 'Ford Focus',
    complaint: 'Motor çalışırken ses geliyor',
    status: 'Devam Ediyor',
    date: '01.02.2025',
    details: {
      customer: {
        phone: '0532 123 45 67',
        email: 'ahmet@email.com'
      },
      operations: [
        {
          date: '01.02.2025',
          operation: 'Motor Yağı Değişimi',
          technician: 'Ali Usta',
          cost: 750
        },
        {
          date: '01.02.2025',
          operation: 'Fren Kontrolü',
          technician: 'Mehmet Usta',
          cost: 500
        }
      ],
      totalCost: 1250
    }
  },
  {
    id: '2',
    plate: '06 XYZ 456',
    customerName: 'Mehmet Demir',
    model: 'Toyota Corolla',
    complaint: 'Fren pedalı sert, frenleme zayıf',
    status: 'Bekliyor',
    date: '30.01.2025',
    details: {
      customer: {
        phone: '0533 234 56 78',
        email: 'mehmet@email.com'
      },
      operations: [],
      totalCost: 0
    }
  },
  {
    id: '3',
    plate: '35 DEF 789',
    customerName: 'Ayşe Kaya',
    model: 'Hyundai i20',
    complaint: 'Periyodik bakım ve yağ değişimi',
    status: 'Tamamlandı',
    date: '28.01.2025',
    details: {
      customer: {
        phone: '0535 345 67 89',
        email: 'ayse@email.com'
      },
      operations: [
        {
          date: '28.01.2025',
          operation: 'Periyodik Bakım',
          technician: 'Ali Usta',
          cost: 1500
        },
        {
          date: '28.01.2025',
          operation: 'Yağ Değişimi',
          technician: 'Ali Usta',
          cost: 750
        }
      ],
      totalCost: 2250
    }
  }
]

function Services() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchTerm, setSearchTerm] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const itemsPerPage = 5

  // Filtreleme fonksiyonu
  const filteredServices = servicesData.filter(service => {
    const matchesSearch = 
      service.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.complaint.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || service.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage)

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Menü işlemleri
  const handleMenuClick = (serviceId: string) => {
    setActiveMenu(activeMenu === serviceId ? null : serviceId)
  }

  const handleAction = (serviceId: string, action: string) => {
    console.log(`${action} for ${serviceId}`)
    setActiveMenu(null)
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
              <span className="text-xl">🛠️</span>
            </div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Servis Yönetimi
            </h1>
          </div>
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isDark 
                ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}>
              <span>➕</span>
              <span>Yeni Servis Kaydı</span>
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
                placeholder="Plaka, müşteri adı, model veya şikayet ara..."
                className={`w-full bg-transparent border-none focus:outline-none ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-6 w-px bg-gray-400/20"></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setStatusFilter(null)}
                  className={`w-[70px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    !statusFilter 
                      ? (isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setStatusFilter('Bekliyor')}
                  className={`w-[70px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === 'Bekliyor'
                      ? (isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Bekliyor
                </button>
                <button
                  onClick={() => setStatusFilter('Devam Ediyor')}
                  className={`w-[100px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === 'Devam Ediyor'
                      ? (isDark ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Devam Ediyor
                </button>
                <button
                  onClick={() => setStatusFilter('Tamamlandı')}
                  className={`w-[85px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === 'Tamamlandı'
                      ? (isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Tamamlandı
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servis Listesi */}
      <div className={`rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Plaka</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Müşteri Adı</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Araç Model</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Müşteri Şikayeti</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Durum</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tarih</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedServices.map((service) => (
                <tr key={service.id} className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <span>{service.plate}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{service.customerName}</td>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{service.model}</td>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{service.complaint}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      service.status === 'Bekliyor'
                        ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                        : service.status === 'Devam Ediyor'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                    } whitespace-nowrap`}>
                      {service.status}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{service.date}</td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(service.id)
                      }}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-600/50' 
                          : 'hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                    {activeMenu === service.id && (
                      <div 
                        className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                          isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                        } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          <button
                            onClick={() => handleAction(service.id, 'view-details')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">🔍</span>
                            <span className="font-medium">Servis Geçmişini Görüntüle</span>
                          </button>
                          <button
                            onClick={() => handleAction(service.id, 'service-detail')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">🛠️</span>
                            <span className="font-medium">Servis Detay</span>
                          </button>
                          {service.status !== 'Tamamlandı' && (
                            <button
                              onClick={() => handleAction(service.id, service.status === 'Bekliyor' ? 'start-service' : 'mark-complete')}
                              className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                                isDark 
                                  ? 'text-gray-300 hover:bg-gray-700/70' 
                                  : 'text-gray-700 hover:bg-gray-100/80'
                              }`}
                            >
                              <span className="mr-3 text-base">{service.status === 'Bekliyor' ? '▶️' : '✔️'}</span>
                              <span className="font-medium">{service.status === 'Bekliyor' ? 'İşleme Al' : 'Servisi Tamamla'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleAction(service.id, 'export-pdf')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">📄</span>
                            <span className="font-medium">PDF Raporu</span>
                          </button>
                          {service.status !== 'Tamamlandı' && (
                            <>
                              <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                              <button
                                onClick={() => handleAction(service.id, 'cancel')}
                                className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                                  isDark 
                                    ? 'text-red-400 hover:bg-red-500/20' 
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                              >
                                <span className="mr-3 text-base">🗑️</span>
                                <span className="font-medium">İptal Et</span>
                              </button>
                            </>
                          )}
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
            Toplam {filteredServices.length} servis kaydı
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
    </div>
  )
} 