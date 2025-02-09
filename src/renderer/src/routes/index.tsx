import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (plateId: string) => {
    setActiveMenu(activeMenu === plateId ? null : plateId);
  };

  const handleAction = (plateId: string, action: string) => {
    console.log(`${action} for ${plateId}`);
    setActiveMenu(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hızlı İşlemler Bölümü */}
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
              <span className="text-lg">⚡</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Hızlı İşlemler
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="group flex flex-col items-center p-4 rounded-xl transition-all duration-200 cursor-pointer bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md"
              onClick={() => console.log(`Clicked: ${action.title}`)}
            >
              <div className="mb-3 text-2xl transition-transform duration-200 group-hover:scale-110 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {action.icon}
              </div>
              <span className="text-sm font-medium text-center transition-colors duration-200 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Servis Durumu Paneli */}
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10">
              <span className="text-lg">📅</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Günlük Servis Durumu
            </h2>
          </div>
        </div>

        {/* Özet İstatistikler */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛠️</span>
              <span className="font-medium text-yellow-700 dark:text-yellow-400">Devam Eden</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-yellow-700 dark:text-yellow-400">1</p>
          </div>
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏳</span>
              <span className="font-medium text-red-700 dark:text-red-400">Bekleyen</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-red-700 dark:text-red-400">1</p>
          </div>
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span className="font-medium text-green-700 dark:text-green-400">Tamamlanan</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-green-700 dark:text-green-400">1</p>
          </div>
        </div>

        {/* Servis Tablosu */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Plaka</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri Adı</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri Şikayeti</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Devam Eden Servis */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <span>34 ABC 123</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Ahmet Yılmaz</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Motor çalışırken ses geliyor</td>
                <td className="py-3 px-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 whitespace-nowrap">
                    Devam Ediyor
                  </span>
                </td>
                <td className="py-3 px-4 relative">
                  <button
                    onClick={() => handleMenuClick('34ABC123')}
                    className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                  {activeMenu === '34ABC123' && (
                    <div 
                      className="fixed mt-1 w-64 rounded-xl shadow-xl bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100"
                      style={{ right: '0.5rem' }}
                    >
                      <div className="py-2 px-1">
                        <button
                          onClick={() => handleAction('34ABC123', 'view-history')}
                          className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/70"
                        >
                          Servis Geçmişi
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
