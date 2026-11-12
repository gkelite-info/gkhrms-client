"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import {
  transactionDateRanges,
  transactionTypesList,
  transactionCategoriesList,
  paymentMethodsList,
} from "../data/mockAccountantData"

interface AccountantTransactionsFilterProps {
  dateRange: string
  onDateRangeChange: (val: string) => void
  transactionType: string
  onTransactionTypeChange: (val: string) => void
  category: string
  onCategoryChange: (val: string) => void
  paymentMethod: string
  onPaymentMethodChange: (val: string) => void
}

export default function AccountantTransactionsFilter({
  dateRange,
  onDateRangeChange,
  transactionType,
  onTransactionTypeChange,
  category,
  onCategoryChange,
  paymentMethod,
  onPaymentMethodChange,
}: AccountantTransactionsFilterProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-100 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5 tracking-tight">
            Date Range
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("dateRange")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2 truncate">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{dateRange}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "dateRange" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[220px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {transactionDateRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      onDateRangeChange(range)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                      dateRange === range
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5 tracking-tight">
            Transaction Type
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("type")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left"
          >
            <span className="truncate">{transactionType}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "type" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[210px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {transactionTypesList.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      onTransactionTypeChange(type)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                      transactionType === type
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5 tracking-tight">
            Category
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("category")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left"
          >
            <span className="truncate">{category}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "category" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {transactionCategoriesList.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                      category === cat
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5 tracking-tight">
            Payment Method
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("paymentMethod")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left"
          >
            <span className="truncate">{paymentMethod}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "paymentMethod" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[190px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {paymentMethodsList.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      onPaymentMethodChange(method)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium transition-colors cursor-pointer ${
                      paymentMethod === method
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

