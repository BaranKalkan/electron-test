import { createFileRoute } from '@tanstack/react-router'
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
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <span className="text-xl">🛠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Servis Yönetimi
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400">
              <span>➕</span>
              <span>Yeni Servis Kaydı</span>
            </button>
          </div>
        </div>

        {/* Arama ve Filtreleme */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Plaka, müşteri adı, model veya şikayet ara..."
                className="w-full bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-6 w-px bg-gray-400/20"></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setStatusFilter(null)}
                  className={`w-[70px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    !statusFilter 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setStatusFilter('Bekliyor')}
                  className={`w-[70px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === 'Bekliyor'
                      ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Bekliyor
                </button>
                <button
                  onClick={() => setStatusFilter('Devam Ediyor')}
                  className={`w-[100px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === 'Devam Ediyor'
                      ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Devam Ediyor
                </button>
                <button
                  onClick={() => setStatusFilter('Tamamlandı')}
                  className={`w-[85px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    statusFilter === 'Tamamlandı'
                      ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
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
      <div className="rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Plaka</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri Adı</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Araç Model</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri Şikayeti</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tarih</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <span>{service.plate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{service.customerName}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{service.model}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{service.complaint}</td>
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
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{service.date}</td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(service.id)
                      }}
                      className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                    {activeMenu === service.id && (
                      <div 
                        className="fixed mt-1 w-64 rounded-xl shadow-xl bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100" 
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          <button
                            onClick={() => handleAction(service.id, 'view-details')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                          >
                            <span className="mr-3 text-base">🔍</span>
                            <span className="font-medium">Servis Geçmişini Görüntüle</span>
                          </button>
                          <button
                            onClick={() => handleAction(service.id, 'service-detail')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                          >
                            <span className="mr-3 text-base">🛠️</span>
                            <span className="font-medium">Servis Detay</span>
                          </button>
                          {service.status !== 'Tamamlandı' && (
                            <button
                              onClick={() => handleAction(service.id, service.status === 'Bekliyor' ? 'start-service' : 'mark-complete')}
                              className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                            >
                              <span className="mr-3 text-base">{service.status === 'Bekliyor' ? '▶️' : '✔️'}</span>
                              <span className="font-medium">{service.status === 'Bekliyor' ? 'İşleme Al' : 'Servisi Tamamla'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleAction(service.id, 'export-pdf')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                          >
                            <span className="mr-3 text-base">📄</span>
                            <span className="font-medium">PDF Raporu</span>
                          </button>
                          {service.status !== 'Tamamlandı' && (
                            <>
                              <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                              <button
                                onClick={() => handleAction(service.id, 'cancel')}
                                className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/20"
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
        <div className="flex items-center justify-between px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-b-2xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Toplam {filteredServices.length} servis kaydı
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 1 
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-blue-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center bg-gray-100 dark:bg-gray-700/50 rounded-lg px-2">
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
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                          : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
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
                      className="min-w-[2rem] h-8 mx-0.5 flex items-center justify-center text-sm text-gray-400 dark:text-gray-600"
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
                currentPage === totalPages 
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-blue-400'
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