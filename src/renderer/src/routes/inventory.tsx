import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '../context/ThemeContext'
import { useState, useRef, useEffect } from 'react'

export const Route = createFileRoute('/inventory')({
  component: Inventory,
})

// Örnek veri
const partsData = [
  {
    id: '1',
    name: 'Yağ Filtresi',
    category: 'Motor',
    stock: 3,
    price: 250,
    expiryDate: '01.02.2025',
    isCritical: true,
    details: {
      code: 'YF-123',
      minStock: 5,
      history: [
        {
          date: '01.02.2024',
          plate: '34 ABC 123',
          customer: 'Ahmet Yılmaz',
          quantity: 1
        },
        {
          date: '15.01.2024',
          plate: '06 XYZ 456',
          customer: 'Mehmet Demir',
          quantity: 2
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Fren Balatası',
    category: 'Fren',
    stock: 10,
    price: 500,
    expiryDate: '15.01.2025',
    isCritical: false,
    details: {
      code: 'FB-456',
      minStock: 8,
      history: [
        {
          date: '20.01.2024',
          plate: '35 DEF 789',
          customer: 'Ayşe Kaya',
          quantity: 2
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Buji Takımı',
    category: 'Ateşleme',
    stock: 5,
    price: 150,
    expiryDate: '20.01.2025',
    isCritical: true,
    details: {
      code: 'BT-789',
      minStock: 6,
      history: []
    }
  }
]

function Inventory() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [stockFilter, setStockFilter] = useState<'all' | 'critical' | 'normal'>('all')
  const itemsPerPage = 5
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Dışarı tıklamayı dinle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtreleme fonksiyonu
  const filteredParts = partsData.filter(part => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory ? part.category === selectedCategory : true
    const matchesStock = stockFilter === 'all' ? true : stockFilter === 'critical' ? part.isCritical : !part.isCritical
    
    return matchesSearch && matchesCategory && matchesStock
  })

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredParts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedParts = filteredParts.slice(startIndex, startIndex + itemsPerPage)

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Menü işlemleri
  const handleMenuClick = (partId: string) => {
    setActiveMenu(activeMenu === partId ? null : partId)
  }

  const handleAction = (partId: string, action: string) => {
    console.log(`${action} for ${partId}`)
    setActiveMenu(null)
    if (action === 'view-details') {
      setSelectedPart(partId)
      setShowSidebar(true)
    }
  }

  return (
    <div className="p-4">
      {/* Başlık ve Hızlı İşlemler */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8 relative z-10`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <span className="text-xl">📦</span>
            </div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Parça ve Stok Yönetimi
            </h1>
          </div>
          <div className="flex gap-3">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isDark 
                ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}>
              <span>➕</span>
              <span>Yeni Parça Ekle</span>
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
                placeholder="Parça adı veya kategori ara..."
                className={`w-full bg-transparent border-none focus:outline-none ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-6 w-px bg-gray-400/20"></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setStockFilter('all')}
                  className={`w-[70px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    stockFilter === 'all'
                      ? (isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setStockFilter('normal')}
                  className={`w-[100px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    stockFilter === 'normal'
                      ? (isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Normal Seviye
                </button>
                <button
                  onClick={() => setStockFilter('critical')}
                  className={`w-[85px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    stockFilter === 'critical'
                      ? (isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600')
                      : (isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-100')
                  }`}
                >
                  Kritik Stok
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700/70' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-base">📑</span>
              <span>{selectedCategory || 'Tüm Kategoriler'}</span>
              <svg 
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCategoryDropdown && (
              <div 
                ref={dropdownRef}
                style={{ zIndex: -1 }}
                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl ${
                  isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                } backdrop-blur-sm transform transition-all duration-200 ease-out origin-top`}
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setShowCategoryDropdown(false)
                    }}
                    className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-200 ${
                      !selectedCategory
                        ? isDark 
                          ? 'bg-blue-500/10 text-blue-400' 
                          : 'bg-blue-50 text-blue-600'
                        : isDark 
                          ? 'text-gray-300 hover:bg-gray-700/70' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">📑</span>
                    <span className="font-medium">Tüm Kategoriler</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('Motor')
                      setShowCategoryDropdown(false)
                    }}
                    className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-200 ${
                      selectedCategory === 'Motor'
                        ? isDark 
                          ? 'bg-blue-500/10 text-blue-400' 
                          : 'bg-blue-50 text-blue-600'
                        : isDark 
                          ? 'text-gray-300 hover:bg-gray-700/70' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">🔧</span>
                    <span className="font-medium">Motor</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('Fren')
                      setShowCategoryDropdown(false)
                    }}
                    className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-200 ${
                      selectedCategory === 'Fren'
                        ? isDark 
                          ? 'bg-blue-500/10 text-blue-400' 
                          : 'bg-blue-50 text-blue-600'
                        : isDark 
                          ? 'text-gray-300 hover:bg-gray-700/70' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">🛑</span>
                    <span className="font-medium">Fren</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('Ateşleme')
                      setShowCategoryDropdown(false)
                    }}
                    className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-200 ${
                      selectedCategory === 'Ateşleme'
                        ? isDark 
                          ? 'bg-blue-500/10 text-blue-400' 
                          : 'bg-blue-50 text-blue-600'
                        : isDark 
                          ? 'text-gray-300 hover:bg-gray-700/70' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">⚡</span>
                    <span className="font-medium">Ateşleme</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parça Listesi */}
      <div className={`rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Parça Adı</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Kategori</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mevcut Stok</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Birim Fiyat</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Son Kullanım</th>
                <th className={`py-4 px-6 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Durum</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedParts.map((part) => (
                <tr key={part.id} className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center">
                      <span>{part.name}</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{part.category}</td>
                  <td className={`py-4 px-6 ${
                    part.isCritical 
                      ? isDark ? 'text-red-400' : 'text-red-600'
                      : isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{part.stock}</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{part.price}₺</td>
                  <td className={`py-4 px-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{part.expiryDate}</td>
                  <td className={`py-4 px-6`}>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      part.isCritical
                        ? isDark ? 'bg-red-500/20 text-red-400 border border-red-400/20' : 'bg-red-100/80 text-red-600 border border-red-200'
                        : isDark ? 'bg-green-500/20 text-green-400 border border-green-400/20' : 'bg-green-100/80 text-green-600 border border-green-200'
                    }`}>
                      {part.isCritical ? 'Kritik Seviye' : 'Normal Seviye'}
                    </span>
                  </td>
                  <td className="py-4 px-6 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(part.id)
                      }}
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-600/50' 
                          : 'hover:bg-gray-200/50'
                      }`}
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                    {activeMenu === part.id && (
                      <div 
                        className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                          isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                        } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          <button
                            onClick={() => handleAction(part.id, 'view-details')}
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
                            onClick={() => handleAction(part.id, 'update-stock')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">📦</span>
                            <span className="font-medium">Stok Güncelle</span>
                          </button>
                          <button
                            onClick={() => handleAction(part.id, 'view-history')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-700/70' 
                                : 'text-gray-700 hover:bg-gray-100/80'
                            }`}
                          >
                            <span className="mr-3 text-base">📊</span>
                            <span className="font-medium">Kullanım Geçmişi</span>
                          </button>
                          <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                          <button
                            onClick={() => handleAction(part.id, 'delete')}
                            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'text-red-400 hover:bg-red-500/20' 
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <span className="mr-3 text-base">🗑️</span>
                            <span className="font-medium">Parça Kaydını Sil</span>
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
            Toplam {filteredParts.length} parça
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

      {/* Yan Panel - Parça Detayları */}
      {showSidebar && selectedPart && (
        <div className={`fixed inset-y-0 right-0 w-96 ${
          isDark ? 'bg-gray-800/95' : 'bg-white/95'
        } backdrop-blur-sm shadow-xl border-l ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } transform transition-transform duration-300 translate-x-0`}>
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}>Parça Detayları</h2>
                <button
                  onClick={() => {
                    setShowSidebar(false)
                    setSelectedPart(null)
                  }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? 'hover:bg-gray-700/70' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
              
              {/* Parça Bilgileri */}
              <div className={`p-4 rounded-xl mb-6 ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-medium mb-4 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>Genel Bilgiler</h3>
                <div className="space-y-3">
                  {Object.entries(partsData.find(p => p.id === selectedPart)?.details || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {key === 'code' ? 'Parça Kodu' : key === 'minStock' ? 'Minimum Stok' : key}
                      </span>
                      <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {typeof value === 'number' ? value : value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kullanım Geçmişi */}
              <div>
                <h3 className={`text-lg font-medium mb-4 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>Kullanım Geçmişi</h3>
                <div className="space-y-4">
                  {partsData.find(p => p.id === selectedPart)?.details.history.map((record, index) => (
                    <div key={index} className={`p-4 rounded-xl ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          {record.date}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {record.quantity} adet
                        </span>
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {record.plate} - {record.customer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 