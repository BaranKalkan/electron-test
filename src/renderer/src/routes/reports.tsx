import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const Route = createFileRoute('/reports')({
  component: Reports,
})

function Reports() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [selectedReport, setSelectedReport] = useState('daily')
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    return date.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => {
    const date = new Date()
    return date.toISOString().split('T')[0]
  })
  const [showReportTypeDropdown, setShowReportTypeDropdown] = useState(false)
  const reportTypeDropdownRef = useRef<HTMLDivElement>(null)
  const reportTypeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'))
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  // Dışarı tıklamayı dinle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reportTypeDropdownRef.current && 
        reportTypeButtonRef.current && 
        !reportTypeDropdownRef.current.contains(event.target as Node) && 
        !reportTypeButtonRef.current.contains(event.target as Node)
      ) {
        setShowReportTypeDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Örnek veri - Gerçek uygulamada API'den gelecek
  const serviceData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        label: 'Gelir',
        data: [5200, 4800, 6300, 5900, 7200, 4500, 3800],
        borderColor: isDark ? 'rgb(34, 197, 94)' : 'rgb(22, 163, 74)',
        backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(22, 163, 74, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Gider',
        data: [4100, 3900, 5100, 4800, 5900, 3800, 3200],
        borderColor: isDark ? 'rgb(239, 68, 68)' : 'rgb(220, 38, 38)',
        backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Net Kâr',
        data: [1100, 900, 1200, 1100, 1300, 700, 600],
        borderColor: isDark ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)',
        backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Servis Sayısı',
        data: [12, 15, 13, 16, 14, 8, 6],
        borderColor: isDark ? 'rgb(168, 85, 247)' : 'rgb(126, 34, 206)',
        backgroundColor: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(126, 34, 206, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  }

  const incomeData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        label: 'Gelir',
        data: [5200, 4800, 6300, 5900, 7200, 4500, 3800],
        backgroundColor: isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(22, 163, 74, 0.8)'
      },
      {
        label: 'Gider',
        data: [4100, 3900, 5100, 4800, 5900, 3800, 3200],
        backgroundColor: isDark ? 'rgba(239, 68, 68, 0.8)' : 'rgba(220, 38, 38, 0.8)'
      }
    ]
  }

  const partsData = {
    labels: ['Yağ Filtresi', 'Hava Filtresi', 'Fren Balatası', 'Motor Yağı', 'Yakıt Filtresi'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          isDark ? 'rgba(96, 165, 250, 0.8)' : 'rgba(37, 99, 235, 0.8)',
          isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(22, 163, 74, 0.8)',
          isDark ? 'rgba(239, 68, 68, 0.8)' : 'rgba(220, 38, 38, 0.8)',
          isDark ? 'rgba(168, 85, 247, 0.8)' : 'rgba(126, 34, 206, 0.8)',
          isDark ? 'rgba(251, 146, 60, 0.8)' : 'rgba(234, 88, 12, 0.8)'
        ]
      }
    ]
  }

  // Özet veriler - Gerçek uygulamada API'den gelecek
  const summaryData = {
    totalServices: 84,
    totalIncome: 37700,
    totalExpense: 30800,
    netProfit: 6900,
    averageServiceValue: 448.81,
    mostUsedParts: ['Yağ Filtresi', 'Motor Yağı', 'Fren Balatası'],
    topCustomers: ['Ahmet Yılmaz', 'Mehmet Demir', 'Ayşe Kaya']
  }

  return (
    <div className="p-4 space-y-6">
      {/* Ana Konteyner */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        {/* Başlık ve Filtreler */}
        <div className="flex flex-col gap-6">
          {/* Üst Kısım: Başlık */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <span className="text-2xl">📊</span>
            </div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Raporlama ve Analiz
            </h1>
          </div>

          {/* Filtreler ve Butonlar */}
          <div className="flex flex-col gap-4">
            {/* Filtreler */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Rapor Türü Dropdown */}
              <div className="relative">
                <button
                  ref={reportTypeButtonRef}
                  onClick={() => setShowReportTypeDropdown(!showReportTypeDropdown)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700/70' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>
                    {selectedReport === 'daily'
                      ? 'Günlük Rapor'
                      : selectedReport === 'weekly' 
                      ? 'Haftalık Rapor' 
                      : selectedReport === 'monthly' 
                      ? 'Aylık Rapor' 
                      : selectedReport === 'yearly' 
                      ? 'Yıllık Rapor'
                      : 'Özel Tarih Aralığı'}
                  </span>
                  <svg 
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${showReportTypeDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showReportTypeDropdown && (
                  <div 
                    ref={reportTypeDropdownRef}
                    style={{ zIndex: 50 }}
                    className={`absolute left-0 mt-2 w-48 rounded-xl shadow-lg border ${
                      isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
                    }`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedReport('daily')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                        } ${selectedReport === 'daily' ? (isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50') : ''}`}
                      >
                        Günlük Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('weekly')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                        } ${selectedReport === 'weekly' ? (isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50') : ''}`}
                      >
                        Haftalık Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('monthly')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                        } ${selectedReport === 'monthly' ? (isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50') : ''}`}
                      >
                        Aylık Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('yearly')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                        } ${selectedReport === 'yearly' ? (isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50') : ''}`}
                      >
                        Yıllık Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('custom')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:${
                          isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                        } ${selectedReport === 'custom' ? (isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50') : ''}`}
                      >
                        Özel Tarih Aralığı
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Özel Tarih Seçimi - Sadece 'custom' seçiliyse göster */}
              {selectedReport === 'custom' && (
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700/70 border-gray-600' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>-</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700/70 border-gray-600' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
              )}

              {/* PDF ve Yazdırma Butonları */}
              <div className="flex items-center gap-3 ml-auto">
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}>
                  <span className="text-lg">📄</span>
                  <span>PDF İndir</span>
                </button>
                
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                  <span className="text-lg">🖨️</span>
                  <span>Yazdır</span>
                </button>
              </div>
            </div>

            {/* Özet Bilgiler */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Toplam Servis */}
              <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700/30 hover:bg-gray-700/40' 
                  : 'bg-gray-50/80 hover:bg-gray-50'
              } group`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  isDark ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-blue-50 group-hover:bg-blue-100'
                }`}>
                  <span className="text-xl">🛠️</span>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {summaryData.totalServices}
                  </div>
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Servis
                  </div>
                </div>
              </div>

              {/* Toplam Gelir */}
              <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700/30 hover:bg-gray-700/40' 
                  : 'bg-gray-50/80 hover:bg-gray-50'
              } group`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  isDark ? 'bg-green-500/10 group-hover:bg-green-500/20' : 'bg-green-50 group-hover:bg-green-100'
                }`}>
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    ₺{summaryData.totalIncome.toLocaleString('tr-TR')}
                  </div>
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Gelir
                  </div>
                </div>
              </div>

              {/* Toplam Gider */}
              <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700/30 hover:bg-gray-700/40' 
                  : 'bg-gray-50/80 hover:bg-gray-50'
              } group`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  isDark ? 'bg-red-500/10 group-hover:bg-red-500/20' : 'bg-red-50 group-hover:bg-red-100'
                }`}>
                  <span className="text-xl">💸</span>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    ₺{summaryData.totalExpense.toLocaleString('tr-TR')}
                  </div>
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Gider
                  </div>
                </div>
              </div>

              {/* Net Kâr */}
              <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700/30 hover:bg-gray-700/40' 
                  : 'bg-gray-50/80 hover:bg-gray-50'
              } group`}>
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  isDark ? 'bg-purple-500/10 group-hover:bg-purple-500/20' : 'bg-purple-50 group-hover:bg-purple-100'
                }`}>
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    ₺{summaryData.netProfit.toLocaleString('tr-TR')}
                  </div>
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Net Kâr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik Kartları Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Servis İstatistikleri */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <span className="text-xl">🛠️</span>
            </div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Servis İstatistikleri
            </h2>
          </div>

          <div className="h-[300px]">
            <Line
              data={serviceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false
                },
                plugins: {
                  legend: {
                    display: true,
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
                    displayColors: true,
                    boxWidth: 6,
                    boxHeight: 6,
                    usePointStyle: true,
                    callbacks: {
                      label: function(context) {
                        if (context.dataset.yAxisID === 'y1') {
                          return context.dataset.label + ': ' + context.parsed.y + ' adet'
                        }
                        return context.dataset.label + ': ₺' + context.parsed.y.toLocaleString('tr-TR')
                      }
                    }
                  }
                },
                hover: {
                  mode: 'index',
                  intersect: false
                },
                elements: {
                  point: {
                    radius: 0,
                    hoverRadius: 6,
                    hitRadius: 30
                  },
                  line: {
                    borderWidth: 3
                  }
                },
                scales: {
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    grid: {
                      color: isDark ? 'rgba(75, 85, 99, 0.1)' : 'rgba(209, 213, 219, 0.2)'
                    },
                    ticks: {
                      color: isDark ? '#9ca3af' : '#6b7280',
                      padding: 10,
                      callback: function(value) {
                        return '₺' + value.toLocaleString('tr-TR')
                      },
                      font: {
                        size: 11
                      }
                    },
                    border: {
                      display: false
                    }
                  },
                  y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: isDark ? '#9ca3af' : '#6b7280',
                      padding: 10,
                      callback: function(value) {
                        return value + ' adet'
                      },
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
                }
              }}
            />
          </div>
        </div>

        {/* Gelir-Gider Analizi */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              isDark ? 'bg-green-500/10' : 'bg-green-50'
            }`}>
              <span className="text-xl">💰</span>
            </div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Gelir-Gider Analizi
            </h2>
          </div>
          <div className="h-[300px]">
            <Bar
              data={incomeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: isDark ? '#e5e7eb' : '#374151'
                    }
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
                      color: isDark ? '#9ca3af' : '#6b7280'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: isDark ? '#9ca3af' : '#6b7280'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* En Çok Kullanılan Parçalar */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              isDark ? 'bg-amber-500/10' : 'bg-amber-50'
            }`}>
              <span className="text-xl">📦</span>
            </div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              En Çok Kullanılan Parçalar
            </h2>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-[80%] h-[80%]">
              <Pie
                data={partsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: isDark ? '#e5e7eb' : '#374151'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Kritik Stok Uyarıları */}
        <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              isDark ? 'bg-red-500/10' : 'bg-red-50'
            }`}>
              <span className="text-xl">⚠️</span>
            </div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Kritik Stok Uyarıları
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Yağ Filtresi', stock: 5, min: 10 },
              { name: 'Fren Balatası', stock: 3, min: 8 },
              { name: 'Hava Filtresi', stock: 4, min: 10 }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-xl ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Mevcut Stok: {item.stock} adet
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'
                  }`}>
                    Min: {item.min}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 