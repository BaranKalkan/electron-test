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
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Gider',
        data: [4100, 3900, 5100, 4800, 5900, 3800, 3200],
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Net Kâr',
        data: [1100, 900, 1200, 1100, 1300, 700, 600],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Servis Sayısı',
        data: [12, 15, 13, 16, 14, 8, 6],
        borderColor: 'rgb(126, 34, 206)',
        backgroundColor: 'rgba(126, 34, 206, 0.1)',
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
        backgroundColor: 'rgba(22, 163, 74, 0.8)'
      },
      {
        label: 'Gider',
        data: [4100, 3900, 5100, 4800, 5900, 3800, 3200],
        backgroundColor: 'rgba(220, 38, 38, 0.8)'
      }
    ]
  }

  const partsData = {
    labels: ['Yağ Filtresi', 'Hava Filtresi', 'Fren Balatası', 'Motor Yağı', 'Yakıt Filtresi'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(22, 163, 74, 0.8)',
          'rgba(220, 38, 38, 0.8)',
          'rgba(126, 34, 206, 0.8)',
          'rgba(234, 88, 12, 0.8)'
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
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm shadow-lg">
        {/* Başlık ve Filtreler */}
        <div className="flex flex-col gap-6">
          {/* Üst Kısım: Başlık */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <span className="text-2xl">📊</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
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
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700/70 dark:text-gray-200"
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
                    className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedReport('daily')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          selectedReport === 'daily' 
                            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Günlük Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('weekly')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          selectedReport === 'weekly' 
                            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Haftalık Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('monthly')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          selectedReport === 'monthly' 
                            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Aylık Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('yearly')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          selectedReport === 'yearly' 
                            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Yıllık Rapor
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport('custom')
                          setShowReportTypeDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          selectedReport === 'custom' 
                            ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Özel Tarih Aralığı
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tarih Aralığı */}
              {selectedReport === 'custom' && (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700/70 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                  />
                  <span className="text-gray-500 dark:text-gray-400">-</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700/70 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Toplam Servis */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Toplam Servis
                </div>
                <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100">
                  {summaryData.totalServices}
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <span className="text-xl">🛠️</span>
              </div>
            </div>
          </div>

          {/* Toplam Gelir */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Toplam Gelir
                </div>
                <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100">
                  {summaryData.totalIncome}₺
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10">
                <span className="text-xl">💰</span>
              </div>
            </div>
          </div>

          {/* Toplam Gider */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Toplam Gider
                </div>
                <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100">
                  {summaryData.totalExpense}₺
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10">
                <span className="text-xl">💸</span>
              </div>
            </div>
          </div>

          {/* Net Kâr */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Net Kâr
                </div>
                <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100">
                  {summaryData.netProfit}₺
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10">
                <span className="text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Servis ve Gelir Grafiği */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
              Servis ve Gelir Analizi
            </h3>
            <Line 
              data={serviceData}
              options={{
                responsive: true,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                scales: {
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                      color: 'rgb(107, 114, 128)',
                    },
                    grid: {
                      color: 'rgba(107, 114, 128, 0.1)',
                    }
                  },
                  y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                      color: 'rgb(107, 114, 128)',
                    },
                    grid: {
                      display: false,
                    }
                  },
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'rgb(107, 114, 128)',
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Gelir/Gider Grafiği */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
              Gelir/Gider Dağılımı
            </h3>
            <Bar 
              data={incomeData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'rgb(107, 114, 128)',
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    ticks: {
                      color: 'rgb(107, 114, 128)',
                    },
                    grid: {
                      color: 'rgba(107, 114, 128, 0.1)',
                    }
                  },
                  x: {
                    ticks: {
                      color: 'rgb(107, 114, 128)',
                    },
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>

          {/* En Çok Kullanılan Parçalar */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
              En Çok Kullanılan Parçalar
            </h3>
            <Pie 
              data={partsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'rgb(107, 114, 128)',
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Özet Bilgiler */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
              Özet Bilgiler
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ortalama Servis Değeri
                </div>
                <div className="text-lg font-bold mt-1 text-gray-800 dark:text-gray-100">
                  {summaryData.averageServiceValue}₺
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  En Çok Kullanılan Parçalar
                </div>
                <div className="mt-1 space-y-1">
                  {summaryData.mostUsedParts.map((part, index) => (
                    <div key={index} className="text-gray-700 dark:text-gray-300">
                      {part}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  En Çok İşlem Yapılan Müşteriler
                </div>
                <div className="mt-1 space-y-1">
                  {summaryData.topCustomers.map((customer, index) => (
                    <div key={index} className="text-gray-700 dark:text-gray-300">
                      {customer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 