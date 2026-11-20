"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import {
  INITIAL_PRESENT_TODAY_EMPLOYEES,
  PresentTodayEmployee,
} from "./PresentTodayData"

export default function PresentTodayTable() {
  const [employees] = useState<PresentTodayEmployee[]>(
    INITIAL_PRESENT_TODAY_EMPLOYEES
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("Department")
  const [selectedEmpType, setSelectedEmpType] = useState("Employment Type")
  const [selectedStatus, setSelectedStatus] = useState("Status")

  const [deptOpen, setDeptOpen] = useState(false)
  const [empTypeOpen, setEmpTypeOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const deptRef = useRef<HTMLDivElement>(null)
  const empTypeRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 8

  const DEPARTMENTS = [
    "All Departments",
    "Executive Office",
    "Finance",
    "Operations",
    "Human Resources",
    "Technology",
    "Marketing",
    "Sales",
    "Customer Success",
  ]

  const EMPLOYMENT_TYPES = [
    "All Employment Types",
    "Permanent",
    "Contract",
    "Probation",
  ]

  const STATUSES = ["All Status", "Present", "Absent", "On Leave"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setDeptOpen(false)
      }
      if (
        empTypeRef.current &&
        !empTypeRef.current.contains(event.target as Node)
      ) {
        setEmpTypeOpen(false)
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setStatusOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedDept("Department")
    setSelectedEmpType("Employment Type")
    setSelectedStatus("Status")
    setCurrentPage(1)
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.id.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q)

      const matchesDept =
        selectedDept === "Department" ||
        selectedDept === "All Departments" ||
        emp.department === selectedDept

      const matchesEmpType =
        selectedEmpType === "Employment Type" ||
        selectedEmpType === "All Employment Types" ||
        emp.employmentType === selectedEmpType

      const matchesStatus =
        selectedStatus === "Status" ||
        selectedStatus === "All Status" ||
        emp.status === selectedStatus

      return matchesSearch && matchesDept && matchesEmpType && matchesStatus
    })
  }, [employees, searchQuery, selectedDept, selectedEmpType, selectedStatus])

  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredEmployees.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const isDefaultView =
    !searchQuery &&
    selectedDept === "Department" &&
    selectedEmpType === "Employment Type" &&
    selectedStatus === "Status"

  const totalCountDisplay = isDefaultView
    ? "2,274"
    : filteredEmployees.length.toLocaleString()
  const totalPages = isDefaultView ? 285 : Math.ceil(filteredEmployees.length / rowsPerPage) || 1

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden p-5 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by name, employee ID, departmen..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div ref={deptRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDeptOpen(!deptOpen)
                setEmpTypeOpen(false)
                setStatusOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedDept}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {deptOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      setSelectedDept(dept)
                      setCurrentPage(1)
                      setDeptOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedDept === dept
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={empTypeRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setEmpTypeOpen(!empTypeOpen)
                setDeptOpen(false)
                setStatusOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedEmpType}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {empTypeOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {EMPLOYMENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedEmpType(type)
                      setCurrentPage(1)
                      setEmpTypeOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedEmpType === type
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {type}
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
                setEmpTypeOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(st)
                      setCurrentPage(1)
                      setStatusOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedStatus === st
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="h-8 px-3 bg-[#EEF0FD] hover:bg-[#E0E4FC] text-[#5B50E5] rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Filter</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-2"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Employee ID
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Employee Name
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Department
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Designation
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Employment Type
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Join Date
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                  {emp.id}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${emp.avatarColor}`}
                    >
                      {emp.initials}
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {emp.name}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-xs text-slate-600 font-medium whitespace-nowrap">
                  {emp.department}
                </td>

                <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                  {emp.designation}
                </td>

                <td className="py-3.5 px-4 text-xs text-slate-700 font-medium whitespace-nowrap">
                  {emp.employmentType}
                </td>

                <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                  {emp.joinDate}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      emp.status === "Present"
                        ? "text-emerald-600"
                        : emp.status === "Absent"
                        ? "text-rose-600"
                        : "text-amber-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        emp.status === "Present"
                          ? "bg-emerald-500"
                          : emp.status === "Absent"
                          ? "bg-rose-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <span>{emp.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-slate-500 font-medium text-center sm:text-left">
          Showing 1 to {paginatedData.length} of {totalCountDisplay} employees
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

          {[1, 2, 3, 4, 5].map((page) => (
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

          <span className="px-1 text-slate-400">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors cursor-pointer ${
              currentPage === totalPages
                ? "bg-[#5B50E5] text-white font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-100 font-medium"
            }`}
          >
            {totalPages}
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-7 h-7 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
