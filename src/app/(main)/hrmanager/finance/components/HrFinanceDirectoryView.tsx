"use client"

import React, { useState, useMemo } from "react"
import {
  UsersThree,
  CheckCircle,
  Clock,
  UserPlus,
  MagnifyingGlass,
  Eye,
  PencilSimple,
  CaretLeft,
  CaretRight,
} from "phosphor-react"
import {
  HR_PAYROLL_KPIS,
  HR_PAYROLL_EMPLOYEES,
  HrPayrollEmployee,
} from "./hrPayrollData"
import { ReusableAvatar } from "@/../reusableComponents"

export interface HrFinanceDirectoryViewProps {
  onSelectEmployee: (employee: HrPayrollEmployee) => void
  currentMode?: "hr" | "personal"
  onSwitchMode?: (mode: "hr" | "personal") => void
}

const DEPARTMENTS = [
  "All Departments",
  "Data & Analytics",
  "HR",
  "Engineering",
  "Product",
  "Finance",
  "Marketing",
  "Operations",
  "Customer Support",
  "Sales",
  "Design",
]

const DESIGNATIONS = [
  "All Designations",
  "Data Analyst",
  "HR Executive",
  "Software Engineer",
  "Product Manager",
  "Accountant",
  "Marketing Executive",
  "Operations Manager",
  "Support Associate",
  "Sales Executive",
  "UI/UX Designer",
]

const STATUSES = ["All Status", "Active", "On Leave", "Inactive"]

export default function HrFinanceDirectoryView({
  onSelectEmployee,
  currentMode = "hr",
  onSwitchMode,
}: HrFinanceDirectoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("All Departments")
  const [selectedDesignation, setSelectedDesignation] = useState("All Designations")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredEmployees = useMemo(() => {
    return HR_PAYROLL_EMPLOYEES.filter((emp) => {
      if (selectedDept !== "All Departments" && emp.department !== selectedDept) {
        return false
      }
      if (
        selectedDesignation !== "All Designations" &&
        emp.designation !== selectedDesignation
      ) {
        return false
      }
      if (selectedStatus !== "All Status" && emp.status !== selectedStatus) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = emp.name.toLowerCase().includes(q)
        const matchId = emp.employeeId.toLowerCase().includes(q)
        const matchEmail = emp.email.toLowerCase().includes(q)
        const matchDept = emp.department.toLowerCase().includes(q)
        const matchDesig = emp.designation.toLowerCase().includes(q)
        const matchPhone = emp.phone?.toLowerCase().includes(q)
        if (!matchName && !matchId && !matchEmail && !matchDept && !matchDesig && !matchPhone) {
          return false
        }
      }
      return true
    })
  }, [searchQuery, selectedDept, selectedDesignation, selectedStatus])

  const totalEmployeesCount = HR_PAYROLL_KPIS.totalEmployees
  const totalPages = Math.max(1, Math.ceil(totalEmployeesCount / pageSize))

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredEmployees.slice(start, start + pageSize)
  }, [filteredEmployees, currentPage, pageSize])

  const startRecord = (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(
    currentPage * pageSize,
    searchQuery || selectedDept !== "All Departments" || selectedStatus !== "All Status"
      ? filteredEmployees.length
      : totalEmployeesCount
  )

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-6 select-none">
      {onSwitchMode && (
        <div className="w-full bg-white rounded-2xl p-1.5 shadow-2xs border border-slate-100/80 flex items-center justify-between">
          <div className="grid grid-cols-2 gap-1.5 w-full">
            <button
              type="button"
              onClick={() => onSwitchMode("hr")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentMode === "hr"
                  ? "bg-[#5B50EC] text-white shadow-xs"
                  : "bg-[#A3A3A3] text-white hover:bg-[#949494] shadow-2xs"
              }`}
            >
              HR
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode("personal")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentMode === "personal"
                  ? "bg-[#5B50EC] text-white shadow-xs"
                  : "bg-[#A3A3A3] text-white hover:bg-[#949494] shadow-2xs"
              }`}
            >
              Personal
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EEEDFC] text-[#5B50EC] flex items-center justify-center">
            <UsersThree size={20} weight="bold" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">
              Total Employees
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {HR_PAYROLL_KPIS.totalEmployees}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
            <CheckCircle size={20} weight="bold" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">
              Active Employees
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {HR_PAYROLL_KPIS.activeEmployees}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
            <Clock size={20} weight="bold" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">
              On Leave Today
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {HR_PAYROLL_KPIS.onLeaveToday}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
            <UserPlus size={20} weight="bold" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">
              Joined This Month
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {HR_PAYROLL_KPIS.joinedThisMonth}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-5 md:p-6 flex flex-col gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Employees
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View and manage all employees across the organization
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3 w-full">
          <div className="relative flex-1 min-w-[240px]">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by name, ID, email or phone..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] focus:border-[#5B50EC] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-nowrap">
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] cursor-pointer"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedDesignation}
              onChange={(e) => {
                setSelectedDesignation(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] cursor-pointer"
            >
              {DESIGNATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] cursor-pointer"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[1020px] whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-200/80 text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                <th className="py-3 px-3.5 w-10 whitespace-nowrap">#</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Employees</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Employee ID</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Department</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Designation</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Location</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Join Date</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Status</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm whitespace-nowrap">
              {paginatedEmployees.map((emp, idx) => (
                <tr
                  key={emp.id}
                  onClick={() => onSelectEmployee(emp)}
                  className="hover:bg-[#F8F7FF] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3.5 text-slate-400 font-medium text-xs whitespace-nowrap">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="py-3.5 px-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <ReusableAvatar
                        src={emp.avatar}
                        name={emp.name}
                        size={32}
                        shape="circle"
                        showBorder
                        borderColor="#E2E8F0"
                        borderWidth={1}
                        className="shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 group-hover:text-[#5B50EC] transition-colors whitespace-nowrap">
                          {emp.name}
                        </span>
                        <span className="text-[11px] text-slate-400 whitespace-nowrap">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3.5 font-medium text-slate-700 whitespace-nowrap">
                    {emp.employeeId}
                  </td>
                  <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                    {emp.department}
                  </td>
                  <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                    {emp.designation}
                  </td>
                  <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                    {emp.location}
                  </td>
                  <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                    {emp.joinDate}
                  </td>
                  <td className="py-3.5 px-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        emp.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : emp.status === "On Leave"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectEmployee(emp)}
                        title="View Employee Finance"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50EC] hover:bg-[#EEEDFC] transition-colors cursor-pointer"
                      >
                        <Eye size={17} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectEmployee(emp)}
                        title="Edit Details"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#5B50EC] hover:bg-[#EEEDFC] transition-colors cursor-pointer"
                      >
                        <PencilSimple size={17} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No employees found matching the filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div>
            Showing <span className="font-semibold text-slate-800">{startRecord}</span> -{" "}
            <span className="font-semibold text-slate-800">{endRecord}</span> of{" "}
            <span className="font-semibold text-slate-800">{totalEmployeesCount}</span> employees
          </div>

          <div className="flex items-center gap-3">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-2.5 py-1 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <CaretLeft size={14} />
              </button>

              <button
                type="button"
                className="w-7 h-7 rounded-lg bg-[#5B50EC] text-white text-xs font-semibold flex items-center justify-center shadow-xs"
              >
                {currentPage}
              </button>

              {currentPage + 1 <= totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-7 h-7 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  {currentPage + 1}
                </button>
              )}

              {totalPages > 3 && (
                <span className="px-1 text-slate-400">...</span>
              )}

              {totalPages > 2 && currentPage !== totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-7 h-7 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  {totalPages}
                </button>
              )}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                <CaretRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

