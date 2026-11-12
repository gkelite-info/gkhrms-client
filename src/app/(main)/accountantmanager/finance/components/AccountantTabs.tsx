"use client"

import {
  BarChart3,
  Receipt,
  Folder,
  RotateCcw,
  CircleDollarSign,
  TrendingUp,
  Users,
} from "lucide-react"
import { AccountantTab } from "../types"
import { useAccountant } from "../context/AccountantContext"

interface AccountantTabsProps {
  activeTab: AccountantTab
  onTabChange: (tab: AccountantTab) => void
}

const myFinanceTabs: { name: AccountantTab; icon: React.ElementType }[] = [
  { name: "Finance Overview", icon: BarChart3 },
  { name: "Transactions", icon: Receipt },
  { name: "Expense Entries", icon: Folder },
  { name: "Reimbursements", icon: RotateCcw },
  { name: "Payments", icon: CircleDollarSign },
  { name: "Reports", icon: TrendingUp },
]

const executiveFinanceTabs: { name: AccountantTab; icon: React.ElementType }[] = [
  { name: "Executives Overview", icon: Users },
  { name: "Transactions", icon: Receipt },
  { name: "Expense Entries", icon: Folder },
  { name: "Reimbursements", icon: RotateCcw },
  { name: "Reports", icon: TrendingUp },
]

export default function AccountantTabs({
  activeTab,
  onTabChange,
}: AccountantTabsProps) {
  const { financeMode } = useAccountant()
  const currentTabs =
    financeMode === "Executive Finance"
      ? executiveFinanceTabs
      : myFinanceTabs

  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {currentTabs.map((tab) => {
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
