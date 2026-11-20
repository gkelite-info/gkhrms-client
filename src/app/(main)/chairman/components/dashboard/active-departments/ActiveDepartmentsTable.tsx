"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import {
  INITIAL_CHAIRMAN_DEPARTMENTS,
  ChairmanDepartment,
} from "./ActiveDepartmentsData"

export default function ActiveDepartmentsTable() {
  const [departments] = useState<ChairmanDepartment[]>(
    INITIAL_CHAIRMAN_DEPARTMENTS
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedHead, setSelectedHead] = useState("Department Head")
  const [selectedStrength, setSelectedStrength] = useState("Employee Strength")
  const [selectedStatus, setSelectedStatus] = useState("Status")

  const [headOpen, setHeadOpen] = useState(false)
  const [strengthOpen, setStrengthOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const headRef = useRef<HTMLDivElement>(null)
  const strengthRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 8

  const HEAD_OPTIONS = [
    "All Department Heads",
    "Rajiv Sharma",
    "Aisha Patel",
    "Vikram Kapoor",
    "Sneha Nair",
    "Arjun Rao",
    "Priya Khanna",
    "Daniel Mathews",
    "Irfan Khan",
  ]

  const STRENGTH_OPTIONS = [
    "All Strengths",
    "< 100 Employees",
    "100 - 300 Employees",
    "> 300 Employees",
  ]

  const STATUS_OPTIONS = ["All Status", "Active", "Inactive"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headRef.current && !headRef.current.contains(event.target as Node)) {
        setHeadOpen(false)
      }
      if (
        strengthRef.current &&
        !strengthRef.current.contains(event.target as Node)
      ) {
        setStrengthOpen(false)
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

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        dept.name.toLowerCase().includes(q) ||
        dept.headName.toLowerCase().includes(q)

      const matchesHead =
        selectedHead === "Department Head" ||
        selectedHead === "All Department Heads" ||
        dept.headName === selectedHead

      const matchesStrength =
        selectedStrength === "Employee Strength" ||
        selectedStrength === "All Strengths" ||
        (selectedStrength === "< 100 Employees" && dept.employees < 100) ||
        (selectedStrength === "100 - 300 Employees" &&
          dept.employees >= 100 &&
          dept.employees <= 300) ||
        (selectedStrength === "> 300 Employees" && dept.employees > 300)

      const matchesStatus =
        selectedStatus === "Status" ||
        selectedStatus === "All Status" ||
        dept.status === selectedStatus

      return matchesSearch && matchesHead && matchesStrength && matchesStatus
    })
  }, [departments, searchQuery, selectedHead, selectedStrength, selectedStatus])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDepartments.length / rowsPerPage)
  )
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredDepartments.slice(
    startIndex,
    startIndex + rowsPerPage
  )

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
            placeholder="Search by department name, department head..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] shadow-2xs transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div ref={headRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setHeadOpen(!headOpen)
                setStrengthOpen(false)
                setStatusOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedHead}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {headOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {HEAD_OPTIONS.map((head) => (
                  <button
                    key={head}
                    type="button"
                    onClick={() => {
                      setSelectedHead(head)
                      setCurrentPage(1)
                      setHeadOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedHead === head
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {head}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={strengthRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setStrengthOpen(!strengthOpen)
                setHeadOpen(false)
                setStatusOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStrength}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {strengthOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {STRENGTH_OPTIONS.map((str) => (
                  <button
                    key={str}
                    type="button"
                    onClick={() => {
                      setSelectedStrength(str)
                      setCurrentPage(1)
                      setStrengthOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedStrength === str
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {str}
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
                setHeadOpen(false)
                setStrengthOpen(false)
              }}
              className="h-8 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 shadow-2xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {STATUS_OPTIONS.map((st) => (
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
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100/80 bg-slate-50/50">
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Department
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Department Head
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Employees
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Open Positions
              </th>
              <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.map((dept) => (
              <tr
                key={dept.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3.5 px-4 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {dept.name}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${dept.headAvatarColor}`}
                    >
                      {dept.headInitials}
                    </div>
                    <span className="text-xs text-slate-800 font-medium">
                      {dept.headName}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-xs text-slate-700 whitespace-nowrap">
                  {dept.employees}
                </td>

                <td className="py-3.5 px-4 text-xs text-slate-700 whitespace-nowrap">
                  {dept.openPositions}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {dept.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="text-slate-500 font-medium text-center sm:text-left">
          Showing 1 to {paginatedData.length} of {filteredDepartments.length}{" "}
          departments
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
