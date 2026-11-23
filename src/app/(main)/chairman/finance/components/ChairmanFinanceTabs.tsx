"use client"

export type ChairmanFinanceTab =
  | "overview"
  | "revenue"
  | "expenses"
  | "payroll"
  | "receivables_payables"
  | "reports"

interface ChairmanFinanceTabsProps {
  activeTab: ChairmanFinanceTab
  onTabChange: (tab: ChairmanFinanceTab) => void
}

const TABS: { id: ChairmanFinanceTab; label: string }[] = [
  { id: "overview", label: "Finance Overview" },
  { id: "revenue", label: "Revenue" },
  { id: "expenses", label: "Expenses" },
  { id: "payroll", label: "Payroll Cost" },
  { id: "receivables_payables", label: "Receivables & Payables" },
  { id: "reports", label: "Reports" },
]

export default function ChairmanFinanceTabs({
  activeTab,
  onTabChange,
}: ChairmanFinanceTabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-0.5">
      <div className="bg-white border border-slate-200/80 rounded-full p-1 inline-flex items-center gap-1 shadow-2xs whitespace-nowrap min-w-max">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs transition-all whitespace-nowrap cursor-pointer ${
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
    </div>
  )
}
