"use client"

import {
  BarChart3,
  BadgeDollarSign,
  Receipt,
  RotateCcw,
  CreditCard,
  PieChart,
  FileSpreadsheet,
} from "lucide-react"
import { FinanceTab } from "../types"

interface FinanceTabsProps {
  activeTab: FinanceTab
  onTabChange: (tab: FinanceTab) => void
}

const tabs: { name: FinanceTab; icon: React.ElementType }[] = [
  { name: "Finance Overview", icon: BarChart3 },
  { name: "Revenue", icon: BadgeDollarSign },
  { name: "Expenses", icon: Receipt },
  { name: "Reimbursements", icon: RotateCcw },
  { name: "Payments", icon: CreditCard },
  { name: "Budgets", icon: PieChart },
  { name: "Reports", icon: FileSpreadsheet },
]

export default function FinanceTabs({
  activeTab,
  onTabChange,
}: FinanceTabsProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.name

        return (
          <button
            key={tab.name}
            type="button"
            onClick={() => onTabChange(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? "bg-[#4F46E5] text-white shadow-sm shadow-indigo-200"
                : "text-slate-600 bg-white/40 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200/60"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
            <span>{tab.name}</span>
          </button>
        )
      })}
    </div>
  )
}
