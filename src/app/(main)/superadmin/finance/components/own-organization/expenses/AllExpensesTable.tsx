"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Check,
  Calendar,
  Landmark,
  CreditCard,
  ArrowUpRight,
  Banknote,
  ArrowUpDown,
} from "lucide-react"
import { ExpenseRecord } from "./ExpensesData"
import ExpenseDetailsModal from "./ExpenseDetailsModal"
import EditExpenseModal from "./EditExpenseModal"

interface AllExpensesTableProps {
  expenses: ExpenseRecord[]
  onUpdateExpense: (updated: ExpenseRecord) => void
}

export default function AllExpensesTable({
  expenses,
  onUpdateExpense,
}: AllExpensesTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedMethod, setSelectedMethod] = useState("All Methods")
  const [selectedDateRange, setSelectedDateRange] = useState("All Dates")

  const [categoryOpen, setCategoryOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [methodOpen, setMethodOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)

  const categoryRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const methodRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)

  const [sortField, setSortField] = useState<
    "id" | "title" | "amount" | "expenseDate" | null
  >(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 8

  const [viewExpense, setViewExpense] = useState<ExpenseRecord | null>(null)
  const [editExpense, setEditExpense] = useState<ExpenseRecord | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false)
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setStatusOpen(false)
      }
      if (
        methodRef.current &&
        !methodRef.current.contains(event.target as Node)
      ) {
        setMethodOpen(false)
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSort = (field: "id" | "title" | "amount" | "expenseDate") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleMarkAsPaid = (item: ExpenseRecord) => {
    if (item.paymentStatus === "Paid") return
    onUpdateExpense({
      ...item,
      paymentStatus: "Paid",
    })
  }

  const parseAmountNumber = (amtStr: string) => {
    return Number(amtStr.replace(/[^0-9.-]+/g, "")) || 0
  }

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((exp) => {
        const q = searchQuery.toLowerCase()
        const matchesSearch =
          exp.id.toLowerCase().includes(q) ||
          exp.title.toLowerCase().includes(q) ||
          (exp.notes && exp.notes.toLowerCase().includes(q))

        const matchesCat =
          selectedCategory === "All Categories" ||
          exp.category === selectedCategory

        const matchesStat =
          selectedStatus === "All Status" ||
          exp.paymentStatus === selectedStatus

        const matchesMeth =
          selectedMethod === "All Methods" ||
          exp.paymentMethod === selectedMethod

        return matchesSearch && matchesCat && matchesStat && matchesMeth
      })
      .sort((a, b) => {
        if (!sortField) return 0
        if (sortField === "amount") {
          const numA = parseAmountNumber(a.amount)
          const numB = parseAmountNumber(b.amount)
          return sortOrder === "asc" ? numA - numB : numB - numA
        }
        if (sortField === "expenseDate") {
          return sortOrder === "asc"
            ? a.expenseDate.localeCompare(b.expenseDate)
            : b.expenseDate.localeCompare(a.expenseDate)
        }
        if (sortField === "id") {
          return sortOrder === "asc"
            ? a.id.localeCompare(b.id)
            : b.id.localeCompare(a.id)
        }
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      })
  }, [
    expenses,
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedMethod,
    sortField,
    sortOrder,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredExpenses.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", 16]
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      16,
    ]
  }, [currentPage, totalPages])

  const getCategoryBadge = (cat: ExpenseRecord["category"]) => {
    switch (cat) {
      case "Office & Infrastructure":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDF2F8] text-[#9333EA] border border-[#FBCFE8] whitespace-nowrap">
            🏢 Office & Infrastructure
          </span>
        )
      case "Software & Tools":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] whitespace-nowrap">
            ☁ Software & Tools
          </span>
        )
      case "Travel & Conveyance":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] whitespace-nowrap">
            ⚠ Travel & Conveyance
          </span>
        )
      case "Utilities":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] whitespace-nowrap">
            ⚡ Utilities
          </span>
        )
      case "Reimbursement":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] whitespace-nowrap">
            💳 Reimbursement
          </span>
        )
      case "Salaries & Benefits":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC] whitespace-nowrap">
            👥 Salaries & Benefits
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200 whitespace-nowrap">
            {cat}
          </span>
        )
    }
  }

  const getMethodBadge = (method?: ExpenseRecord["paymentMethod"]) => {
    switch (method) {
      case "Bank Transfer":
        return (
          <div className="flex items-center gap-1.5 text-[#4F46E5] font-medium text-xs whitespace-nowrap">
            <Landmark className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Bank Transfer</span>
          </div>
        )
      case "Card":
        return (
          <div className="flex items-center gap-1.5 text-[#4F46E5] font-medium text-xs whitespace-nowrap">
            <CreditCard className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Card</span>
          </div>
        )
      case "UPI":
        return (
          <div className="flex items-center gap-1.5 text-[#D97706] font-medium text-xs whitespace-nowrap">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706]" />
            <span>UPI</span>
          </div>
        )
      case "Cash":
        return (
          <div className="flex items-center gap-1.5 text-[#4F46E5] font-medium text-xs whitespace-nowrap">
            <Banknote className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Cash</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-1.5 text-[#4F46E5] font-medium text-xs whitespace-nowrap">
            <Landmark className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Bank Transfer</span>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search expenses (ID, title, vendor...)"
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div ref={categoryRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCategoryOpen(!categoryOpen)
                setStatusOpen(false)
                setMethodOpen(false)
                setDateOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "All Categories",
                  "Office & Infrastructure",
                  "Software & Tools",
                  "Utilities",
                  "Reimbursement",
                  "Travel & Conveyance",
                  "Salaries & Benefits",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(opt)
                      setCurrentPage(1)
                      setCategoryOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedCategory === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={statusRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setStatusOpen(!statusOpen)
                setCategoryOpen(false)
                setMethodOpen(false)
                setDateOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Status", "Paid", "Unpaid"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(opt)
                      setCurrentPage(1)
                      setStatusOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedStatus === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={methodRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setMethodOpen(!methodOpen)
                setCategoryOpen(false)
                setStatusOpen(false)
                setDateOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedMethod}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {methodOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Methods", "Bank Transfer", "Card", "UPI", "Cash"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedMethod(opt)
                        setCurrentPage(1)
                        setMethodOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedMethod === opt
                          ? "font-bold text-[#5B50E5]"
                          : "text-slate-600"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div ref={dateRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDateOpen(!dateOpen)
                setCategoryOpen(false)
                setStatusOpen(false)
                setMethodOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dateOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "All Dates",
                  "This Month (Nov 2026)",
                  "Last Month (Oct 2026)",
                  "Last 3 Months",
                  "This Year (2026)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedDateRange(opt)
                      setCurrentPage(1)
                      setDateOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedDateRange === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th
                  onClick={() => handleSort("id")}
                  className="py-3.5 px-3.5 cursor-pointer select-none group whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Expense ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("title")}
                  className="py-3.5 px-3 cursor-pointer select-none group whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Expense Title</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </div>
                </th>
                <th className="py-3.5 px-3 whitespace-nowrap">Category</th>
                <th
                  onClick={() => handleSort("amount")}
                  className="py-3.5 px-3 cursor-pointer select-none group whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("expenseDate")}
                  className="py-3.5 px-3 cursor-pointer select-none group whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Expense Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </div>
                </th>
                <th className="py-3.5 px-3 whitespace-nowrap">Payment Status</th>
                <th className="py-3.5 px-3 whitespace-nowrap">Payment Method</th>
                <th className="py-3.5 px-3.5 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedExpenses.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    No expenses found matching the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedExpenses.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3 px-3.5 font-bold text-slate-800 whitespace-nowrap">
                      {item.id}
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {item.title}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      {getCategoryBadge(item.category)}
                    </td>

                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {item.amount}
                    </td>

                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {item.expenseDate}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      {item.paymentStatus === "Paid" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] whitespace-nowrap">
                          <Check className="w-3 h-3 text-[#059669]" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] whitespace-nowrap">
                          Unpaid
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      {getMethodBadge(item.paymentMethod)}
                    </td>

                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewExpense(item)}
                          className="p-1 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditExpense(item)}
                          className="p-1 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                          title="Edit Expense"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={item.paymentStatus === "Paid"}
                          onClick={() => handleMarkAsPaid(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] border transition-all ${
                            item.paymentStatus === "Paid"
                              ? "border-slate-200 text-slate-300 font-medium opacity-60 pointer-events-none"
                              : "border-[#5B50E5] text-[#5B50E5] font-semibold hover:bg-[#EEF0FD] cursor-pointer"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              item.paymentStatus === "Paid"
                                ? "text-slate-300"
                                : "text-[#5B50E5]"
                            }`}
                          />
                          Mark as Paid
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredExpenses.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + rowsPerPage, filteredExpenses.length)}
            </span>{" "}
            of <span className="font-bold text-slate-700">124</span> expenses
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {paginationItems.map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 font-medium"
                  >
                    ...
                  </span>
                )
              }

              const pageNum = Number(item)
              const isActive = currentPage === pageNum

              return (
                <button
                  key={`${pageNum}-${index}`}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5B50E5] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 font-medium rounded-lg"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ExpenseDetailsModal
        expense={viewExpense}
        onClose={() => setViewExpense(null)}
      />

      <EditExpenseModal
        expense={editExpense}
        onClose={() => setEditExpense(null)}
        onSave={onUpdateExpense}
      />
    </div>
  )
}
