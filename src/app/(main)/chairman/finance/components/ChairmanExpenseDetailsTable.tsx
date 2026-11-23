"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronDown,
  RotateCcw,
  Zap,
  Server,
  Heart,
  Building,
  Check,
  Clock,
  X,
  Eye,
} from "lucide-react"
import {
  EXPENSE_DETAILS_RECORDS,
  ExpenseDetailItem,
} from "./ChairmanExpensesData"

export default function ChairmanExpenseDetailsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("All Departments")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isDeptOpen, setIsDeptOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false)

  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetailItem | null>(null)

  const departments = ["All Departments", "Administration", "IT", "HR", "Marketing"]
  const categories = [
    "All Categories",
    "Utilities",
    "IT & Infrastructure",
    "Employee Welfare",
    "Facilities",
  ]

  const filteredRecords = useMemo(() => {
    return EXPENSE_DETAILS_RECORDS.filter((item) => {
      const matchSearch =
        item.expenseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase())
      const matchDept =
        selectedDept === "All Departments" || item.department === selectedDept
      const matchCat =
        selectedCategory === "All Categories" ||
        item.category.label === selectedCategory
      return matchSearch && matchDept && matchCat
    })
  }, [searchTerm, selectedDept, selectedCategory])

  const totalEntries = 132
  const totalPages = Math.ceil(totalEntries / pageSize)

  const handleReset = () => {
    setSearchTerm("")
    setSelectedDept("All Departments")
    setSelectedCategory("All Categories")
    setCurrentPage(1)
  }

  const renderCategoryIcon = (icon: ExpenseDetailItem["category"]["icon"]) => {
    switch (icon) {
      case "zap":
        return <Zap className="w-3 h-3 shrink-0" />
      case "server":
        return <Server className="w-3 h-3 shrink-0" />
      case "heart":
        return <Heart className="w-3 h-3 shrink-0" />
      case "building":
        return <Building className="w-3 h-3 shrink-0" />
    }
  }

  const renderStatusIcon = (icon: ExpenseDetailItem["status"]["icon"]) => {
    switch (icon) {
      case "check":
        return <Check className="w-3 h-3 stroke-[2.5]" />
      case "clock":
        return <Clock className="w-3 h-3" />
      case "x":
        return <X className="w-3 h-3" />
    }
  }

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100/80 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-3.5">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight shrink-0">
          Expense Details
        </h2>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full md:w-auto">
          <div className="relative min-w-[180px] sm:min-w-[220px] flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Expense Name, Department..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200/80 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5B50E5] focus:bg-white transition-all"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsDeptOpen(!isDeptOpen)
                setIsCatOpen(false)
              }}
              className="h-8 px-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="truncate max-w-[130px]">Dept: {selectedDept}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isDeptOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      setSelectedDept(dept)
                      setIsDeptOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedDept === dept
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsCatOpen(!isCatOpen)
                setIsDeptOpen(false)
              }}
              className="h-8 px-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="truncate max-w-[130px]">Cat: {selectedCategory}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isCatOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat)
                      setIsCatOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedCategory === cat
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="h-8 px-2.5 text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Expense Name
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Category
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Department
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Amount (₹)
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Approved By
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="py-3 px-4 sm:px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-4 sm:px-5 text-xs text-slate-700 font-medium whitespace-nowrap">
                  {item.date}
                </td>

                <td className="py-3 px-4 sm:px-5 text-xs font-semibold text-slate-800 whitespace-nowrap">
                  {item.expenseName}
                </td>

                <td className="py-3 px-4 sm:px-5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.category.bgClass} ${item.category.colorClass} ${item.category.borderClass}`}
                  >
                    {renderCategoryIcon(item.category.icon)}
                    {item.category.label}
                  </span>
                </td>

                <td className="py-3 px-4 sm:px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {item.department}
                </td>

                <td className="py-3 px-4 sm:px-5 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {item.amount}
                </td>

                <td className="py-3 px-4 sm:px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {item.approvedBy}
                </td>

                <td className="py-3 px-4 sm:px-5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.status.bgClass} ${item.status.colorClass} ${item.status.borderClass}`}
                  >
                    {renderStatusIcon(item.status.icon)}
                    {item.status.label}
                  </span>
                </td>

                <td className="py-3 px-4 sm:px-5 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setSelectedExpense(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B50E5] hover:text-[#4E44C9] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 sm:p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none">
        <span className="text-slate-400 font-medium text-[11px] sm:text-xs">
          Showing 1 – {filteredRecords.length} of {totalEntries} expenses
        </span>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
              className="h-7 px-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Rows per page: {pageSize}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isPageSizeOpen && (
              <div className="absolute right-0 bottom-full mb-1 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[5, 10, 20, 50].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setPageSize(size)
                      setIsPageSizeOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      pageSize === size
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-slate-200/80 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer ${
                currentPage === 1
                  ? "bg-[#5B50E5] text-white"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer ${
                currentPage === 2
                  ? "bg-[#5B50E5] text-white"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer ${
                currentPage === 3
                  ? "bg-[#5B50E5] text-white"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer ${
                currentPage === totalPages
                  ? "bg-[#5B50E5] text-white"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {totalPages}
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-slate-200/80 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedExpense.expenseName}
                </h3>
                <span className="text-xs text-slate-400">{selectedExpense.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExpense(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">Department</span>
                <span className="font-semibold text-slate-800">
                  {selectedExpense.department}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">Category</span>
                <span className="font-semibold text-slate-800">
                  {selectedExpense.category.label}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">Amount</span>
                <span className="font-bold text-slate-900 text-sm">
                  ₹ {selectedExpense.amount}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block">Approved By</span>
                <span className="font-semibold text-slate-800">
                  {selectedExpense.approvedBy}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-medium">Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${selectedExpense.status.bgClass} ${selectedExpense.status.colorClass} ${selectedExpense.status.borderClass}`}
              >
                {renderStatusIcon(selectedExpense.status.icon)}
                {selectedExpense.status.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
