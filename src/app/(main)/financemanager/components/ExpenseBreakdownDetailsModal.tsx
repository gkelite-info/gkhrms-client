"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import {
  expenseBreakdownDetailsKpis,
  expenseBreakdownDetailsData,
} from "../data/mockFinanceData"

interface ExpenseBreakdownDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExpenseBreakdownDetailsModal({
  isOpen,
  onClose,
}: ExpenseBreakdownDetailsModalProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedRange, setSelectedRange] = useState("Last 12 Months")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

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

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="breakdown-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col p-5 sm:p-7 space-y-6 animate-in fade-in zoom-in-95"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2
              id="breakdown-modal-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
            >
              Expense Breakdown Details
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Category-wise company spending overview.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedRange}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20">
                  {["Last 12 Months", "Last 6 Months", "Last 30 Days"].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSelectedRange(opt)
                          setDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                          selectedRange === opt
                            ? "bg-indigo-50 text-[#4F46E5] font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Total Expenses
              </span>
              <span className="text-xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                {expenseBreakdownDetailsKpis.totalExpenses}
              </span>
            </div>
          </div>

          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Highest Category
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight mt-0.5 truncate">
                {expenseBreakdownDetailsKpis.highestCategory.name}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                {expenseBreakdownDetailsKpis.highestCategory.amount} (
                {expenseBreakdownDetailsKpis.highestCategory.share})
              </span>
            </div>
          </div>

          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
              <ArrowDownRight className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Lowest Category
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight mt-0.5 truncate">
                {expenseBreakdownDetailsKpis.lowestCategory.name}
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                {expenseBreakdownDetailsKpis.lowestCategory.amount} (
                {expenseBreakdownDetailsKpis.lowestCategory.share})
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-1">
          <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight self-start mb-3">
              Expense by Category
            </h3>

            <div className="relative w-48 h-48 flex items-center justify-center shrink-0 my-2">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs shadow-lg">
                              <span className="font-semibold">{data.name}: </span>
                              <span className="text-indigo-300 font-bold">
                                {data.share} ({data.amount})
                              </span>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Pie
                      data={expenseBreakdownDetailsData}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={78}
                      paddingAngle={2}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {expenseBreakdownDetailsData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-36 h-36 rounded-full border-4 border-slate-100 animate-pulse" />
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-base font-extrabold text-slate-900 leading-none">
                  $2.18M
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-1">
                  Total Expenses
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="w-full">
              <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                <span className="col-span-6">Category</span>
                <span className="col-span-3 text-right">Amount</span>
                <span className="col-span-3 text-right">Share %</span>
              </div>

              <div className="divide-y divide-slate-50 text-xs">
                {expenseBreakdownDetailsData.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-12 items-center py-2.5 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="col-span-6 flex items-center gap-2.5 min-w-0 pr-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-semibold text-slate-700 truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="col-span-3 text-right font-bold text-slate-900">
                      {item.amount}
                    </span>
                    <span className="col-span-3 text-right font-medium text-slate-500">
                      {item.share}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

