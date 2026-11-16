"use client"

import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { MagnifyingGlass, Funnel, Calendar, Clock, Check, Laptop, WifiHigh, Code, Printer, Folder } from "phosphor-react"
import { ItTicket, TicketMetrics } from "./types"
import TicketShimmer from "./TicketShimmer"

interface TicketHistoryViewProps {
  tickets: ItTicket[]
  metrics: TicketMetrics
}

export default function TicketHistoryView({ tickets, metrics }: TicketHistoryViewProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  const filteredTickets = useMemo(() => {
    return tickets.filter((tkt) => {
      const matchSearch =
        tkt.id.toLowerCase().includes(search.toLowerCase()) ||
        tkt.subject.toLowerCase().includes(search.toLowerCase()) ||
        tkt.category.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "All" || tkt.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [tickets, search, statusFilter])

  const visibleTickets = useMemo(() => {
    return filteredTickets.slice(0, visibleCount)
  }, [filteredTickets, visibleCount])

  const hasMore = visibleCount < filteredTickets.length

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + 5)
      setIsLoadingMore(false)
    }, 600)
  }, [isLoadingMore, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  const renderIcon = (type: string) => {
    switch (type) {
      case "wifi": return <WifiHigh size={18} weight="bold" />
      case "code": return <Code size={18} weight="bold" />
      case "printer": return <Printer size={18} weight="bold" />
      default: return <Laptop size={18} weight="bold" />
    }
  }

  return (
    <div className="flex flex-col gap-3.5 pb-6">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 flex flex-col gap-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <div className="w-5 h-5 rounded-md bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
              <Folder size={11} weight="bold" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 leading-tight">Total</span>
          </div>
          <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{metrics.total}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 flex flex-col gap-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check size={11} weight="bold" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 leading-tight">Resolved</span>
          </div>
          <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{metrics.resolved}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 flex flex-col gap-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock size={11} weight="bold" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 leading-tight">In Progress</span>
          </div>
          <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{metrics.inProgress}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Ticket ID, Subject..."
            className="w-full pl-8 pr-3 py-2 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setStatusFilter((prev) => (prev === "All" ? "In Progress" : prev === "In Progress" ? "Resolved" : "All"))}
          className={`h-8.5 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${statusFilter !== "All" ? "bg-[#EEF2FF] border-[#5B50EC] text-[#5B50EC]" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          title={`Filter: ${statusFilter}`}
        >
          <Funnel size={13} weight="bold" />
          <span className="hidden sm:inline">{statusFilter}</span>
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {visibleTickets.map((tkt) => (
          <div key={tkt.id} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0 shadow-2xs">
                {renderIcon(tkt.iconType)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-gray-900 leading-tight">{tkt.id}</span>
                <p className="text-xs font-semibold text-gray-800 leading-snug break-words mt-0.5">{tkt.subject}</p>
                <div className="flex items-center gap-2.5 text-[10px] text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {tkt.date}
                  </span>
                  {tkt.resolutionTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {tkt.resolutionTime}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="shrink-0">
              {tkt.status === "Resolved" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold">
                  <Check size={11} weight="bold" /> Resolved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold">
                  <Clock size={11} weight="bold" /> In Progress
                </span>
              )}
            </div>
          </div>
        ))}

        {isLoadingMore && <TicketShimmer count={2} />}

        {hasMore && <div ref={observerRef} className="h-6 w-full flex items-center justify-center text-[10px] text-gray-400">Loading more tickets...</div>}

        {!hasMore && filteredTickets.length > 0 && (
          <p className="text-center text-[10px] text-gray-400 py-1">All {filteredTickets.length} tickets loaded</p>
        )}

        {filteredTickets.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-xs text-gray-500">
            No tickets found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

