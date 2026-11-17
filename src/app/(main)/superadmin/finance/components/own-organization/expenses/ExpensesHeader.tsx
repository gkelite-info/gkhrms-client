"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import {
  Calendar,
  ChevronDown,
  Plus,
  LayoutGrid,
  FileText,
  CalendarCheck,
  Receipt,
} from "lucide-react"

export type ExpenseSubPill =
  | "overview"
  | "all_expenses"
  | "recurring"
  | "reimbursements"

interface ExpensesHeaderProps {
  activePill: ExpenseSubPill
  onPillChange: (pill: ExpenseSubPill) => void
  onAddExpense: () => void
  selectedMonth?: string
  onMonthChange?: (month: string) => void
}

export default function ExpensesHeader({
  activePill,
  onPillChange,
  onAddExpense,
  selectedMonth = "Nov 2026",
  onMonthChange,
}: ExpensesHeaderProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedMonth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const MONTH_OPTIONS = [
    "Nov 2026",
    "Oct 2026",
    "Sep 2026",
    "Aug 2026",
    "Jul 2026",
    "Jun 2026",
  ]

  const SUB_PILLS: {
    id: ExpenseSubPill
    label: string
    icon: ReactNode
  }[] = [
      {
        id: "overview",
        label: "Overview",
        icon: <LayoutGrid className="w-3.5 h-3.5" />,
      },
      {
        id: "all_expenses",
        label: "All Expenses",
        icon: <FileText className="w-3.5 h-3.5" />,
      },
      {
        id: "recurring",
        label: "Recurring Expenses",
        icon: <CalendarCheck className="w-3.5 h-3.5" />,
      },
      {
        id: "reimbursements",
        label: "Reimbursements",
        icon: <Receipt className="w-3.5 h-3.5" />,
      },
    ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (m: string) => {
    setCurrentMonth(m)
    setDropdownOpen(false)
    if (onMonthChange) onMonthChange(m)
  }

  const getButtonLabel = () => {
    if (activePill === "recurring") return "Add Recurring Expense"
    if (activePill === "reimbursements") return "Add Reimbursement"
    return "Add Expense"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {activePill === "reimbursements" ? "Expenses" : "Expenses Overview"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {activePill === "reimbursements"
              ? "Track organization expenses, reimbursements and recurring costs in one place."
              : "Track and manage organization expenses, spending trends, and category-wise costs."}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentMonth}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {MONTH_OPTIONS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelect(m)}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${currentMonth === m
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                      }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onAddExpense}
            className="h-9 px-4 rounded-xl bg-[#5B50E5] hover:bg-[#4E44C9] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {getButtonLabel()}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {SUB_PILLS.map((p) => {
          const isActive = activePill === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPillChange(p.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${isActive
                  ? "bg-[#5B50E5] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/70"
                }`}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
