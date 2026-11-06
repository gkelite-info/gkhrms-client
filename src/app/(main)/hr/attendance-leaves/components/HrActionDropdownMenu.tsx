"use client"

import { CalendarBlank, House, WarningCircle } from "phosphor-react"

interface HrActionDropdownMenuProps {
  onApplyLeave: () => void
  onRequestWfh: () => void
  onApplyException: () => void
}

const actions = [
  {
    label: "Apply Leave",
    subtext: "Paid, casual, sick leave",
    icon: CalendarBlank,
    handlerKey: "onApplyLeave" as const,
  },
  {
    label: "Request WFH",
    subtext: "Remote work request",
    icon: House,
    handlerKey: "onRequestWfh" as const,
  },
  {
    label: "Apply Exception",
    subtext: "Late punch & time adjustment",
    icon: WarningCircle,
    handlerKey: "onApplyException" as const,
  },
]

export default function HrActionDropdownMenu(props: HrActionDropdownMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
      {actions.map((act) => {
        const Icon = act.icon
        const onClickHandler = props[act.handlerKey]
        return (
          <button
            key={act.label}
            type="button"
            onClick={onClickHandler}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F4FE] text-left transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0 group-hover:bg-[#5B50EC] group-hover:text-white transition-colors">
              <Icon size={16} weight="bold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-800">{act.label}</span>
              <span className="text-[11px] text-gray-400 truncate">{act.subtext}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

