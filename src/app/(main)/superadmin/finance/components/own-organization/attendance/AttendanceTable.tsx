"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Eye,
  MoreVertical,
  Check,
  Laptop,
  UserX,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react"
import Image from "next/image"
import {
  EmployeeAttendanceRecord,
  INITIAL_ATTENDANCE_DATA,
} from "./AttendanceData"
import AttendanceDetailsModal from "./AttendanceDetailsModal"

export default function AttendanceTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedStatus, setSelectedStatus] = useState("All Attendance Status")
  const [selectedDate, setSelectedDate] = useState("Jan 23, 2024")

  const [deptOpen, setDeptOpen] = useState(false)
  const [locOpen, setLocOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)

  const deptRef = useRef<HTMLDivElement>(null)
  const locRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  const [selectedRecord, setSelectedRecord] =
    useState<EmployeeAttendanceRecord | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setDeptOpen(false)
      }
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setLocOpen(false)
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false)
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedDepartment("All Departments")
    setSelectedLocation("All Locations")
    setSelectedStatus("All Attendance Status")
    setSelectedDate("Jan 23, 2024")
    setSortOrder("asc")
    setCurrentPage(1)
  }

  const filteredData = useMemo(() => {
    return INITIAL_ATTENDANCE_DATA.filter((item) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.employeeId.toLowerCase().includes(q)

      const matchesDept =
        selectedDepartment === "All Departments" ||
        item.department === selectedDepartment

      const matchesLoc =
        selectedLocation === "All Locations" ||
        item.location === selectedLocation

      const matchesStatus =
        selectedStatus === "All Attendance Status" ||
        item.status === selectedStatus

      return matchesSearch && matchesDept && matchesLoc && matchesStatus
    }).sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    })
  }, [
    searchQuery,
    selectedDepartment,
    selectedLocation,
    selectedStatus,
    sortOrder,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ]
  }, [currentPage, totalPages])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="relative min-w-[220px] max-w-xs flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search employees..."
              className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-xs transition-all"
            />
          </div>

          <div ref={deptRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDeptOpen(!deptOpen)
                setLocOpen(false)
                setStatusOpen(false)
                setDateOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedDepartment}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {deptOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "All Departments",
                  "Technology",
                  "Product",
                  "Delivery",
                  "Human Resources",
                  "Finance",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedDepartment(opt)
                      setCurrentPage(1)
                      setDeptOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedDepartment === opt
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

          <div ref={locRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setLocOpen(!locOpen)
                setDeptOpen(false)
                setStatusOpen(false)
                setDateOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedLocation}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {locOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "All Locations",
                  "Hyderabad",
                  "Bengaluru",
                  "Mumbai",
                  "Delhi",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(opt)
                      setCurrentPage(1)
                      setLocOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedLocation === opt
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
                setDeptOpen(false)
                setLocOpen(false)
                setDateOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "All Attendance Status",
                  "Present",
                  "WFH",
                  "On Leave",
                  "Absent",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(opt)
                      setCurrentPage(1)
                      setStatusOpen(false)
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
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div ref={dateRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDateOpen(!dateOpen)
                setDeptOpen(false)
                setLocOpen(false)
                setStatusOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedDate}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dateOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {[
                  "Jan 23, 2024",
                  "Jan 22, 2024",
                  "Jan 21, 2024",
                  "Jan 20, 2024",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedDate(opt)
                      setCurrentPage(1)
                      setDateOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedDate === opt
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

          <div className="w-9 h-9 bg-white border border-slate-200/90 rounded-xl shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-[#5B50E5] font-semibold text-xs hover:underline cursor-pointer ml-1"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="py-4 px-5 cursor-pointer select-none group whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Employee</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </div>
                </th>
                <th className="py-4 px-4 whitespace-nowrap">Employee ID</th>
                <th className="py-4 px-4 whitespace-nowrap">Department</th>
                <th className="py-4 px-4 whitespace-nowrap">Check-in</th>
                <th className="py-4 px-4 whitespace-nowrap">Check-out</th>
                <th className="py-4 px-4 whitespace-nowrap">Working Hours</th>
                <th className="py-4 px-4 whitespace-nowrap">Status</th>
                <th className="py-4 px-5 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 relative">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {item.employeeId}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {item.department}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.checkIn !== "—" ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{item.checkIn}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.checkOut !== "—" ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{item.checkOut}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.workingHours}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === "Present" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/90">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Present
                        </span>
                      ) : item.status === "WFH" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100/90">
                          <Laptop className="w-3 h-3 text-blue-600" />
                          WFH
                        </span>
                      ) : item.status === "On Leave" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100/90">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          On Leave
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-500 border border-rose-100/90">
                          <UserX className="w-3.5 h-3.5 text-rose-500" />
                          Absent
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                          title="View Attendance Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredData.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + rowsPerPage, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {filteredData.length}
            </span>{" "}
            records
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {paginationItems.map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 font-medium"
                  >
                    ...
                  </span>
                )
              }

              const pageNum = Number(item)
              const isActive = currentPage === pageNum

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5B50E5] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 font-medium rounded-lg"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AttendanceDetailsModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  )
}
