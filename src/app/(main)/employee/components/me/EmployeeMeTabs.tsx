"use client"

export type MeTabType =
  | "overview"
  | "timesheet"
  | "project_time"
  | "monthly_performance"
  | "expenses_travel"

interface TabItem {
  id: MeTabType
  label: string
}

const tabs: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "timesheet", label: "Timesheet" },
  { id: "project_time", label: "Project Time Overview" },
]

export default function EmployeeMeTabs({
  activeTab,
  onSelectTab,
}: {
  activeTab: MeTabType
  onSelectTab: (tab: MeTabType) => void
}) {
  return (
    <div className="w-full max-w-full bg-[#DCD8FA]/70 rounded-xl p-1 sm:p-1.5 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              style={{ cursor: "pointer" }}
              className={`flex-shrink-0 whitespace-nowrap px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none ${
                isActive
                  ? "bg-[#7D73E3] text-white shadow-sm"
                  : "bg-white text-[#374151] hover:bg-white/90 hover:text-[#1F2937] shadow-xs"
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
