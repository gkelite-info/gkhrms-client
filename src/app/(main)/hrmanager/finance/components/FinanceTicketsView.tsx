"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CaretDown } from "phosphor-react"
import { ReusableTable, TableColumn } from "@/../reusableComponents"

interface ClosedTicket {
  id: string
  ticketNumber: string
  title: string
  subTitle: string
  raisedOn: string
  priority: string
  category: string
  closedBy: string
  closedDate: string
}

const closedTicketsData: ClosedTicket[] = [
  {
    id: "closed-1",
    ticketNumber: "09078",
    title: "Gmail Access",
    subTitle: "System & Network Admin",
    raisedOn: "09/11/2025",
    priority: "Medium",
    category: "System & Network Admin",
    closedBy: "Jack",
    closedDate: "15/11/2025",
  },
  {
    id: "closed-2",
    ticketNumber: "09078",
    title: "Unable to access Gdrive",
    subTitle: "System & Network Admin",
    raisedOn: "09/11/2025",
    priority: "Medium",
    category: "System & Network Admin",
    closedBy: "Jack",
    closedDate: "15/11/2025",
  },
]

export default function FinanceTicketsView({
  onBack,
}: {
  onBack?: () => void
}) {
  const router = useRouter()

  const [ticketNumber, setTicketNumber] = useState("09025479")
  const [title, setTitle] = useState("")
  const [raisedOn, setRaisedOn] = useState("")
  const [priority, setPriority] = useState("High")
  const [category, setCategory] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [notes, setNotes] = useState("")
  const [isPriorityOpen, setIsPriorityOpen] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const columns: TableColumn<ClosedTicket>[] = [
    {
      key: "ticketNumber",
      header: "Ticket Number",
      accessor: "ticketNumber",
      width: "16%",
      headerClassName: "border-r border-white/60 last:border-r-0 py-2.5 px-3 sm:px-4 text-left font-semibold text-xs sm:text-sm text-[#1E293B]",
      className: "border-r border-gray-200 last:border-r-0 py-3 px-3 sm:px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "title",
      header: "Title",
      width: "24%",
      headerClassName: "border-r border-white/60 last:border-r-0 py-2.5 px-3 sm:px-4 text-left font-semibold text-xs sm:text-sm text-[#1E293B]",
      className: "border-r border-gray-200 last:border-r-0 py-3 px-3 sm:px-4",
      render: (row) => (
        <div className="flex flex-col leading-snug">
          <span className="font-semibold text-xs sm:text-sm text-[#1E293B]">
            {row.title}
          </span>
          <span className="text-xs text-gray-500 font-normal mt-0.5">
            {row.subTitle}
          </span>
        </div>
      ),
    },
    {
      key: "raisedOn",
      header: "Raised On",
      accessor: "raisedOn",
      width: "15%",
      headerClassName: "border-r border-white/60 last:border-r-0 py-2.5 px-3 sm:px-4 text-left font-semibold text-xs sm:text-sm text-[#1E293B]",
      className: "border-r border-gray-200 last:border-r-0 py-3 px-3 sm:px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "priority",
      header: "Priority",
      accessor: "priority",
      width: "14%",
      headerClassName: "border-r border-white/60 last:border-r-0 py-2.5 px-3 sm:px-4 text-left font-semibold text-xs sm:text-sm text-[#1E293B]",
      className: "border-r border-gray-200 last:border-r-0 py-3 px-3 sm:px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "category",
      header: "Category",
      accessor: "category",
      width: "17%",
      headerClassName: "border-r border-white/60 last:border-r-0 py-2.5 px-3 sm:px-4 text-left font-semibold text-xs sm:text-sm text-[#1E293B]",
      className: "border-r border-gray-200 last:border-r-0 py-3 px-3 sm:px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "closedBy",
      header: "Closed By",
      width: "14%",
      headerClassName: "border-r border-white/60 last:border-r-0 py-2.5 px-3 sm:px-4 text-left font-semibold text-xs sm:text-sm text-[#1E293B]",
      className: "border-r border-gray-200 last:border-r-0 py-3 px-3 sm:px-4",
      render: (row) => (
        <div className="flex flex-col leading-snug">
          <span className="font-normal text-xs sm:text-sm text-[#1E293B]">
            {row.closedBy}
          </span>
          <span className="text-xs text-gray-500 font-normal mt-0.5">
            {row.closedDate}
          </span>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full max-w-full flex flex-col pb-8">
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBack}
            title="Back"
            style={{ cursor: "pointer" }}
            className="p-1 -ml-1 text-gray-500 hover:text-[#5B50E5] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
            Open Tickets
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1 ml-6 sm:ml-7">
          These are your Tickets that are yet to be Addressed.
        </p>

        <div className="w-full max-w-[460px] ml-0 sm:ml-12 md:ml-14 bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-4.5 flex flex-col gap-2.5 mt-2.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Ticket Number
            </label>
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              className="w-full h-7 sm:h-[30px] border border-gray-300 rounded-[6px] px-2.5 text-xs sm:text-sm text-[#1E293B] bg-white outline-none focus:border-[#7D73E3] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-7 sm:h-[30px] border border-gray-300 rounded-[6px] px-2.5 text-xs sm:text-sm text-[#1E293B] bg-white outline-none focus:border-[#7D73E3] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Raised on
            </label>
            <input
              type="text"
              value={raisedOn}
              onChange={(e) => setRaisedOn(e.target.value)}
              className="w-full h-7 sm:h-[30px] border border-gray-300 rounded-[6px] px-2.5 text-xs sm:text-sm text-[#1E293B] bg-white outline-none focus:border-[#7D73E3] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Priority
            </label>
            <button
              type="button"
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              style={{ cursor: "pointer" }}
              className="w-full h-7 sm:h-[30px] border border-gray-300 rounded-[6px] px-2.5 text-xs sm:text-sm text-[#1E293B] bg-white flex items-center justify-between cursor-pointer focus:border-[#7D73E3] transition-colors"
            >
              <span>{priority}</span>
              <CaretDown size={14} weight="bold" className={`text-gray-600 transition-transform ${isPriorityOpen ? "rotate-180" : ""}`} />
            </button>

            {isPriorityOpen && (
              <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden py-1">
                {["High", "Medium", "Low"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPriority(p)
                      setIsPriorityOpen(false)
                    }}
                    style={{ cursor: "pointer" }}
                    className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm transition-colors cursor-pointer ${
                      priority === p ? "bg-[#EDE9FE] text-[#5B50E5] font-semibold" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-7 sm:h-[30px] border border-gray-300 rounded-[6px] px-2.5 text-xs sm:text-sm text-[#1E293B] bg-white outline-none focus:border-[#7D73E3] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Assigned To
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full h-7 sm:h-[30px] border border-gray-300 rounded-[6px] px-2.5 text-xs sm:text-sm text-[#1E293B] bg-white outline-none focus:border-[#7D73E3] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
              Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-[52px] sm:h-[56px] border border-gray-300 rounded-[6px] px-2.5 py-1.5 text-xs sm:text-sm text-[#1E293B] bg-white outline-none focus:border-[#7D73E3] transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col mt-5 sm:mt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
          ClosedTickets
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
          These are your Tickets that have been Addressed
        </p>

        <div className="w-full rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xs mt-2.5">
          <ReusableTable<ClosedTicket>
            columns={columns}
            data={closedTicketsData}
            headerBgColor="#BCB7F7"
            headerTextColor="#1E293B"
            headerRounded="rounded-none"
            containerClassName="w-full"
            tableClassName="border-collapse"
            rowHover={true}
          />
        </div>
      </div>
    </div>
  )
}

