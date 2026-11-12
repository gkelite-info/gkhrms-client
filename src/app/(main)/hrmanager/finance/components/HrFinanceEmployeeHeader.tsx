"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  MagnifyingGlass,
  ArrowLeft,
} from "phosphor-react"
import { ReusableAvatar } from "@/../reusableComponents"
import {
  HR_PAYROLL_EMPLOYEES,
  HrPayrollEmployee,
} from "./hrPayrollData"

export interface HrFinanceEmployeeHeaderProps {
  employee: HrPayrollEmployee
  onSelectEmployee: (emp: HrPayrollEmployee) => void
  onBackToDirectory: () => void
  currentMode?: "hr" | "personal"
  onSwitchMode?: (mode: "hr" | "personal") => void
}

export default function HrFinanceEmployeeHeader({
  employee,
  onSelectEmployee,
  onBackToDirectory,
  currentMode = "hr",
  onSwitchMode,
}: HrFinanceEmployeeHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const searchResults = HR_PAYROLL_EMPLOYEES.filter((emp) => {
    if (!searchQuery.trim()) return false
    const q = searchQuery.toLowerCase().trim()
    return (
      emp.name.toLowerCase().includes(q) ||
      emp.employeeId.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-3.5 select-none mb-1">
      {onSwitchMode && (
        <div className="w-full bg-white rounded-2xl p-1.5 shadow-2xs border border-slate-100/80 flex items-center justify-between">
          <div className="grid grid-cols-2 gap-1.5 w-full">
            <button
              type="button"
              onClick={() => onSwitchMode("hr")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${currentMode === "hr"
                  ? "bg-[#5B50EC] text-white shadow-xs"
                  : "bg-[#A3A3A3] text-white hover:bg-[#949494] shadow-2xs"
                }`}
            >
              HR
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode("personal")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${currentMode === "personal"
                  ? "bg-[#5B50EC] text-white shadow-xs"
                  : "bg-[#A3A3A3] text-white hover:bg-[#949494] shadow-2xs"
                }`}
            >
              Personal
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBackToDirectory}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#5B50EC] hover:border-[#5B50EC]/40 transition-colors shadow-2xs shrink-0 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>All Employees</span>
        </button>

        <div ref={dropdownRef} className="relative flex-1">
          <div className="relative w-full">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setIsDropdownOpen(true)
              }}
              placeholder="Search employee by name , ID, or Department"
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-xl text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#5B50EC] focus:border-[#5B50EC] transition-all"
            />
          </div>

          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
              {searchResults.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => {
                    onSelectEmployee(emp)
                    setSearchQuery("")
                    setIsDropdownOpen(false)
                  }}
                  className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7FF] transition-colors text-left cursor-pointer"
                >
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate">
                      {emp.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {emp.employeeId} · {emp.department} · {emp.designation}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6">
        <div className="shrink-0 flex items-center justify-center">
          <ReusableAvatar
            src={employee.avatar}
            name={employee.name}
            size={76}
            shape="circle"
            showBorder
            borderColor="#EDE9FE"
            borderWidth={4}
            className="shadow-2xs"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {employee.name}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-4 sm:gap-x-6 mt-2.5 text-xs sm:text-sm">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-400">
                Employee ID
              </span>
              <span className="font-semibold text-slate-800 mt-0.5">
                {employee.employeeId}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400">
                Email-ID
              </span>
              <div className="overflow-x-auto whitespace-nowrap mt-0.5 scrollbar-thin">
                <span className="font-semibold text-slate-800" title={employee.email}>
                  {employee.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-400">
                Department
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 truncate">
                {employee.department}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-400">
                Attendance
              </span>
              <span className="font-semibold text-slate-800 mt-0.5">
                {employee.attendance}
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[11px] font-medium text-slate-400">
                Status
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <span className="font-semibold text-slate-800">
                  {employee.status}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block ${employee.status === "Active"
                      ? "bg-emerald-500"
                      : employee.status === "On Leave"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

