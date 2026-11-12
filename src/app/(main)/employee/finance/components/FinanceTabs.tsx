import React from "react"
import { FinanceTabType } from "./types"

export interface TabItem {
  id: FinanceTabType
  label: string
}

export interface FinanceTabsProps {
  activeTab: FinanceTabType
  onSelectTab: (tab: FinanceTabType) => void
  tabs?: TabItem[]
  variant?: "employee" | "hr"
}

const EMPLOYEE_TABS: TabItem[] = [
  { id: "summary", label: "Summary" },
  { id: "mypay", label: "My Pay" },
  { id: "manage_tax", label: "Manage TAX" },
  { id: "org_salary_overview", label: "Org Salary Overview" },
]

const HR_TABS: TabItem[] = [
  { id: "summary", label: "Summary" },
  { id: "mypay", label: "Employee Pay" },
  { id: "manage_tax", label: "Manage TAX" },
  { id: "expenses_travel", label: "Expenses and Travel" },
]

export default function FinanceTabs({
  activeTab,
  onSelectTab,
  tabs,
  variant = "employee",
}: FinanceTabsProps) {
  const defaultList = variant === "hr" ? HR_TABS : EMPLOYEE_TABS
  const displayTabs = tabs && tabs.length > 0 ? tabs : defaultList

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100/80 shadow-2xs p-1.5">
      <div
        className="grid gap-1.5 sm:gap-2"
        style={{
          gridTemplateColumns: `repeat(${displayTabs.length}, minmax(0, 1fr))`,
        }}
      >
        {displayTabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`w-full py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg font-medium text-xs sm:text-sm text-center transition-all duration-150 cursor-pointer select-none focus:outline-none truncate ${
                isActive
                  ? "bg-[#7D73E3] text-white shadow-2xs"
                  : "bg-[#A3A3A3] text-white hover:bg-[#969696]"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
