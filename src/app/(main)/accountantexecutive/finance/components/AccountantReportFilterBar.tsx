"use client"

import { useState } from "react"
import {
  BarChart2,
  Calendar,
  Users,
  Briefcase,
  ChevronDown,
} from "lucide-react"
import {
  reportTypeOptions,
  reportDateRangeOptions,
  reportDepartmentOptions,
  reportCategoryOptions,
} from "../data/mockAccountantData"

interface AccountantReportFilterBarProps {
  reportType: string
  onReportTypeChange: (val: string) => void
  dateRange: string
  onDateRangeChange: (val: string) => void
  department: string
  onDepartmentChange: (val: string) => void
  category: string
  onCategoryChange: (val: string) => void
}

export default function AccountantReportFilterBar({
  reportType,
  onReportTypeChange,
  dateRange,
  onDateRangeChange,
  department,
  onDepartmentChange,
  category,
  onCategoryChange,
}: AccountantReportFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const closeDropdown = () => setOpenDropdown(null)

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight">
            Report Type
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("reportType")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <BarChart2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{reportType}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "reportType" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {reportTypeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      onReportTypeChange(type)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                      reportType === type
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight">
            Date Range
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("dateRange")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{dateRange}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "dateRange" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[220px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {reportDateRangeOptions.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      onDateRangeChange(range)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                      dateRange === range
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight">
            Department
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("department")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{department}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "department" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[190px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {reportDepartmentOptions.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      onDepartmentChange(dept)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                      department === dept
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 tracking-tight">
            Category
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("category")}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer text-left shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{category}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {openDropdown === "category" && (
            <>
              <div className="fixed inset-0 z-20" onClick={closeDropdown} />
              <div className="absolute top-full mt-1.5 left-0 z-30 w-full min-w-[190px] bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                {reportCategoryOptions.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat)
                      closeDropdown()
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                      category === cat
                        ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                        : "text-slate-700 font-medium"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

