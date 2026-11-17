"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Calendar,
  Home,
  HeartPulse,
  Briefcase,
  Check,
  Clock,
  X,
  Eye,
} from "lucide-react"
import { LeaveRecord, LeaveType, LeaveStatus } from "./LeaveData"
import LeaveDetailsModal from "./LeaveDetailsModal"

interface LeaveTableProps {
  records: LeaveRecord[]
  onUpdateRecord?: (updated: LeaveRecord) => void
}

export default function LeaveTable({
  records,
  onUpdateRecord,
}: LeaveTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("All Leave Types")
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status")
  const [selectedDateRange, setSelectedDateRange] = useState<string>(
    "Nov 01, 2026 - Nov 30, 2026"
  )

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)
  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false)

  const typeRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRecord, setSelectedRecord] = useState<LeaveRecord | null>(null)

  const LEAVE_TYPE_OPTIONS = [
    "All Leave Types",
    "Annual Leave",
    "Work From Home",
    "Sick Leave",
    "Casual Leave",
  ]

  const STATUS_OPTIONS = ["All Status", "Approved", "Pending", "Rejected"]

  const DATE_RANGE_OPTIONS = [
    "Nov 01, 2026 - Nov 30, 2026",
    "Oct 01, 2026 - Oct 31, 2026",
    "Dec 01, 2026 - Dec 31, 2026",
    "All Dates",
  ]

  const ROWS_OPTIONS = [5, 10, 20, 50]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setTypeDropdownOpen(false)
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setStatusDropdownOpen(false)
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false)
      }
      if (rowsRef.current && !rowsRef.current.contains(event.target as Node)) {
        setRowsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedType("All Leave Types")
    setSelectedStatus("All Status")
    setSelectedDateRange("Nov 01, 2026 - Nov 30, 2026")
    setCurrentPage(1)
  }

  const filteredData = useMemo(() => {
    return records.filter((item) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        item.employeeName.toLowerCase().includes(q) ||
        item.employeeId.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q)

      const matchesType =
        selectedType === "All Leave Types" || item.leaveType === selectedType

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus

      const matchesDateRange =
        selectedDateRange === "All Dates" ||
        item.duration.includes("Nov") ||
        item.appliedOn.includes("Nov")

      return matchesSearch && matchesType && matchesStatus && matchesDateRange
    })
  }, [records, searchQuery, selectedType, selectedStatus, selectedDateRange])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)

  const paginationPages = useMemo(() => {
    const pages = []
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      pages.push(i)
    }
    return pages
  }, [totalPages])

  const renderLeaveTypePill = (type: LeaveType) => {
    switch (type) {
      case "Annual Leave":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F3EEFE] text-[#7C3AED] border border-[#DDD6FE]/60 whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
            Annual Leave
          </span>
        )
      case "Work From Home":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60 whitespace-nowrap">
            <Home className="w-3.5 h-3.5 text-[#2563EB]" />
            Work From Home
          </span>
        )
      case "Sick Leave":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]/60 whitespace-nowrap">
            <HeartPulse className="w-3.5 h-3.5 text-[#E11D48]" />
            Sick Leave
          </span>
        )
      case "Casual Leave":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60 whitespace-nowrap">
            <Briefcase className="w-3.5 h-3.5 text-[#D97706]" />
            Casual Leave
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            {type}
          </span>
        )
    }
  }

  const renderStatusPill = (status: LeaveStatus) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60 whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-[#059669]" />
            Approved
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-[#D97706]" />
            Pending
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/60 whitespace-nowrap">
            <X className="w-3.5 h-3.5 text-[#DC2626]" />
            Rejected
          </span>
        )
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by employee name, ID or leave ID..."
            className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
          />
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div ref={typeRef} className="relative">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Leave Type
            </span>
            <button
              type="button"
              onClick={() => {
                setTypeDropdownOpen(!typeDropdownOpen)
                setStatusDropdownOpen(false)
                setDateDropdownOpen(false)
              }}
              className="h-9 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedType}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {typeDropdownOpen && (
              <div className="absolute left-0 sm:right-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {LEAVE_TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedType(opt)
                      setCurrentPage(1)
                      setTypeDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#EEF0FD] hover:text-[#5B50E5] transition-colors ${
                      selectedType === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={statusRef} className="relative">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Status
            </span>
            <button
              type="button"
              onClick={() => {
                setStatusDropdownOpen(!statusDropdownOpen)
                setTypeDropdownOpen(false)
                setDateDropdownOpen(false)
              }}
              className="h-9 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusDropdownOpen && (
              <div className="absolute left-0 sm:right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(opt)
                      setCurrentPage(1)
                      setStatusDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#EEF0FD] hover:text-[#5B50E5] transition-colors ${
                      selectedStatus === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={dateRef} className="relative">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Date Range
            </span>
            <button
              type="button"
              onClick={() => {
                setDateDropdownOpen(!dateDropdownOpen)
                setTypeDropdownOpen(false)
                setStatusDropdownOpen(false)
              }}
              className="h-9 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dateDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {DATE_RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedDateRange(opt)
                      setCurrentPage(1)
                      setDateDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#EEF0FD] hover:text-[#5B50E5] transition-colors ${
                      selectedDateRange === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="h-9 px-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer self-end pb-2 sm:pb-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100/80 bg-slate-50/50">
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Leave ID
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Employee
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Leave Type
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Duration
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Total Days
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Reason
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Applied On
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 text-xs">
                    No leave requests found matching the selected criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                      {item.id}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${item.avatarColor}`}
                        >
                          {item.avatarInitials}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">
                            {item.employeeName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal block leading-tight mt-0.5">
                            {item.designation}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderLeaveTypePill(item.leaveType)}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-600 font-medium whitespace-nowrap">
                      {item.duration}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-700 font-medium whitespace-nowrap">
                      {item.totalDaysText}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-[180px] truncate">
                      {item.reason}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                      {item.appliedOn}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderStatusPill(item.status)}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(item)}
                        className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 font-medium text-center sm:text-left">
            Showing {filteredData.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length} leave requests
          </div>

          <div className="flex items-center gap-4">
            <div ref={rowsRef} className="relative flex items-center gap-2">
              <span className="text-slate-500 font-medium">Rows per page:</span>
              <button
                type="button"
                onClick={() => setRowsDropdownOpen(!rowsDropdownOpen)}
                className="h-7 px-2.5 bg-white border border-slate-200/90 rounded-lg text-slate-700 font-medium shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{rowsPerPage}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {rowsDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-1.5 w-16 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {ROWS_OPTIONS.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setRowsPerPage(num)
                        setCurrentPage(1)
                        setRowsDropdownOpen(false)
                      }}
                      className={`w-full text-center py-1 hover:bg-[#EEF0FD] hover:text-[#5B50E5] transition-colors ${
                        rowsPerPage === num
                          ? "font-bold text-[#5B50E5]"
                          : "text-slate-600"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {paginationPages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-[#5B50E5] text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 font-medium"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeaveDetailsModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onUpdateRecord={onUpdateRecord}
      />
    </div>
  )
}
