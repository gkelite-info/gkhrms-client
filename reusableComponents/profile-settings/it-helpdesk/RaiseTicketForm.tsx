"use client"

import { useState } from "react"
import { Desktop, PlusCircle, Clock } from "phosphor-react"
import { ItTicket, TicketCategory, TicketPriority } from "./types"
import ReusableDropdown, { DropdownOption } from "../../ReusableDropdown"
import RecentTicketsSection from "./RecentTicketsSection"
import TicketAttachmentDropzone from "./TicketAttachmentDropzone"

interface RaiseTicketFormProps {
  onSwitchTab: (tab: "raise" | "history") => void
  onSubmitTicket: (ticket: ItTicket) => void
  recentTickets: ItTicket[]
}

const CATEGORY_OPTIONS: DropdownOption<TicketCategory>[] = [
  { label: "Hardware", value: "Hardware" }, { label: "Software", value: "Software" },
  { label: "Network / VPN", value: "Network / VPN" }, { label: "Access / Permissions", value: "Access / Permissions" },
  { label: "Other", value: "Other" },
]

const PRIORITY_OPTIONS: DropdownOption<TicketPriority>[] = [
  { label: "Low", value: "Low" }, { label: "Medium", value: "Medium" },
  { label: "High", value: "High" }, { label: "Critical", value: "Critical" },
]

export default function RaiseTicketForm({
  onSwitchTab,
  onSubmitTicket,
  recentTickets,
}: RaiseTicketFormProps) {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState<TicketCategory>("Network / VPN")
  const [priority, setPriority] = useState<TicketPriority>("Medium")
  const [message, setMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isSuccess, setIsSuccess] = useState(false)

  const handleClear = () => {
    setSubject("")
    setCategory("Network / VPN")
    setPriority("Medium")
    setMessage("")
    setAttachedFiles([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim()) return

    const newTicket: ItTicket = {
      id: `TKT-${Math.floor(1060 + Math.random() * 900)}`,
      subject: subject.trim(),
      category,
      priority,
      status: "In Progress",
      date: "Nov 26, 2026",
      iconType: category === "Network / VPN" ? "wifi" : category === "Hardware" ? "laptop" : "code",
      message,
    }

    onSubmitTicket(newTicket)
    setIsSuccess(true)
    handleClear()
    setTimeout(() => setIsSuccess(false), 2500)
  }

  return (
    <div className="flex flex-col gap-3.5 pb-6">
      <div className="bg-[#F5F3FF] rounded-2xl p-3.5 sm:p-4 border border-purple-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <Desktop size={20} weight="bold" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Need IT Support?</h4>
          <p className="text-[11px] text-gray-500 mt-0.5">Raise a ticket, track its progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          className="h-16 rounded-2xl border-2 border-[#5B50EC] bg-[#EEF2FF]/40 text-[#5B50EC] flex flex-col items-center justify-center gap-1 font-bold text-xs cursor-pointer shadow-2xs"
        >
          <PlusCircle size={18} weight="bold" />
          <span>Raise Ticket</span>
        </button>
        <button
          type="button"
          onClick={() => onSwitchTab("history")}
          className="h-16 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex flex-col items-center justify-center gap-1 font-semibold text-xs transition-colors cursor-pointer"
        >
          <Clock size={18} weight="bold" />
          <span>Ticket History</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
        <h4 className="text-xs font-bold text-gray-900">Raise a Support Ticket</h4>

        <div>
          <label className="text-[11px] font-semibold text-gray-700 block mb-1">
            Subject <span className="text-rose-500 font-bold">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Unable to access VPN"
            required
            className="w-full px-3 py-2 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">
              Category <span className="text-rose-500 font-bold">*</span>
            </label>
            <ReusableDropdown
              value={category}
              options={CATEGORY_OPTIONS}
              onChange={(val) => setCategory(val as TicketCategory)}
              placeholder="Select category"
              align="full"
              className="w-full"
              buttonClassName="w-full h-8.5 px-3 py-2 text-xs font-semibold text-gray-900 bg-white rounded-xl border border-gray-200 focus:border-[#5B50EC] flex items-center justify-between cursor-pointer"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 block mb-1">
              Priority <span className="text-rose-500 font-bold">*</span>
            </label>
            <ReusableDropdown
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(val) => setPriority(val as TicketPriority)}
              placeholder="Select priority"
              align="full"
              className="w-full"
              buttonClassName="w-full h-8.5 px-3 py-2 text-xs font-semibold text-gray-900 bg-white rounded-xl border border-gray-200 focus:border-[#5B50EC] flex items-center justify-between cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-gray-700 block mb-1">
            Message <span className="text-rose-500 font-bold">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Describe your issue or request in detail..."
            required
            className="w-full min-h-[120px] px-3 py-2.5 text-xs font-semibold text-gray-900 bg-white placeholder:text-gray-400 placeholder:font-normal rounded-xl border border-gray-200 focus:border-[#5B50EC] outline-none resize-y"
          />
        </div>

        <TicketAttachmentDropzone
          files={attachedFiles}
          onChange={setAttachedFiles}
          maxFiles={5}
          maxSizeMb={10}
        />

        {isSuccess && <p className="text-xs text-emerald-600 font-bold">Ticket created successfully and queued!</p>}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button type="button" onClick={handleClear} className="px-4 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 whitespace-nowrap">Clear</button>
          <button type="submit" className="px-5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#5B50EC] hover:bg-[#4E44D6] shadow-sm shadow-[#5B50EC]/20 transition-all cursor-pointer whitespace-nowrap">Submit Ticket</button>
        </div>
      </form>

      <RecentTicketsSection
        recentTickets={recentTickets}
        onViewHistory={() => onSwitchTab("history")}
      />
    </div>
  )
}
