"use client"

export type OwnOrgTab =
  | "employees"
  | "attendance"
  | "payroll"
  | "expenses"
  | "leave"
  | "reports"

interface OwnOrgTabsProps {
  activeTab: OwnOrgTab
  onTabChange: (tab: OwnOrgTab) => void
}

const TABS: { id: OwnOrgTab; label: string }[] = [
  { id: "employees", label: "Employees" },
  { id: "attendance", label: "Attendance" },
  { id: "payroll", label: "Payroll" },
  { id: "expenses", label: "Expenses" },
  { id: "leave", label: "Leave" },
  { id: "reports", label: "Reports" },
]

export default function OwnOrgTabs({
  activeTab,
  onTabChange,
}: OwnOrgTabsProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-full p-1 inline-flex items-center gap-1 shadow-2xs overflow-x-auto max-w-full">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? "bg-[#5B50E5] text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
