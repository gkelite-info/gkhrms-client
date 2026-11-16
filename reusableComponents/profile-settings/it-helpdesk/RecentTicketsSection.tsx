"use client"

import { ArrowRight } from "phosphor-react"
import { ItTicket } from "./types"

interface RecentTicketsSectionProps {
  recentTickets: ItTicket[]
  onViewHistory: () => void
}

export default function RecentTicketsSection({
  recentTickets,
  onViewHistory,
}: RecentTicketsSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-2.5 shadow-2xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-900">Recent Tickets</h4>
        <button
          type="button"
          onClick={onViewHistory}
          className="text-[11px] font-bold text-[#5B50EC] hover:text-[#4338CA] flex items-center gap-1 cursor-pointer"
        >
          <span>View History</span>
          <ArrowRight size={12} weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {recentTickets.slice(0, 2).map((tkt) => (
          <div key={tkt.id} className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 flex items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold text-gray-900 block leading-tight">{tkt.id}</span>
              <span className="text-[10px] text-gray-500 block leading-tight break-words mt-0.5">{tkt.subject}</span>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[9px] text-gray-400 whitespace-nowrap">{tkt.date}</span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                  tkt.status === "Resolved"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-amber-50 text-amber-600 border border-amber-200"
                }`}
              >
                {tkt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

