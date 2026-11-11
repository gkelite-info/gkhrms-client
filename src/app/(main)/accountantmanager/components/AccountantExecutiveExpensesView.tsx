"use client"

import { useState, useMemo } from "react"
import {
  ClipboardList,
  Zap,
  Building2,
  Calendar,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  FileText,
} from "lucide-react"
import ReusableAvatar from "../../../../../reusableComponents/ReusableAvatar"
import AccountantViewExpenseModal from "./AccountantViewExpenseModal"
import {
  mockExecutiveExpenseKpis,
  mockExecutiveExpenseEntries,
  executiveExpenseTypeOptions,
  executiveExpenseExecutiveOptions,
  executiveExpenseStatusOptions,
  executiveExpenseMonthOptions,
} from "../data/mockAccountantData"
import { AccountantExecutiveExpenseEntry, AccountantExpenseEntry } from "../types"

interface AccountantExecutiveExpensesViewProps {
  onViewEntry?: (entry: AccountantExecutiveExpenseEntry) => void
}

export default function AccountantExecutiveExpensesView({
  onViewEntry,
}: AccountantExecutiveExpensesViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Expense Type")
  const [selectedExecutive, setSelectedExecutive] = useState("Executive")
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [selectedMonth, setSelectedMonth] = useState("Month")

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [execDropdownOpen, setExecDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedModalEntry, setSelectedModalEntry] =
    useState<AccountantExpenseEntry | null>(null)
  const pageSize = 5

  const closeAllDropdowns = () => {
    setTypeDropdownOpen(false)
    setExecDropdownOpen(false)
    setStatusDropdownOpen(false)
    setMonthDropdownOpen(false)
  }

  const filteredEntries = useMemo(() => {
    return mockExecutiveExpenseEntries.filter((item) => {
      if (
        selectedType !== "Expense Type" &&
        selectedType !== "Expense Type: All" &&
        item.expenseType !== selectedType
      ) {
        return false
      }

      if (
        selectedExecutive !== "Executive" &&
        selectedExecutive !== "Executive: All" &&
        item.executiveName !== selectedExecutive
      ) {
        return false
      }

      if (
        selectedStatus !== "Status" &&
        selectedStatus !== "Status: All" &&
        item.status !== selectedStatus
      ) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesId = item.expenseId.toLowerCase().includes(q)
        const matchesExec = item.executiveName.toLowerCase().includes(q)
        const matchesVendor = item.vendorProvider.toLowerCase().includes(q)
        const matchesType = item.expenseType.toLowerCase().includes(q)
        const matchesAmt = item.amount.toLowerCase().includes(q)
        if (!matchesId && !matchesExec && !matchesVendor && !matchesType && !matchesAmt) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, selectedType, selectedExecutive, selectedStatus])

  const totalEntriesCount = mockExecutiveExpenseKpis.totalEntries
  const totalPages = 24
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredEntries.slice(start, start + pageSize)
  }, [filteredEntries, currentPage, pageSize])

  const handleOpenDetail = (item: AccountantExecutiveExpenseEntry) => {
    if (onViewEntry) {
      onViewEntry(item)
      return
    }

    const modalAdapted: AccountantExpenseEntry = {
      id: item.expenseId,
      expenseType: item.expenseType,
      vendor: item.vendorProvider,
      billNumber: `${item.expenseId}-BILL`,
      billDate: item.date,
      dueDate: item.date,
      amount: item.amount,
      numericAmount: item.numericAmount,
      paymentMethod: "Bank Transfer",
      status: item.status === "Completed" ? "Paid" : item.status === "Rejected" ? "Draft" : "Pending",
      notes: `Executive Entry handled by ${item.executiveName}`,
    }
    setSelectedModalEntry(modalAdapted)
  }

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#EDE9FE] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Total Entries
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveExpenseKpis.totalEntries}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-[#D97706]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Utility Bills
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveExpenseKpis.utilityBills}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#EDE9FE] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Office & Admin Entries
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveExpenseKpis.officeAdminEntries}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-500 truncate leading-tight">
              Completed This Month
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              {mockExecutiveExpenseKpis.completedThisMonth}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by expense ID, executive, vendor, or bill..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !typeDropdownOpen
                closeAllDropdowns()
                setTypeDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedType}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {typeDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveExpenseTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedType(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedType === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !execDropdownOpen
                closeAllDropdowns()
                setExecDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedExecutive}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {execDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveExpenseExecutiveOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedExecutive(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedExecutive === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !statusDropdownOpen
                closeAllDropdowns()
                setStatusDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {statusDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 left-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveExpenseStatusOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedStatus(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedStatus === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const state = !monthDropdownOpen
                closeAllDropdowns()
                setMonthDropdownOpen(state)
              }}
              className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {monthDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} />
                <div className="absolute top-full mt-1.5 right-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveExpenseMonthOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedMonth(opt)
                        closeAllDropdowns()
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedMonth === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 pb-3 flex items-center gap-2.5 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-[#FAF5FF] flex items-center justify-center text-[#7C3AED] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Expense Entries (Handled by Accountant Executives)
          </h2>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white">
                <th className="py-3.5 px-5 font-bold">EXPENSE ID</th>
                <th className="py-3.5 px-4 font-bold">DATE</th>
                <th className="py-3.5 px-4 font-bold">EXECUTIVE</th>
                <th className="py-3.5 px-4 font-bold">EXPENSE TYPE</th>
                <th className="py-3.5 px-4 font-bold">VENDOR / PROVIDER</th>
                <th className="py-3.5 px-4 font-bold">AMOUNT</th>
                <th className="py-3.5 px-4 font-bold">STATUS</th>
                <th className="py-3.5 px-5 font-bold text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedEntries.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-5 font-bold text-[#4F46E5] whitespace-nowrap">
                    {item.expenseId}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <ReusableAvatar
                        src={item.executiveAvatar}
                        name={item.executiveName}
                        size={28}
                        shape="circle"
                        fallbackType="initials"
                        className="shrink-0"
                      />
                      <span className="font-semibold text-slate-900">
                        {item.executiveName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                    {item.expenseType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                    {item.vendorProvider}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {item.amount}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(item)}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-[#7C3AED] hover:bg-purple-50 transition-colors cursor-pointer"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedEntries.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-slate-400">
                    No expense entries found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Showing 1 to {paginatedEntries.length} of {totalEntriesCount} entries
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#4F46E5] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <span className="text-slate-400 text-xs px-1">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === totalPages
                  ? "bg-[#4F46E5] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {totalPages}
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AccountantViewExpenseModal
        expense={selectedModalEntry}
        onClose={() => setSelectedModalEntry(null)}
      />
    </div>
  )
}

