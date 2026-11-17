"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Check,
} from "lucide-react"
import Image from "next/image"
import {
  PayrollEmployeeRecord,
  INITIAL_PAYROLL_RECORDS,
} from "./PayrollData"
import PayrollDetailsModal from "./PayrollDetailsModal"

export default function PayrollTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const [deptOpen, setDeptOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [rowsPerPageOpen, setRowsPerPageOpen] = useState(false)

  const deptRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const rowsPerPageRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedRecord, setSelectedRecord] =
    useState<PayrollEmployeeRecord | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setDeptOpen(false)
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false)
      }
      if (
        rowsPerPageRef.current &&
        !rowsPerPageRef.current.contains(event.target as Node)
      ) {
        setRowsPerPageOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredData = useMemo(() => {
    return INITIAL_PAYROLL_RECORDS.filter((item) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.employeeId.toLowerCase().includes(q)

      const matchesDept =
        selectedDepartment === "All Departments" ||
        item.department === selectedDepartment

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus

      return matchesSearch && matchesDept && matchesStatus
    })
  }, [searchQuery, selectedDepartment, selectedStatus])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", 25]
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, "...", currentPage, "...", 25]
  }, [currentPage, totalPages])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="relative min-w-[240px] max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by employee name, ID..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-xs transition-all"
          />
        </div>

        <div ref={deptRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setDeptOpen(!deptOpen)
              setStatusOpen(false)
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

        <div ref={statusRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setStatusOpen(!statusOpen)
              setDeptOpen(false)
            }}
            className="h-9 px-3.5 bg-white border border-slate-200/90 rounded-xl text-slate-700 font-medium shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>{selectedStatus}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {statusOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
              {["All Status", "Paid", "Pending", "Processing"].map((opt) => (
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

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5 whitespace-nowrap">Employee</th>
                <th className="py-4 px-4 whitespace-nowrap">Employee ID</th>
                <th className="py-4 px-4 whitespace-nowrap">Department</th>
                <th className="py-4 px-4 whitespace-nowrap">Gross Salary</th>
                <th className="py-4 px-4 whitespace-nowrap">Deductions</th>
                <th className="py-4 px-4 whitespace-nowrap">Net Salary</th>
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
                    No payroll records found.
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
                        <span className="font-semibold text-slate-800">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {item.employeeId}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {item.department}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.grossSalary}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.deductions}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {item.netSalary}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/90">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50E5] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                          title="Download Payslip"
                        >
                          <Download className="w-4 h-4" />
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
              {filteredData.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-700">
              {Math.min(startIndex + rowsPerPage, filteredData.length)}
            </span>{" "}
            of <span className="font-bold text-slate-700">248</span> employees
          </div>

          <div className="flex items-center gap-4">
            <div ref={rowsPerPageRef} className="relative flex items-center gap-2">
              <span className="text-slate-400 text-xs">Rows per page</span>
              <button
                type="button"
                onClick={() => setRowsPerPageOpen(!rowsPerPageOpen)}
                className="h-8 px-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{rowsPerPage}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {rowsPerPageOpen && (
                <div className="absolute right-0 bottom-full mb-1.5 w-20 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                  {[5, 10, 20, 50].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setRowsPerPage(num)
                        setCurrentPage(1)
                        setRowsPerPageOpen(false)
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
                    key={`${pageNum}-${index}`}
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
      </div>

      <PayrollDetailsModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  )
}
