"use client"

import {
  BarChart3,
  Receipt,
  FileSpreadsheet,
  RotateCcw,
  CreditCard,
  FileBarChart,
} from "lucide-react"
import { AccountantTab } from "../types"

interface AccountantTabsProps {
  activeTab: AccountantTab
  onTabChange: (tab: AccountantTab) => void
}

const tabs: { name: AccountantTab; icon: React.ElementType }[] = [
  { name: "Finance Overview", icon: BarChart3 },
  { name: "Transactions", icon: Receipt },
  { name: "Expense Entries", icon: FileSpreadsheet },
  { name: "Reimbursements", icon: RotateCcw },
  { name: "Payments", icon: CreditCard },
  { name: "Reports", icon: FileBarChart },
]

export default function AccountantTabs({
  activeTab,
  onTabChange,
}: AccountantTabsProps) {
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
                : "text-slate-600 bg-white/60 hover:bg-white hover:text-slate-900 border border-slate-200/60"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${
                isActive ? "text-white" : "text-slate-500"
              }`}
            />
            <span>{tab.name}</span>
          </button>
        )
      })}
    </div>
  )
}

