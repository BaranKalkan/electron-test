import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'
import { companyConfig } from '../config/companyConfig'

const menuItems = [
  {
    path: '/',
    name: 'Ana Sayfa',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    path: '/vehicles',
    name: 'Araç Yönetimi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM8 12h8" />
      </svg>
    )
  },
  {
    path: '/customers',
    name: 'Müşteri Yönetimi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    path: '/services',
    name: 'Servis Yönetimi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    path: '/inventory',
    name: 'Parça ve Stok Yönetimi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    path: '/reports',
    name: 'Raporlama ve Analiz',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    path: '/settings',
    name: 'Ayarlar ve Yedekleme',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  },
  {
    path: '/about',
    name: 'Hakkında',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export const Route = createRootRoute({
  component: () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const getLinkClassName = (isActive: boolean) => `
      block px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
      ${isActive 
        ? (isDark 
          ? 'bg-gradient-to-r from-blue-900 to-sky-900 text-blue-300' 
          : 'bg-gradient-to-r from-blue-50 to-sky-50 text-blue-600'
        )
        : (isDark
          ? 'text-gray-300 hover:bg-gray-700'
          : 'text-gray-600 hover:bg-gray-100'
        )
      }
    `;

    return (
      <div className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        {/* Modern Navigation Bar */}
        <nav className={`${
          isDark 
            ? 'bg-gray-800 bg-opacity-90 border-gray-700' 
            : 'bg-white bg-opacity-90 border-gray-200'
        } backdrop-blur-sm border-b sticky top-0 z-50 transition-colors duration-200`}>
          <div className="w-full px-4">
            <div className="flex justify-between items-center h-16 relative">
              {/* Left Side - Hamburger Menu Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className={`p-2 rounded-lg ${
                    isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Center - Brand */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 select-none">
                <div className="flex items-center space-x-3">
                  {/* Product Name */}
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent pointer-events-none">
                    {companyConfig.product.name}
                  </span>
                  {/* Separator */}
                  <div className={`h-6 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                  {/* Customer Name */}
                  <div className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  } pointer-events-none`}>
                    {companyConfig.customer.name}
                  </div>
                </div>
              </div>

              {/* Right Side - Theme Toggle Button */}
              <div className="flex-shrink-0">
                <button 
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div 
            className={`fixed inset-y-0 left-0 w-64 transition-transform duration-300 ease-in-out transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } ${isDark ? 'bg-gray-800' : 'bg-white'} border-r ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } flex flex-col h-screen`}
          >
            {/* Menu Items */}
            <div className="flex-1 pt-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <div className="px-4 space-y-1.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    activeProps={{ className: getLinkClassName(true) }}
                    inactiveProps={{ className: getLinkClassName(false) }}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright Section */}
            <div className={`p-4 border-t ${
              isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
            } mt-auto select-none pointer-events-none`}>
              <div className="text-center text-sm">
                <div className="font-semibold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
                  {companyConfig.product.developer}
                </div>
                <div className="mt-1">
                  © {new Date().getFullYear()} Tüm hakları saklıdır.
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <main className={`px-4 sm:px-6 lg:px-8 py-8 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              <Outlet />
            </main>
          </div>
        </div>

        {/* DevTools - Only in development */}
        {/* process.env.NODE_ENV === 'development' && <TanStackRouterDevtools /> */}
      </div>
    )
  }
})