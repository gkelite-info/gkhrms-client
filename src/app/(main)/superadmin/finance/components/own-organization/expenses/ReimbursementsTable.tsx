"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  Calendar,
  RotateCcw,
  Eye,
  Edit2,
  MoreHorizontal,
  Plane,
  Phone,
  Utensils,
  Car,
  Laptop,
  Folder,
  FileQuestion,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
} from "lucide-react"
import {
  ReimbursementRecord,
  INITIAL_REIMBURSEMENTS_DATA,
} from "./ReimbursementsData"
import ReimbursementDetailsModal from "./ReimbursementDetailsModal"
import EditReimbursementModal from "./EditReimbursementModal"
import AddReimbursementModal from "./AddReimbursementModal"

interface ReimbursementsTableProps {
  items?: ReimbursementRecord[]
  externalAddOpen?: boolean
  onCloseExternalAdd?: () => void
}

export default function ReimbursementsTable({
  items: initialItems = INITIAL_REIMBURSEMENTS_DATA,
  externalAddOpen,
  onCloseExternalAdd,
}: ReimbursementsTableProps) {
  const [items, setItems] = useState<ReimbursementRecord[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedDateRange, setSelectedDateRange] = useState("Nov 01, 2026 – Nov 30, 2026")

  const [categoryOpen, setCategoryOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [dateRangeOpen, setDateRangeOpen] = useState(false)

  const categoryRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const dateRangeRef = useRef<HTMLDivElement>(null)

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null)
  const actionMenuRef = useRef<HTMLDivElement>(null)

  const [viewItem, setViewItem] = useState<ReimbursementRecord | null>(null)
  const [editItem, setEditItem] = useState<ReimbursementRecord | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowsPerPageOpen, setRowsPerPageOpen] = useState(false)
  const rowsPerPageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryOpen(false)
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false)
      }
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setDateRangeOpen(false)
      }
      if (rowsPerPageRef.current && !rowsPerPageRef.current.contains(event.target as Node)) {
        setRowsPerPageOpen(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActionMenuOpenId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategory("All Categories")
    setSelectedStatus("All Status")
    setSelectedDateRange("Nov 01, 2026 – Nov 30, 2026")
    setCurrentPage(1)
  }

  const handleAddItem = (newItem: ReimbursementRecord) => {
    setItems((prev) => [newItem, ...prev])
  }

  const handleUpdateItem = (updated: ReimbursementRecord) => {
    setItems((prev) =>
      prev.map((it) => (it.id === updated.id ? updated : it))
    )
  }

  const handleToggleSelectAll = () => {
    if (selectedRowIds.length === paginatedItems.length) {
      setSelectedRowIds([])
    } else {
      setSelectedRowIds(paginatedItems.map((it) => it.id))
    }
  }

  const handleToggleRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleStatusChange = (id: string, newStatus: ReimbursementRecord["status"]) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              status: newStatus,
              approvedBy:
                newStatus === "Paid"
                  ? "Finance Dept (Settled)"
                  : newStatus === "Rejected"
                  ? "Finance Review (Declined)"
                  : "Pending Manager Review",
            }
          : it
      )
    )
    setActionMenuOpenId(null)
  }

  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        it.id.toLowerCase().includes(q) ||
        it.expenseTitle.toLowerCase().includes(q) ||
        it.employee.name.toLowerCase().includes(q) ||
        it.employee.designation.toLowerCase().includes(q)

      const matchesCategory =
        selectedCategory === "All Categories" || it.category === selectedCategory

      const matchesStatus =
        selectedStatus === "All Status" || it.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [items, searchQuery, selectedCategory, selectedStatus])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage))
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredItems.slice(start, start + rowsPerPage)
  }, [filteredItems, currentPage, rowsPerPage])

  const getCategoryBadge = (cat: ReimbursementRecord["category"]) => {
    switch (cat) {
      case "Travel":
        return (
          <div className="flex items-center gap-1.5 text-amber-600 font-medium text-xs whitespace-nowrap">
            <Plane className="w-3.5 h-3.5 text-amber-500" />
            <span>Travel</span>
          </div>
        )
      case "Communication":
        return (
          <div className="flex items-center gap-1.5 text-blue-600 font-medium text-xs whitespace-nowrap">
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            <span>Communication</span>
          </div>
        )
      case "Meals":
        return (
          <div className="flex items-center gap-1.5 text-amber-700 font-medium text-xs whitespace-nowrap">
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            <span>Meals</span>
          </div>
        )
      case "Local Travel":
        return (
          <div className="flex items-center gap-1.5 text-sky-600 font-medium text-xs whitespace-nowrap">
            <Car className="w-3.5 h-3.5 text-sky-500" />
            <span>Local Travel</span>
          </div>
        )
      case "IT & Equipment":
        return (
          <div className="flex items-center gap-1.5 text-indigo-600 font-medium text-xs whitespace-nowrap">
            <Laptop className="w-3.5 h-3.5 text-indigo-500" />
            <span>IT & Equipment</span>
          </div>
        )
      case "Office Supplies":
        return (
          <div className="flex items-center gap-1.5 text-violet-600 font-medium text-xs whitespace-nowrap">
            <Folder className="w-3.5 h-3.5 text-violet-500" />
            <span>Office Supplies</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs whitespace-nowrap">
            <FileQuestion className="w-3.5 h-3.5 text-slate-400" />
            <span>{cat}</span>
          </div>
        )
    }
  }

  const getStatusBadge = (st: ReimbursementRecord["status"]) => {
    switch (st) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Paid
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100 whitespace-nowrap">
            <Clock className="w-3 h-3 text-amber-500" />
            Pending
          </span>
        )
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-100 whitespace-nowrap">
            <XCircle className="w-3 h-3 text-rose-500" />
            Rejected
          </span>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[260px] max-w-sm flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by employee, title or expense ID..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
            />
          </div>

          <div ref={categoryRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCategoryOpen(!categoryOpen)
                setStatusOpen(false)
                setDateRangeOpen(false)
              }}
              className="h-11 px-3.5 bg-white border border-slate-200/90 rounded-xl text-left shadow-2xs flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                  Category
                </span>
                <span className="text-xs font-semibold text-slate-700 leading-tight">
                  {selectedCategory}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "All Categories",
                  "Travel",
                  "Communication",
                  "Meals",
                  "Local Travel",
                  "IT & Equipment",
                  "Office Supplies",
                  "Other",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(opt)
                      setCategoryOpen(false)
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedCategory === opt
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
            <button
              type="button"
              onClick={() => {
                setStatusOpen(!statusOpen)
                setCategoryOpen(false)
                setDateRangeOpen(false)
              }}
              className="h-11 px-3.5 bg-white border border-slate-200/90 rounded-xl text-left shadow-2xs flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                  Status
                </span>
                <span className="text-xs font-semibold text-slate-700 leading-tight">
                  {selectedStatus}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Status", "Paid", "Pending", "Rejected"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(opt)
                      setStatusOpen(false)
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
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

          <div ref={dateRangeRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDateRangeOpen(!dateRangeOpen)
                setCategoryOpen(false)
                setStatusOpen(false)
              }}
              className="h-11 px-3.5 bg-white border border-slate-200/90 rounded-xl text-left shadow-2xs flex items-center gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                  Date Range
                </span>
                <span className="text-xs font-semibold text-slate-700 leading-tight">
                  {selectedDateRange}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dateRangeOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "Nov 01, 2026 – Nov 30, 2026",
                  "Oct 01, 2026 – Oct 31, 2026",
                  "Sep 01, 2026 – Sep 30, 2026",
                  "Last 90 Days",
                  "Year to Date (2026)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedDateRange(opt)
                      setDateRangeOpen(false)
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
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
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="h-10 px-3 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedItems.length > 0 &&
                      selectedRowIds.length === paginatedItems.length
                    }
                    onChange={handleToggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#5B50E5] focus:ring-[#5B50E5] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3.5 whitespace-nowrap">REIMBURSEMENT ID</th>
                <th className="py-3 px-3.5 whitespace-nowrap">EMPLOYEE</th>
                <th className="py-3 px-3.5 whitespace-nowrap">EXPENSE TITLE</th>
                <th className="py-3 px-3.5 whitespace-nowrap">CATEGORY</th>
                <th className="py-3 px-3.5 whitespace-nowrap">AMOUNT</th>
                <th className="py-3 px-3.5 whitespace-nowrap">EXPENSE DATE</th>
                <th className="py-3 px-3.5 whitespace-nowrap">SUBMITTED ON</th>
                <th className="py-3 px-3.5 whitespace-nowrap">STATUS</th>
                <th className="py-3 px-4 whitespace-nowrap text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No reimbursements found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const isSelected = selectedRowIds.includes(item.id)
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isSelected ? "bg-[#EEF0FD]/30" : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleRow(item.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#5B50E5] focus:ring-[#5B50E5] cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap font-bold text-slate-800">
                        {item.id}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${item.employee.avatarBg}`}
                          >
                            {item.employee.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800 leading-tight">
                              {item.employee.name}
                            </span>
                            <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                              {item.employee.designation}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap font-medium text-slate-700">
                        {item.expenseTitle}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {getCategoryBadge(item.category)}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap font-bold text-slate-900">
                        {item.amount}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">
                        {item.expenseDate}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-500">
                        {item.submittedOn}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right relative">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => setViewItem(item)}
                            title="View Details"
                            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditItem(item)}
                            title="Edit Claim"
                            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActionMenuOpenId(
                                  actionMenuOpenId === item.id ? null : item.id
                                )
                              }
                              title="More Options"
                              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </button>

                            {actionMenuOpenId === item.id && (
                              <div
                                ref={actionMenuRef}
                                className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-1 text-xs text-left"
                              >
                                {item.status !== "Paid" && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(item.id, "Paid")}
                                    className="w-full text-left px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 font-medium"
                                  >
                                    Approve & Pay
                                  </button>
                                )}
                                {item.status !== "Rejected" && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(item.id, "Rejected")}
                                    className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-medium"
                                  >
                                    Reject Claim
                                  </button>
                                )}
                                {item.status !== "Pending" && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(item.id, "Pending")}
                                    className="w-full text-left px-3 py-1.5 text-amber-600 hover:bg-amber-50 font-medium"
                                  >
                                    Mark as Pending
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setViewItem(item)
                                    setActionMenuOpenId(null)
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                                >
                                  Full Summary
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredItems.length === 0
                ? "0"
                : `${(currentPage - 1) * rowsPerPage + 1}–${Math.min(
                    currentPage * rowsPerPage,
                    filteredItems.length
                  )}`}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredItems.length}
            </span>{" "}
            reimbursements
          </div>

          <div className="flex items-center gap-6">
            <div ref={rowsPerPageRef} className="flex items-center gap-2 relative">
              <span>Rows per page:</span>
              <button
                type="button"
                onClick={() => setRowsPerPageOpen(!rowsPerPageOpen)}
                className="h-7 px-2 bg-white border border-slate-200/90 rounded-lg text-slate-700 font-semibold shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{rowsPerPage}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {rowsPerPageOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-20 bg-white border border-slate-100 rounded-lg shadow-lg z-20 py-1 text-xs">
                  {[5, 10, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setRowsPerPage(num)
                        setRowsPerPageOpen(false)
                        setCurrentPage(1)
                      }}
                      className={`w-full text-center py-1 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
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
                className="w-7 h-7 rounded-lg border border-slate-200/90 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === p
                      ? "bg-[#5B50E5] text-white shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 rounded-lg border border-slate-200/90 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReimbursementDetailsModal
        item={viewItem}
        onClose={() => setViewItem(null)}
      />

      <EditReimbursementModal
        item={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleUpdateItem}
      />

      <AddReimbursementModal
        isOpen={isAddOpen || Boolean(externalAddOpen)}
        onClose={() => {
          setIsAddOpen(false)
          if (onCloseExternalAdd) onCloseExternalAdd()
        }}
        onAdd={handleAddItem}
      />
    </div>
  )
}
