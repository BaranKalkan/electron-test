import { DataService } from '@renderer/services/DataService'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
  loader: () => DataService.getUsers(),
})

function About() {
  const userData = Route.useLoaderData()
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

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

  const features = [
    'Araç ve müşteri yönetimi',
    'Günlük servis takip paneli',
    'Parça ve stok takibi',
    'Raporlama ve finans analizi',
    'Offline çalışma desteği'
  ]

  const updates = [
    { version: 'v1.0.0', date: '03 Şubat 2025', notes: 'İlk Yayın', status: 'current' },
    { version: 'v1.1.0', date: 'Planlanan', notes: 'Stok yönetimi geliştirmeleri, yeni filtreleme seçenekleri', status: 'planned' }
  ]

  const faqs = [
    {
      question: 'Uygulama offline çalışıyor mu?',
      answer: 'Evet, tüm veriler yerel olarak saklanır.'
    },
    {
      question: 'Verilerimi nasıl yedekleyebilirim?',
      answer: '"Ayarlar > Yedekleme" menüsünden manuel yedek alabilirsiniz.'
    },
    {
      question: 'Fiyatlandırma nasıl çalışıyor?',
      answer: 'Tek seferlik 180$ ödeme ile tüm özelliklere sınırsız erişim.'
    }
  ]

  const guides = [
    'Nasıl servis kaydı eklerim?',
    'Yeni müşteri nasıl eklenir?',
    'Parça ve stok nasıl takip edilir?',
    'Günlük finans raporları nasıl alınır?'
  ]

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Uygulama Tanıtımı */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-50'
          }`}>
            <span className="text-3xl">🚀</span>
          </div>
          <div>
            <h1 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${
              isDark ? 'from-blue-400 to-sky-400' : 'from-blue-600 to-sky-600'
            } bg-clip-text text-transparent`}>
              AnSer – Oto Servis Takip Sistemi
            </h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Modern ve kullanıcı dostu servis takip sistemi
            </p>
          </div>
        </div>

        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          AnSer, oto servisler için geliştirilmiş modern ve kullanıcı dostu bir servis takip sistemidir.
          Araç kayıtları, müşteri yönetimi, parça ve stok kontrolü, servis süreçleri ve finansal raporları tek bir yerden yönetmek için geliştirilmiştir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className={`p-4 rounded-xl ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-50'
            } flex items-center gap-3`}>
              <span className="text-lg">✨</span>
              <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sürüm Bilgileri */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-50'
          }`}>
            <span className="text-2xl">🔄</span>
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Sürüm Bilgileri & Güncellemeler
          </h2>
        </div>

        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={index} className={`p-4 rounded-xl ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {update.version}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  update.status === 'current'
                    ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'
                    : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                }`}>
                  {update.status === 'current' ? 'Mevcut Sürüm' : 'Planlanan'}
                </span>
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {update.date} - {update.notes}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 ${
            isDark 
              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-[1.02]' 
              : 'bg-red-50 text-red-600 hover:bg-red-100 hover:scale-[1.02]'
          }`}>
            <span className="text-xl">🐛</span>
            <span className="font-medium">Hata Bildir</span>
          </button>
          
          <button className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 ${
            isDark 
              ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:scale-[1.02]' 
              : 'bg-amber-50 text-amber-600 hover:bg-amber-100 hover:scale-[1.02]'
          }`}>
            <span className="text-xl">💡</span>
            <span className="font-medium">Öneri/İstek Gönder</span>
          </button>
        </div>
      </div>

      {/* SSS ve Kullanım Kılavuzu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* SSS */}
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
              isDark ? 'bg-amber-500/10' : 'bg-amber-50'
            }`}>
              <span className="text-2xl">❓</span>
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {faq.question}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kullanım Kılavuzu */}
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
              isDark ? 'bg-rose-500/10' : 'bg-rose-50'
            }`}>
              <span className="text-2xl">📚</span>
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Kullanım Kılavuzu
            </h2>
          </div>

          <div className="space-y-3">
            {guides.map((guide, index) => (
              <div key={index} className={`p-4 rounded-xl ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-50'
              } flex items-center gap-3`}>
                <span className="text-lg">📖</span>
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{guide}</span>
              </div>
            ))}
          </div>

          <button className={`mt-6 w-full py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
            isDark 
              ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:scale-[1.02]' 
              : 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-[1.02]'
          }`}>
            <span className="text-xl">📚</span>
            <span className="font-medium">Detaylı Kılavuzu İndir (PDF)</span>
          </button>
        </div>
      </div>

      {/* Lisans Bilgileri */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg mb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
            isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'
          }`}>
            <span className="text-2xl">📜</span>
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Lisans & Kullanım Koşulları
          </h2>
        </div>

        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} space-y-4`}>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Bu yazılım Anda Teknoloji tarafından geliştirilmiştir.
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Ticari amaçla kopyalanamaz veya izinsiz kullanılamaz.
          </p>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Kullanıcı verileri yalnızca yerel cihazda saklanır.
          </p>
        </div>

        <button className={`mt-6 w-full py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
          isDark 
            ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:scale-[1.02]' 
            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-[1.02]'
        }`}>
          <span className="text-xl">📜</span>
          <span className="font-medium">Tam Lisans Metnini İndir</span>
        </button>
      </div>

      {/* Mevcut Kullanıcı Listesi (Korundu) */}
      <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          Mevcut Kullanıcılar
        </h2>
        {userData.success ? (
          <div className={`p-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {userData.data.map(user => (
              <p key={user.id}>{user.id} - {user.name}</p>
            ))}
          </div>
        ) : (
          <div className={`p-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {userData.error}
          </div>
        )}
      </div>
    </div>
  )
}
