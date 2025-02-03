import { DataService } from '@renderer/services/DataService'
import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const Route = createFileRoute('/')({
  component: Index,
})

const quickActions = [
  {
    id: 'quick-service',
    title: 'Hızlı Servis Kaydı',
    icon: '🚗'
  },
  {
    id: 'quick-search',
    title: 'Hızlı Arama',
    icon: '🔍'
  },
  {
    id: 'open-orders',
    title: 'Açık İş Emirleri',
    icon: '🛠️'
  },
  {
    id: 'add-inventory',
    title: 'Parça/Stok Ekle',
    icon: '📦'
  },
  {
    id: 'daily-report',
    title: 'Günlük İş Raporu & Çıktı Al',
    icon: '📊'
  },
  {
    id: 'add-expense',
    title: 'Masraf Girişi',
    icon: '💰'
  }
];

function Index() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleMenuClick = (plateId: string) => {
    setActiveMenu(activeMenu === plateId ? null : plateId);
  };

  const handleAction = (plateId: string, action: string) => {
    console.log(`${action} for ${plateId}`);
    setActiveMenu(null);
  };

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(3 / itemsPerPage); // Şu an 3 servis kaydı var
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hızlı İşlemler Bölümü */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <span className="text-lg">⚡</span>
            </div>
            <h1 className={`text-lg font-semibold ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Hızlı İşlemler
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className={`group flex flex-col items-center p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                isDark 
                  ? 'hover:bg-gray-700/40 bg-gray-750/20' 
                  : 'hover:bg-gray-50/80 bg-white/40'
              } border ${
                isDark ? 'border-gray-700/30' : 'border-gray-200/50'
              } hover:shadow-md`}
              onClick={() => console.log(`Clicked: ${action.title}`)}
            >
              <div className={`mb-3 text-2xl transition-transform duration-200 group-hover:scale-110 ${
                isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-500'
              }`}>
                {action.icon}
              </div>
              <span className={`text-sm font-medium text-center transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-300 group-hover:text-blue-400' 
                  : 'text-gray-700 group-hover:text-blue-600'
              }`}>
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Servis Durumu Paneli */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              isDark ? 'bg-green-500/10' : 'bg-green-50'
            }`}>
              <span className="text-lg">📅</span>
            </div>
            <h2 className={`text-lg font-semibold ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Günlük Servis Durumu
            </h2>
          </div>
        </div>

        {/* Özet İstatistikler */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">🛠️</span>
              <span className={`font-medium ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>Devam Eden</span>
            </div>
            <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>1</p>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">⏳</span>
              <span className={`font-medium ${isDark ? 'text-red-400' : 'text-red-700'}`}>Bekleyen</span>
            </div>
            <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>1</p>
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span className={`font-medium ${isDark ? 'text-green-400' : 'text-green-700'}`}>Tamamlanan</span>
            </div>
            <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>1</p>
          </div>
        </div>

        {/* Servis Tablosu */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Plaka</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Müşteri Adı</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Müşteri Şikayeti</th>
                <th className={`py-3 px-4 text-left text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Durum</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Devam Eden Servis */}
              <tr className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center">
                    <span>34 ABC 123</span>
                  </div>
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Ahmet Yılmaz</td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Motor çalışırken ses geliyor</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 whitespace-nowrap">
                    Devam Ediyor
                  </span>
                </td>
                <td className="py-3 px-4 relative">
                  <button
                    onClick={() => handleMenuClick('34ABC123')}
                    className={`p-1.5 rounded-lg transition-colors duration-200 ${
                      isDark 
                        ? 'hover:bg-gray-600/50' 
                        : 'hover:bg-gray-200/50'
                    }`}
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                  {activeMenu === '34ABC123' && (
                    <div 
                      className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                        isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                      } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                      style={{ right: '0.5rem' }}
                    >
                      <div className="py-2 px-1">
                        <button
                          onClick={() => handleAction('34ABC123', 'view-history')}
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
                          onClick={() => handleAction('34ABC123', 'service-detail')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">🛠️</span>
                          <span className="font-medium">Servis Detay</span>
                        </button>
                        <button
                          onClick={() => handleAction('34ABC123', 'mark-complete')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">✔️</span>
                          <span className="font-medium">Servisi Tamamla</span>
                        </button>
                        <button
                          onClick={() => handleAction('34ABC123', 'export-pdf')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">📄</span>
                          <span className="font-medium">PDF Raporu</span>
                        </button>
                        <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                        <button
                          onClick={() => handleAction('34ABC123', 'cancel')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-500/20' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <span className="mr-3 text-base">🗑️</span>
                          <span className="font-medium">İptal Et</span>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>

              {/* Bekleyen Servis */}
              <tr className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center">
                    <span>06 XYZ 456</span>
                  </div>
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mehmet Demir</td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Fren pedalı sert, frenleme zayıf</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 whitespace-nowrap">
                    Bekliyor
                  </span>
                </td>
                <td className="py-3 px-4 relative">
                  <button
                    onClick={() => handleMenuClick('06XYZ456')}
                    className={`p-1.5 rounded-lg transition-colors duration-200 ${
                      isDark 
                        ? 'hover:bg-gray-600/50' 
                        : 'hover:bg-gray-200/50'
                    }`}
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                  {activeMenu === '06XYZ456' && (
                    <div 
                      className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                        isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                      } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                      style={{ right: '0.5rem' }}
                    >
                      <div className="py-2 px-1">
                        <button
                          onClick={() => handleAction('06XYZ456', 'view-history')}
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
                          onClick={() => handleAction('06XYZ456', 'service-detail')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">🛠️</span>
                          <span className="font-medium">Servis Detay</span>
                        </button>
                        <button
                          onClick={() => handleAction('06XYZ456', 'start-service')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">▶️</span>
                          <span className="font-medium">İşleme Al</span>
                        </button>
                        <button
                          onClick={() => handleAction('06XYZ456', 'export-pdf')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">📄</span>
                          <span className="font-medium">PDF Raporu</span>
                        </button>
                        <div className="h-px mx-3 my-1 bg-gray-200 dark:bg-gray-700"></div>
                        <button
                          onClick={() => handleAction('06XYZ456', 'cancel')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-500/20' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <span className="mr-3 text-base">🗑️</span>
                          <span className="font-medium">İptal Et</span>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>

              {/* Tamamlanan Servis */}
              <tr className={`${isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center">
                    <span>35 DEF 789</span>
                  </div>
                </td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Ayşe Kaya</td>
                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Periyodik bakım ve yağ değişimi</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400 whitespace-nowrap">
                    Tamamlandı
                  </span>
                </td>
                <td className="py-3 px-4 relative">
                  <button
                    onClick={() => handleMenuClick('35DEF789')}
                    className={`p-1.5 rounded-lg transition-colors duration-200 ${
                      isDark 
                        ? 'hover:bg-gray-600/50' 
                        : 'hover:bg-gray-200/50'
                    }`}
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                  {activeMenu === '35DEF789' && (
                    <div 
                      className={`fixed mt-1 w-64 rounded-xl shadow-xl ${
                        isDark ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-200'
                      } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`} 
                      style={{ right: '0.5rem' }}
                    >
                      <div className="py-2 px-1">
                        <button
                          onClick={() => handleAction('35DEF789', 'view-history')}
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
                          onClick={() => handleAction('35DEF789', 'service-detail')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">🛠️</span>
                          <span className="font-medium">Servis Detay</span>
                        </button>
                        <button
                          onClick={() => handleAction('35DEF789', 'export-pdf')}
                          className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                            isDark 
                              ? 'text-gray-300 hover:bg-gray-700/70' 
                              : 'text-gray-700 hover:bg-gray-100/80'
                          }`}
                        >
                          <span className="mr-3 text-base">📄</span>
                          <span className="font-medium">PDF Raporu</span>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sayfalama */}
        <div className={`flex items-center justify-between px-6 py-4 ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-b-2xl border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Toplam 3 servis kaydı
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
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                const isNearCurrentPage = Math.abs(pageNumber - currentPage) <= 1;
                const isFirstPage = pageNumber === 1;
                const isLastPage = pageNumber === totalPages;

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
                  );
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
                  );
                }
                return null;
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

      {/* Günlük Finans Bölümü */}
      <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex flex-col items-center justify-center mb-8">
          <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-4 ${
            isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
          }`}>
            <span className="text-3xl">💰</span>
          </div>
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${
              isDark ? 'from-emerald-400 to-teal-400' : 'from-emerald-600 to-teal-600'
            } bg-clip-text text-transparent`}>
              Günlük Finans Raporu
            </h2>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Gelir/Gider Detayları */}
          <div className="space-y-6">
            {/* Gelirler */}
            <div className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} transition-all duration-200 hover:shadow-md`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                  <span className="text-base">📊</span>
                </div>
                <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Gelirler</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center px-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>İşçilik Geliri</span>
                  <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>5,500₺</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Parça Geliri</span>
                  <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>3,200₺</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Harici Gelir</span>
                  <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>0₺</span>
                </div>
                <div className={`h-px my-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}></div>
                <div className="flex justify-between items-center px-2">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Toplam Günlük Gelir</span>
                  <div className="flex flex-col items-end">
                    <span className={`font-semibold text-lg ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>8,700₺</span>
                    <span className={`text-xs ${isDark ? 'text-emerald-500/70' : 'text-emerald-600/70'}`}>+24% geçen haftaya göre</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giderler */}
            <div className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} transition-all duration-200 hover:shadow-md`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                  <span className="text-base">📉</span>
                </div>
                <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Giderler</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center px-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Elektrik Faturası</span>
                  <span className={`font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>500₺</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Stok Alımı</span>
                  <span className={`font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>1,200₺</span>
                </div>
                <div className={`h-px my-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}></div>
                <div className="flex justify-between items-center px-2">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Toplam Günlük Gider</span>
                  <div className="flex flex-col items-end">
                    <span className={`font-semibold text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>1,700₺</span>
                    <span className={`text-xs ${isDark ? 'text-red-500/70' : 'text-red-600/70'}`}>-12% geçen haftaya göre</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Kar */}
            <div className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} transition-all duration-200 hover:shadow-md`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                    <span className="text-base">💵</span>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Net Kar</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`font-semibold text-lg ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+7,000₺</span>
                  <span className={`text-xs ${isDark ? 'text-emerald-500/70' : 'text-emerald-600/70'}`}>+32% geçen haftaya göre</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Grafik */}
          <div className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} transition-all duration-200 hover:shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Haftalık Gelir/Gider Grafiği</h3>
              <div className={`text-xs px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                Son 7 Gün
              </div>
            </div>
            <Line
              data={{
                labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
                datasets: [
                  {
                    label: 'Gelir',
                    data: [8700, 7500, 9200, 8100, 8700, 6500, 4200],
                    borderColor: isDark ? 'rgb(52, 211, 153)' : 'rgb(16, 185, 129)',
                    backgroundColor: isDark ? 'rgba(52, 211, 153, 0.5)' : 'rgba(16, 185, 129, 0.5)',
                    tension: 0.4,
                    fill: true
                  },
                  {
                    label: 'Gider',
                    data: [1700, 2100, 1900, 2300, 1700, 1200, 800],
                    borderColor: isDark ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)',
                    backgroundColor: isDark ? 'rgba(248, 113, 113, 0.5)' : 'rgba(239, 68, 68, 0.5)',
                    tension: 0.4,
                    fill: true
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                      boxWidth: 8,
                      usePointStyle: true,
                      pointStyle: 'circle',
                      color: isDark ? '#e5e7eb' : '#374151',
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    titleColor: isDark ? '#e5e7eb' : '#374151',
                    bodyColor: isDark ? '#e5e7eb' : '#374151',
                    borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.3)',
                      display: false
                    },
                    ticks: {
                      color: isDark ? '#9ca3af' : '#6b7280',
                      padding: 8,
                      font: {
                        size: 11
                      }
                    },
                    border: {
                      display: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: isDark ? '#9ca3af' : '#6b7280',
                      padding: 8,
                      font: {
                        size: 11
                      }
                    },
                    border: {
                      display: false
                    }
                  }
                },
                elements: {
                  point: {
                    radius: 3,
                    hoverRadius: 5
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Test Butonu */}
      <div className="mt-8">
        <button 
          className={`px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 text-gray-200' 
              : 'bg-white/80 border-gray-200/50 hover:bg-gray-50/80 text-gray-700'
          } backdrop-blur hover:shadow-md`}
          onClick={() => DataService.getUsers().then(value => alert(JSON.stringify(value)))}
        >
        Send IPC - getUsers - alert example
      </button>
      </div>
    </div>
  )
}
