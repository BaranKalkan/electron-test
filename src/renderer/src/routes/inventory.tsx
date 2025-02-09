import { createFileRoute } from '@tanstack/react-router'
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
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg mb-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <span className="text-xl">📦</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Parça ve Stok Yönetimi
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400">
              <span>➕</span>
              <span>Yeni Parça Ekle</span>
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
                placeholder="Parça adı veya kategori ara..."
                className="w-full bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-6 w-px bg-gray-400/20"></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setStockFilter('all')}
                  className={`w-[70px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    stockFilter === 'all'
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setStockFilter('normal')}
                  className={`w-[100px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    stockFilter === 'normal'
                      ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Normal Seviye
                </button>
                <button
                  onClick={() => setStockFilter('critical')}
                  className={`w-[85px] px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    stockFilter === 'critical'
                      ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-700/70"
            >
              <span className="text-base">📑</span>
              <span>{selectedCategory || 'Tüm Kategoriler'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCategoryDropdown && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="py-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setShowCategoryDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    Tüm Kategoriler
                  </button>
                  {Array.from(new Set(partsData.map(part => part.category))).map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowCategoryDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parça Listesi */}
      <div className="rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Parça Adı</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Kategori</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Stok</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Fiyat</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Son Kullanma</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedParts.map((part) => (
                <tr key={part.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <span>{part.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{part.category}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      part.isCritical
                        ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                    }`}>
                      {part.stock} adet
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{part.price}₺</td>
                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300">{part.expiryDate}</td>
                  <td className="py-4 px-6 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(part.id)
                      }}
                      className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
                    >
                      <span className="text-xl">⋮</span>
                    </button>
                    {activeMenu === part.id && (
                      <div 
                        className="fixed mt-1 w-64 rounded-xl shadow-xl bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100"
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          <button
                            onClick={() => handleAction(part.id, 'view-details')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                          >
                            <span className="mr-3 text-base">📄</span>
                            <span className="font-medium">Parça Detayları</span>
                          </button>
                          <button
                            onClick={() => handleAction(part.id, 'edit')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                          >
                            <span className="mr-3 text-base">✏️</span>
                            <span className="font-medium">Düzenle</span>
                          </button>
                          <button
                            onClick={() => handleAction(part.id, 'add-stock')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                          >
                            <span className="mr-3 text-base">➕</span>
                            <span className="font-medium">Stok Ekle</span>
                          </button>
                          <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                          <button
                            onClick={() => handleAction(part.id, 'delete')}
                            className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/20"
                          >
                            <span className="mr-3 text-base">🗑️</span>
                            <span className="font-medium">Parçayı Sil</span>
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
        <div className="flex items-center justify-between px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-b-2xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Toplam {filteredParts.length} parça
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

      {/* Parça Detay Yan Paneli */}
      {showSidebar && selectedPart && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-l border-gray-200 dark:border-gray-700 p-6 transform transition-transform duration-300 translate-x-0">
          <div className="h-full flex flex-col">
            {/* Başlık */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Parça Detayları
              </h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Parça Bilgileri */}
            <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <h3 className="text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">
                Temel Bilgiler
              </h3>
              <div className="space-y-2">
                <div className="text-base text-gray-700 dark:text-gray-200">
                  {partsData.find(p => p.id === selectedPart)?.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Kategori: {partsData.find(p => p.id === selectedPart)?.category}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Kod: {partsData.find(p => p.id === selectedPart)?.details.code}
                </div>
              </div>
            </div>

            {/* Stok Bilgileri */}
            <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <h3 className="text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">
                Stok Bilgileri
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mevcut Stok</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    partsData.find(p => p.id === selectedPart)?.isCritical
                      ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                  }`}>
                    {partsData.find(p => p.id === selectedPart)?.stock} adet
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Kritik Seviye</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {partsData.find(p => p.id === selectedPart)?.details.minStock} adet
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Birim Fiyat</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {partsData.find(p => p.id === selectedPart)?.price}₺
                  </span>
                </div>
              </div>
            </div>

            {/* Kullanım Geçmişi */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <h3 className="text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">
                  Kullanım Geçmişi
                </h3>
                <div className="space-y-3">
                  {partsData.find(p => p.id === selectedPart)?.details.history.map((record, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white dark:bg-gray-800/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {record.date}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {record.plate} - {record.customer}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {record.quantity} adet
                        </div>
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