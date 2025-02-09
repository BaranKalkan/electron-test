import { Column, Table, TableAction } from '../components/Table/Table'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/customers')({
  component: Customers,
})

type Vehicle = {
  plate: string
  model: string
  lastService: string
  status: 'Tamamlandı' | 'Bekliyor'
}

type ServiceRecord = {
  date: string
  plate: string
  services: string
  cost: number
}

type Customer = {
  id: string
  name: string
  phone: string
  email: string
  vehicleCount: number
  lastServiceDate: string
  totalSpent: number
  vehicles: Vehicle[]
  serviceHistory: ServiceRecord[]
}

// Örnek müşteri verisi
const customersData: Customer[] = [
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
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)

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

  // Filtreleme fonksiyonu
  const filteredCustomers = customersData.filter(customer => {
    const searchLower = searchTerm.toLowerCase()
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    )
  })

  const actions: TableAction<Customer>[] = [
    {
      icon: '📄',
      label: 'Müşteri Detayları',
      onClick: (customer) =>  {
        setSelectedCustomer(customer.id)
        setShowSidebar(true)
      }
    },
    {
      icon: '🛠️',
      label: 'Yeni Servis Ekle',
      onClick: (customer) => console.log(`Yeni Servis Ekle for ${customer.id}`),
    },
    {
      icon: '🗑️',
      label: 'Müşteri Kaydını Sil',
      onClick: (customer) => console.log(`Müşteri Kaydını Sil for ${customer.id}`),
      variant: 'danger'
    }
  ]
  
  const columns: Column<Customer>[] = [
    { header: 'Name', key: 'name' },
    { header: 'Phone', key: 'phone' },
    { header: 'Email', key: 'email' },
  ]

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
      <Table<typeof customersData[0]> data={filteredCustomers} columns={columns} actions={actions} ></Table>

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