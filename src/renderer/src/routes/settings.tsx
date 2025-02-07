import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

export const Route = createFileRoute('/settings')({
  component: Settings,
})

function Settings() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY')
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [backupLocation, setBackupLocation] = useState('C:/AnTek/Backups')
  const [autoBackup, setAutoBackup] = useState(true)
  const [lastBackupDate, setLastBackupDate] = useState('20.03.2024 15:30')
  const [currentVersion, setCurrentVersion] = useState('1.0.0')

  return (
    <div className="p-4 space-y-6">
      {/* Ana Konteyner */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        {/* Başlık */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-50'
          }`}>
            <span className="text-2xl">⚙️</span>
          </div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Ayarlar ve Yedekleme
          </h1>
        </div>

        {/* Ayarlar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Genel Sistem Ayarları */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-purple-500/10' : 'bg-purple-50'
              }`}>
                <span className="text-xl">🛠️</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Genel Sistem Ayarları
              </h2>
            </div>

            <div className="space-y-4">
              {/* Tema Ayarı */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tema
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-200 border-gray-600' 
                      : 'bg-white text-gray-700 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="light">Aydınlık Mod</option>
                  <option value="dark">Karanlık Mod</option>
                </select>
              </div>

              {/* Tarih Formatı */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tarih Formatı
                </label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-200 border-gray-600' 
                      : 'bg-white text-gray-700 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="DD/MM/YYYY">GG/AA/YYYY</option>
                  <option value="MM/DD/YYYY">AA/GG/YYYY</option>
                  <option value="YYYY/MM/DD">YYYY/AA/GG</option>
                </select>
              </div>

              {/* Otomatik Güncelleme */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Otomatik Güncelleme
                </span>
                <button
                  onClick={() => setAutoUpdate(!autoUpdate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    autoUpdate 
                      ? (isDark ? 'bg-blue-500' : 'bg-blue-600') 
                      : (isDark ? 'bg-gray-600' : 'bg-gray-300')
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      autoUpdate ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Yedekleme ve Geri Yükleme */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-green-500/10' : 'bg-green-50'
              }`}>
                <span className="text-xl">💾</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Yedekleme ve Geri Yükleme
              </h2>
            </div>

            <div className="space-y-4">
              {/* Yedekleme Konumu */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Yedekleme Konumu
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={backupLocation}
                    onChange={(e) => setBackupLocation(e.target.value)}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700/50 text-gray-200 border-gray-600' 
                        : 'bg-white text-gray-700 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <button
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700/70 border-gray-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                    } border`}
                  >
                    Gözat
                  </button>
                </div>
              </div>

              {/* Otomatik Yedekleme */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Otomatik Yedekleme
                </span>
                <button
                  onClick={() => setAutoBackup(!autoBackup)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    autoBackup 
                      ? (isDark ? 'bg-blue-500' : 'bg-blue-600') 
                      : (isDark ? 'bg-gray-600' : 'bg-gray-300')
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      autoBackup ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Son Yedekleme Bilgisi */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Son Yedekleme
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {lastBackupDate}
                  </span>
                </div>
              </div>

              {/* Yedekleme Butonları */}
              <div className="flex gap-3">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <span className="text-lg">💾</span>
                  <span>Yedekle</span>
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">🔄</span>
                  <span>Geri Yükle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Veri Temizleme */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-red-500/10' : 'bg-red-50'
              }`}>
                <span className="text-xl">🗑️</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Veri Temizleme
              </h2>
            </div>

            <div className="space-y-4">
              <button
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span>Geçmiş Kayıtları Temizle</span>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  30 günden eski
                </span>
              </button>

              <button
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  <span>Kullanılmayan Parçaları Temizle</span>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  90 gündür hareketsiz
                </span>
              </button>

              <button
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isDark 
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <span className="text-lg">🔄</span>
                <span>Fabrika Ayarlarına Döndür</span>
              </button>
            </div>
          </div>

          {/* Güncelleme ve Bakım */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-orange-500/10' : 'bg-orange-50'
              }`}>
                <span className="text-xl">🔍</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Güncelleme ve Bakım
              </h2>
            </div>

            <div className="space-y-4">
              {/* Mevcut Sürüm */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Mevcut Sürüm
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    v{currentVersion}
                  </span>
                </div>
              </div>

              {/* Güncelleme ve Bakım Butonları */}
              <div className="flex gap-3">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <span className="text-lg">🔄</span>
                  <span>Güncellemeleri Kontrol Et</span>
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">🛠️</span>
                  <span>Veritabanı Bakımı</span>
                </button>
              </div>
            </div>
          </div>

          {/* Kullanıcı Yönetimi */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-blue-500/10' : 'bg-blue-50'
              }`}>
                <span className="text-xl">👤</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Kullanıcı Yönetimi
              </h2>
            </div>

            <div className="space-y-4">
              {/* Kullanıcı Listesi */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Aktif Kullanıcılar
                  </span>
                  <button
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <span>Yeni Kullanıcı</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDark ? 'bg-gray-800/50' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">👨‍💼</span>
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Ahmet Yılmaz
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Yönetici
                        </div>
                      </div>
                    </div>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Düzenle
                    </button>
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDark ? 'bg-gray-800/50' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">👨‍🔧</span>
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Mehmet Demir
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Çalışan
                        </div>
                      </div>
                    </div>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Düzenle
                    </button>
                  </div>
                </div>
              </div>

              {/* Yetkilendirme Ayarları */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Varsayılan Çalışan Yetkileri
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Stok Ayarlarını Değiştirme
                    </span>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        isDark ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Rapor Görüntüleme
                    </span>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        isDark ? 'bg-blue-500' : 'bg-blue-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Müşteri Bilgilerini Düzenleme
                    </span>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        isDark ? 'bg-blue-500' : 'bg-blue-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Güncelleme Geçmişi */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'
              }`}>
                <span className="text-xl">📋</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Güncelleme Geçmişi
              </h2>
            </div>

            <div className="space-y-3">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Sürüm 1.0.0
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    20.03.2024
                  </div>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  • İlk sürüm yayınlandı
                  <br />
                  • Temel özellikler eklendi
                </div>
              </div>
            </div>
          </div>

          {/* Veritabanı Bakımı */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'
              }`}>
                <span className="text-xl">🔧</span>
              </div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Veritabanı Bakımı
              </h2>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Son Bakım Tarihi
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    19.03.2024 14:45
                  </span>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Tüm tablolar optimize edildi ve indeksler yenilendi.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <span className="text-lg">🔄</span>
                  <span>Tabloları Optimize Et</span>
                </button>
                <button
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDark 
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' 
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  <span className="text-lg">🔍</span>
                  <span>Tutarlılık Kontrolü</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 