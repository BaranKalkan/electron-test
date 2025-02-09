import React, { useState } from 'react'
import { Pagination } from '../Pagination/Pagination'

export type Column<T> = {
  header: string
  key: keyof T
  width?: string
  render?: (item: T) => React.ReactNode
}

type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
  itemsPerPage?: number
  actions?: TableAction<T>[]
  totalCount?: number
}

export type TableAction<T> = {
  icon: string
  label: string
  onClick: (item: T) => void
  variant?: 'default' | 'danger'
}

function Table<T extends { id: string | number }>({
  columns,
  data,
  actions,
  itemsPerPage = 5,
  totalCount
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenu, setActiveMenu] = useState<string | number | null>(null)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleMenuClick = (id: string | number) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  return (
    <div className="rounded-2xl dark:bg-gray-800/40 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b dark:border-gray-700 border-gray-200`}>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-4 px-6 text-left text-sm font-medium dark:text-gray-400 text-gray-500`}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
              {actions && <th className="w-10"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className={`dark:hover:bg-gray-700/30 hover:bg-gray-50 transition-colors duration-200`}
              >
                {columns.map((column, index) => (
                  <td key={index} className={`py-4 px-6 dark:text-gray-300 text-gray-700`}>
                    {column.render ? column.render(item) : String(item[column.key])}
                  </td>
                ))}

                {actions && (
                  <td className="py-4 px-6 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMenuClick(item.id)
                      }}
                      className={`p-1.5 rounded-lg transition-colors duration-200 dark:hover:bg-gray-600/50 hover:bg-gray-200/50`}
                    >
                      <span className="text-xl">⋮</span>
                    </button>

                    {activeMenu === item.id && (
                      <div
                        className={`fixed mt-1 w-64 rounded-xl shadow-xl dark:bg-gray-800/95 dark:border-gray-700 bg-white/95 border border-gray-200'
                            } backdrop-blur-sm z-50 transform transition-all duration-200 ease-out scale-100 opacity-100`}
                        style={{ right: '0.5rem' }}
                      >
                        <div className="py-2 px-1">
                          {actions.map((action, actionIndex) => (
                            <React.Fragment key={actionIndex}>
                              <button
                                onClick={() => action.onClick(item)}
                                className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-700/70 text-gray-700 hover:bg-gray-100/80`}
                              >
                                {action.icon ? (
                                  <span className="mr-3 text-base">{action.icon}</span>
                                ) : null}
                                <span className="font-medium">{action.label}</span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalCount ?? data.length} onPageChange={handlePageChange}></Pagination>
    </div>
  )
}

export { Table }
