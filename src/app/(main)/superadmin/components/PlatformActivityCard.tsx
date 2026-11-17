"use client"

import { History, Building2, ArrowUp, DollarSign, UserPlus } from "lucide-react"

interface ActivityItem {
  id: string
  title: string
  highlight?: string
  time: string
  icon: React.ComponentType<{ className?: string }>
}

const activities: ActivityItem[] = [
  {
    id: "act-1",
    title: "New company registered — ",
    highlight: "TechNova Solutions",
    time: "2 hours ago",
    icon: Building2,
  },
  {
    id: "act-2",
    title: "Subscription upgraded — ",
    highlight: "Vision Corp",
    time: "5 hours ago",
    icon: ArrowUp,
  },
  {
    id: "act-3",
    title: "Payment received — ",
    highlight: "$299.00",
    time: "1 day ago",
    icon: DollarSign,
  },
  {
    id: "act-4",
    title: "Subscription upgraded — ",
    highlight: "Vision Corp",
    time: "5 hours ago",
    icon: ArrowUp,
  },
  {
    id: "act-5",
    title: "Payment received — ",
    highlight: "$299.00",
    time: "1 day ago",
    icon: DollarSign,
  },
  {
    id: "act-6",
    title: "Company admin added — ",
    highlight: "Sneha Kapoor",
    time: "1 day ago",
    icon: UserPlus,
  },
]

export default function PlatformActivityCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#5B50E5]" />
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Platform Activity
          </h2>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex flex-col divide-y divide-slate-50">
        {activities.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="py-2.5 flex items-start gap-3 hover:bg-slate-50/60 rounded-xl px-1.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5] shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#5B50E5]" />
              </div>
              <div className="flex flex-col text-xs leading-snug">
                <span className="text-slate-700 font-medium">
                  {item.title}
                  <span className="font-bold text-slate-900">
                    {item.highlight}
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {item.time}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
