type PaginationProps = {
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }: PaginationProps) => {
  return (
    <>
      <div
        className={`flex items-center justify-between px-6 py-4 dark:bg-gray-800/60 bg-white/60 backdrop-blur-sm rounded-b-2xl border-t dark:border-gray-700/50 border-gray-200/50`}
      >
        <div className={`text-sm font-medium 'dark:text-gray-400 text-gray-600`}>
          Toplam {totalItems} adet
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? 'dark:text-gray-600 text-gray-300 cursor-not-allowed'
                : 'dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-blue-400 text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className={`flex items-center dark:bg-gray-700/50 bg-gray-100 rounded-lg px-2`}>
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
                    onClick={() => onPageChange(pageNumber)}
                    className={`min-w-[2rem] h-8 mx-0.5 text-sm font-medium rounded-md transition-all duration-200 ${
                      isCurrentPage
                        ? 'dark:bg-blue-500/20 dark:text-blue-400 bg-blue-100 text-blue-600'
                        : 'dark:text-gray-400 dark:hover:text-blue-400 text-gray-600 hover:text-blue-600'
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
                    className={`min-w-[2rem] h-8 mx-0.5 flex items-center justify-center text-sm dark:text-gray-600 text-gray-400`}
                  >
                    ···
                  </span>
                )
              }
              return null
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? 'dark:text-gray-600 dark:cursor-not-allowed text-gray-300 cursor-not-allowed'
                : 'dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-blue-400 text-gray-600 hover:bg-gray-100 hover:text-blue-60'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export { Pagination }
