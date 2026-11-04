"use client"

import { UsersThree, FileText } from "phosphor-react"

interface RequestsSubTabNavProps {
  activeSubtab: "team-requests" | "my-requests"
  onSubtabChange: (subtab: "team-requests" | "my-requests") => void
  teamRequestsCount: number
  myRequestsCount: number
}

export default function RequestsSubTabNav({
  activeSubtab,
  onSubtabChange,
  teamRequestsCount,
  myRequestsCount,
}: RequestsSubTabNavProps) {
  return (
    <div className="w-full border-b border-gray-200 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-6 min-w-max pb-0.5">
        <button
          type="button"
          onClick={() => onSubtabChange("team-requests")}
          className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
            activeSubtab === "team-requests"
              ? "border-[#5B50EC] text-[#5B50EC] font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UsersThree
            size={16}
            weight={activeSubtab === "team-requests" ? "fill" : "bold"}
            className={activeSubtab === "team-requests" ? "text-[#5B50EC]" : "text-gray-400"}
          />
          <span>Team Requests</span>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
              activeSubtab === "team-requests"
                ? "bg-[#EEF2FF] text-[#5B50EC]"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {teamRequestsCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSubtabChange("my-requests")}
          className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
            activeSubtab === "my-requests"
              ? "border-[#5B50EC] text-[#5B50EC] font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <FileText
            size={16}
            weight={activeSubtab === "my-requests" ? "fill" : "bold"}
            className={activeSubtab === "my-requests" ? "text-[#5B50EC]" : "text-gray-400"}
          />
          <span>My Requests</span>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
              activeSubtab === "my-requests"
                ? "bg-[#EEF2FF] text-[#5B50EC]"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {myRequestsCount}
          </span>
        </button>
      </div>
    </div>
  )
}

