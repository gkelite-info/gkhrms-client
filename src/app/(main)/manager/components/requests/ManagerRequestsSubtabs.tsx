"use client"

import { Users, UsersThree, FileText } from "phosphor-react"

export type ManagerSubtabKey = "team-member" | "team-lead" | "my-requests"

interface ManagerRequestsSubtabsProps {
  currentSubtab: ManagerSubtabKey
  onSubtabChange: (subtab: ManagerSubtabKey) => void
  teamMemberCount?: number
  teamLeadCount?: number
  myRequestsCount?: number
}

export default function ManagerRequestsSubtabs({
  currentSubtab,
  onSubtabChange,
  teamMemberCount = 9,
  teamLeadCount = 5,
  myRequestsCount = 8,
}: ManagerRequestsSubtabsProps) {
  const tabs = [
    {
      id: "team-member" as const,
      label: "Team Member Requests",
      icon: Users,
      count: teamMemberCount,
    },
    {
      id: "team-lead" as const,
      label: "Team Lead Requests",
      icon: UsersThree,
      count: teamLeadCount,
    },
    {
      id: "my-requests" as const,
      label: "My Requests",
      icon: FileText,
      count: myRequestsCount,
    },
  ]

  return (
    <div className="w-full border-b border-gray-200 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-6 min-w-max pb-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentSubtab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSubtabChange(tab.id)}
              className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
                isActive
                  ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon
                size={16}
                weight={isActive ? "fill" : "bold"}
                className={isActive ? "text-[#5B50EC]" : "text-gray-400"}
              />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#5B50EC]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
