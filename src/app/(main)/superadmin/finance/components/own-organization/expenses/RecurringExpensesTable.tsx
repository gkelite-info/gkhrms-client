"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  Plus,
  Eye,
  Edit2,
  Pause,
  Play,
  Calendar,
  Landmark,
  CreditCard,
  ArrowUpRight,
  Banknote,
  Check,
} from "lucide-react"
import {
  RecurringExpenseRecord,
  INITIAL_RECURRING_EXPENSES,
} from "./RecurringExpensesData"
import RecurringExpenseDetailsModal from "./RecurringExpenseDetailsModal"
import EditRecurringExpenseModal from "./EditRecurringExpenseModal"
import AddRecurringExpenseModal from "./AddRecurringExpenseModal"

interface RecurringExpensesTableProps {
  items?: RecurringExpenseRecord[]
  externalAddOpen?: boolean
  onCloseExternalAdd?: () => void
}

export default function RecurringExpensesTable({
  items: initialItems = INITIAL_RECURRING_EXPENSES,
  externalAddOpen,
  onCloseExternalAdd,
}: RecurringExpensesTableProps) {
  const [items, setItems] = useState<RecurringExpenseRecord[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedFrequency, setSelectedFrequency] = useState("All Frequencies")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const [categoryOpen, setCategoryOpen] = useState(false)
  const [frequencyOpen, setFrequencyOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const categoryRef = useRef<HTMLDivElement>(null)
  const frequencyRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const [viewItem, setViewItem] = useState<RecurringExpenseRecord | null>(null)
  const [editItem, setEditItem] = useState<RecurringExpenseRecord | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false)
      }
      if (
        frequencyRef.current &&
        !frequencyRef.current.contains(event.target as Node)
      ) {
        setFrequencyOpen(false)
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setStatusOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, status: it.status === "Active" ? "Paused" : "Active" }
          : it
      )
    )
  }

  const handleAddItem = (newItem: RecurringExpenseRecord) => {
    setItems((prev) => [newItem, ...prev])
  }

  const handleUpdateItem = (updated: RecurringExpenseRecord) => {
    setItems((prev) =>
      prev.map((it) => (it.id === updated.id ? updated : it))
    )
  }

  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        it.expenseName.toLowerCase().includes(q) ||
        it.vendor.toLowerCase().includes(q) ||
        (it.notes && it.notes.toLowerCase().includes(q))

      const matchesCat =
        selectedCategory === "All Categories" ||
        it.category === selectedCategory

      const matchesFreq =
        selectedFrequency === "All Frequencies" ||
        it.frequency === selectedFrequency

      const matchesStat =
        selectedStatus === "All Status" || it.status === selectedStatus

      return matchesSearch && matchesCat && matchesFreq && matchesStat
    })
  }, [items, searchQuery, selectedCategory, selectedFrequency, selectedStatus])

  const getCategoryBadge = (cat: RecurringExpenseRecord["category"]) => {
    switch (cat) {
      case "Rent & Facilities":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] whitespace-nowrap">
            🏢 Rent & Facilities
          </span>
        )
      case "Utilities":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] whitespace-nowrap">
            ⚡ Utilities
          </span>
        )
      case "Software Subscription":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] whitespace-nowrap">
            ☁ Software Subscription
          </span>
        )
      case "Maintenance":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDF2F8] text-[#DB2777] border border-[#FBCFE8] whitespace-nowrap">
            🛠 Maintenance
          </span>
        )
      case "Insurance":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] whitespace-nowrap">
            🛡 Insurance
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

  const getMethodBadge = (method: RecurringExpenseRecord["paymentMethod"]) => {
    switch (method) {
      case "Bank Transfer":
        return (
          <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs whitespace-nowrap">
            <Landmark className="w-3.5 h-3.5 text-slate-500" />
            <span>Bank Transfer</span>
          </div>
        )
      case "Card":
        return (
          <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs whitespace-nowrap">
            <CreditCard className="w-3.5 h-3.5 text-slate-500" />
            <span>Card</span>
          </div>
        )
      case "UPI":
        return (
          <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs whitespace-nowrap">
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            <span>UPI</span>
          </div>
        )
      case "Cash":
        return (
          <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs whitespace-nowrap">
            <Banknote className="w-3.5 h-3.5 text-slate-500" />
            <span>Cash</span>
          </div>
        )
      default:
        return <span className="text-slate-500">—</span>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[220px] max-w-xs flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search expense..."
              className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-xs transition-all"
            />
          </div>

          <div ref={categoryRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCategoryOpen(!categoryOpen)
                setFrequencyOpen(false)
                setStatusOpen(false)
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
                  "Rent & Facilities",
                  "Utilities",
                  "Software Subscription",
                  "Maintenance",
                  "Insurance",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(opt)
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

          <div ref={frequencyRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setFrequencyOpen(!frequencyOpen)
                setCategoryOpen(false)
                setStatusOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedFrequency}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {frequencyOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Frequencies", "Monthly", "Quarterly", "Yearly"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedFrequency(opt)
                        setFrequencyOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedFrequency === opt
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

          <div ref={statusRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setStatusOpen(!statusOpen)
                setCategoryOpen(false)
                setFrequencyOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Status", "Active", "Paused"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(opt)
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
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="h-9 px-4 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Recurring Expense
        </button>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="p-5 pb-3">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Recurring Expenses
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                <th className="py-3 px-5 whitespace-nowrap">Expense Name</th>
                <th className="py-3 px-4 whitespace-nowrap">Vendor</th>
                <th className="py-3 px-4 whitespace-nowrap">Category</th>
                <th className="py-3 px-4 whitespace-nowrap">Frequency</th>
                <th className="py-3 px-4 whitespace-nowrap">Amount</th>
                <th className="py-3 px-4 whitespace-nowrap">Next Due Date</th>
                <th className="py-3 px-4 whitespace-nowrap">Payment Method</th>
                <th className="py-3 px-4 whitespace-nowrap">Status</th>
                <th className="py-3 px-5 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    No recurring expenses found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-bold text-slate-800 whitespace-nowrap">
                      {item.expenseName}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                      {item.vendor}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getCategoryBadge(item.category)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.frequency}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {item.amount}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {item.nextDueDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getMethodBadge(item.paymentMethod)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] whitespace-nowrap">
                          <Check className="w-3 h-3 text-[#059669]" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] whitespace-nowrap">
                          <Pause className="w-3 h-3 text-[#D97706]" />
                          Paused
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setViewItem(item)}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-[#5B50E5] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditItem(item)}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-[#5B50E5] transition-colors cursor-pointer"
                          title="Edit Recurring Expense"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
                            item.status === "Active"
                              ? "text-slate-500 hover:text-amber-600"
                              : "text-emerald-600 hover:text-emerald-700 font-semibold"
                          }`}
                          title={
                            item.status === "Active"
                              ? "Pause Schedule"
                              : "Resume Schedule"
                          }
                        >
                          {item.status === "Active" ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Resume</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RecurringExpenseDetailsModal
        item={viewItem}
        onClose={() => setViewItem(null)}
      />

      <EditRecurringExpenseModal
        item={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleUpdateItem}
      />

      <AddRecurringExpenseModal
        isOpen={isAddOpen || Boolean(externalAddOpen)}
        onClose={() => {
          setIsAddOpen(false)
          if (onCloseExternalAdd) onCloseExternalAdd()
        }}
        onAdd={handleAddItem}
      />
    </div>
  )
}
