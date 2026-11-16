"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Headset, ClockCounterClockwise, X, ArrowLeft } from "phosphor-react"
import { ItTicket, TicketMetrics } from "./types"
import { MOCK_TICKETS, INITIAL_TICKET_METRICS } from "./mockTickets"
import RaiseTicketForm from "./RaiseTicketForm"
import TicketHistoryView from "./TicketHistoryView"

interface ItHelpdeskDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ItHelpdeskDrawer({ isOpen, onClose }: ItHelpdeskDrawerProps) {
  const [activeTab, setActiveTab] = useState<"raise" | "history">("raise")
  const [tickets, setTickets] = useState<ItTicket[]>(MOCK_TICKETS)
  const [metrics, setMetrics] = useState<TicketMetrics>(INITIAL_TICKET_METRICS)

  const handleCreateTicket = (newTicket: ItTicket) => {
    setTickets((prev) => [newTicket, ...prev])
    setMetrics((prev) => ({
      ...prev,
      total: prev.total + 1,
      inProgress: prev.inProgress + 1,
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1200] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="relative z-10 w-full max-w-[460px] h-full bg-[#F6F7FC] shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                {activeTab === "history" && (
                  <button type="button" onClick={() => setActiveTab("raise")} className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer mr-0.5">
                    <ArrowLeft size={16} weight="bold" />
                  </button>
                )}
                <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
                  {activeTab === "raise" ? <Headset size={18} weight="bold" /> : <ClockCounterClockwise size={18} weight="bold" />}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    {activeTab === "raise" ? "IT Helpdesk" : "Ticket History"}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {activeTab === "raise" ? "Enterprise support & ticket management" : "View and track the history of all your IT helpdesk tickets."}
                  </p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 pb-6 flex flex-col gap-3.5 custom-scrollbar min-h-0">
              {activeTab === "raise" ? (
                <RaiseTicketForm
                  onSwitchTab={setActiveTab}
                  onSubmitTicket={handleCreateTicket}
                  recentTickets={tickets}
                />
              ) : (
                <TicketHistoryView tickets={tickets} metrics={metrics} />
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

