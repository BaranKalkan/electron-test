import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

export const Route = createFileRoute('/customers')({
  component: Customers,
})

// Örnek müşteri verisi
const customersData = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    phone: '0555 123 45 67',
    email: 'ahmet@mail.com',
    vehicleCount: 1,
    lastServiceDate: '15.01.2024',
    totalSpent: 2500,
    vehicles: [
      {
        plate: '34 ABC 123',
        model: 'Ford Focus',
        lastService: '15.01.2024',
        status: 'Tamamlandı'
      }
    ],
    serviceHistory: [
      {
        date: '15.01.2024',
        plate: '34 ABC 123',
        services: 'Yağ Değişimi, Fren Kontrolü',
        cost: 2500
      }
    ]
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    phone: '0532 987 65 43',
    email: 'mehmet@mail.com',
    vehicleCount: 2,
    lastServiceDate: '20.01.2024',
    totalSpent: 3700,
    vehicles: [
      {
        plate: '34 DEF 456',
        model: 'Toyota Corolla',
        lastService: '20.01.2024',
        status: 'Bekliyor'
      },
      {
        plate: '34 GHI 789',
        model: 'Honda Civic',
        lastService: '15.12.2023',
        status: 'Tamamlandı'
      }
    ],
    serviceHistory: [
      {
        date: '20.01.2024',
        plate: '34 DEF 456',
        services: 'Balata Değişimi',
        cost: 1200
      },
      {
        date: '15.12.2023',
        plate: '34 GHI 789',
        services: 'Genel Bakım',
        cost: 2500
      }
    ]
  }
]

function Customers() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filtreleme fonksiyonu
  const filteredCustomers = customersData.filter(customer => {
    const searchLower = searchTerm.toLowerCase()
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    )
  })

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Menü işlemleri
  const handleMenuClick = (customerId: string) => {
    setActiveMenu(activeMenu === customerId ? null : customerId)
  }

  const handleAction = (customerId: string, action: string) => {
    console.log(`${action} for ${customerId}`)
    setActiveMenu(null)
    if (action === 'view-details') {
      setSelectedCustomer(customerId)
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
              <span className="text-xl">👥</span>
            </div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Müşteri Yönetimi
            </h1>
          </div>
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isDark 
                ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}>
              <span>➕</span>
              <span>Yeni Müşteri Ekle</span>
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
                placeholder="Müşteri adı, telefon veya e-posta ara..."
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

      {/* Müşteri Listesi */}
      <div className={`rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Müşteri Adı</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Telefon</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>E-Posta</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Araç Sayısı</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Son Servis</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id} className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.phone}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.email}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.vehicleCount}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{customer.lastServiceDate}</td>
                  <td className="py-4 px-6 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(customer.id)
                      }}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-600/50' 
                          : 'hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                    {activeMenu === customer.id && (
                      <div 
                        className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                          isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                        } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          <button
                            onClick={() => handleAction(customer.id, 'view-details')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">📄</span>
                            <span className="font-medium">Müşteri Detayları</span>
                          </button>
                          <button
                            onClick={() => handleAction(customer.id, 'add-service')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">🛠️</span>
                            <span className="font-medium">Yeni Servis Ekle</span>
                          </button>
                          <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                          <button
                            onClick={() => handleAction(customer.id, 'delete')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-red-400 hover:bg-red-500/20' 
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <span className="mr-3 text-base">🗑️</span>
                            <span className="font-medium">Müşteri Kaydını Sil</span>
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
            Toplam {filteredCustomers.length} müşteri
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

      {/* Müşteri Detay Yan Paneli */}
      {showSidebar && selectedCustomer && (
        <div className={`fixed top-0 right-0 h-full w-96 ${
          isDark ? 'bg-gray-800/95' : 'bg-white/95'
        } backdrop-blur-sm shadow-xl border-l ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } transform transition-transform duration-300 translate-x-0`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Müşteri Detayları
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
            
            {/* Müşteri Bilgileri */}
            <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Kişisel Bilgiler
              </h3>
              <div className="space-y-2">
                <div className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {customersData.find(c => c.id === selectedCustomer)?.name}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {customersData.find(c => c.id === selectedCustomer)?.phone}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {customersData.find(c => c.id === selectedCustomer)?.email}
                </div>
              </div>
            </div>

            {/* Araç Listesi */}
            <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Kayıtlı Araçlar
              </h3>
              <div className="space-y-3">
                {customersData.find(c => c.id === selectedCustomer)?.vehicles.map((vehicle, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {vehicle.plate}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {vehicle.model}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Son Servis: {vehicle.lastService}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Servis Geçmişi */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Servis Geçmişi
              </h3>
              <div className="space-y-3">
                {customersData.find(c => c.id === selectedCustomer)?.serviceHistory.map((service, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {service.date}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {service.plate}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {service.services}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {service.cost}₺
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 