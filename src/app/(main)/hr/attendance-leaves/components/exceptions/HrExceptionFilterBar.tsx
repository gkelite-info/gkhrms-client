"use client"

import { useState } from "react"
import {
  ReusableDropdown,
  ReusableDateFilter,
  DateFilterValue,
} from "@/components/reusableComponents"

interface HrExceptionFilterBarProps {
  department: string
  selectedRoles: string[]
  status?: string
  fromDate: DateFilterValue
  toDate: DateFilterValue
  onApplyFilters: (filters: {
    department: string
    selectedRoles: string[]
    status: string
    fromDate: DateFilterValue
    toDate: DateFilterValue
  }) => void
  onResetFilters: () => void
  hideHrDepartment?: boolean
}

export default function HrExceptionFilterBar({
  department,
  selectedRoles,
  status = "All",
  fromDate,
  toDate,
  onApplyFilters,
  onResetFilters,
  hideHrDepartment = false,
}: HrExceptionFilterBarProps) {
  const [localDepartment, setLocalDepartment] = useState(department)
  const [localRoles, setLocalRoles] = useState<string[]>(selectedRoles)
  const [localStatus, setLocalStatus] = useState<string>(status)
  const [localFromDate, setLocalFromDate] = useState<DateFilterValue>(fromDate)
  const [localToDate, setLocalToDate] = useState<DateFilterValue>(toDate)

  const rawDepartmentOptions = [
    "All Departments",
    "Technology",
    "Finance",
    "Human Resources",
    "Operations",
    "Sales",
  ]

  const departmentOptions = hideHrDepartment
    ? rawDepartmentOptions.filter((d) => d !== "Human Resources")
    : rawDepartmentOptions

  const roleOptions = hideHrDepartment
    ? ["Team Lead", "Manager", "Employee"]
    : ["Team Lead", "Manager", "Employee", "HR"]

  const handleApply = () => {
    onApplyFilters({
      department: localDepartment,
      selectedRoles: localRoles,
      status: localStatus,
      fromDate: localFromDate,
      toDate: localToDate,
    })
  }

  const handleReset = () => {
    setLocalDepartment("All Departments")
    setLocalRoles([])
    setLocalStatus("All")
    setLocalFromDate(new Date(2025, 7, 25))
    setLocalToDate(new Date(2025, 7, 25))
    onResetFilters()
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-3 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-end gap-3 sm:gap-3.5">
        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Department
          </label>
          <ReusableDropdown
            value={localDepartment}
            options={departmentOptions}
            onChange={(val) => setLocalDepartment(String(val))}
            align="left"
            placeholder="All Departments"
            className="w-full"
            buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-between"
          />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            All Roles
          </label>
          <ReusableDropdown
            value={localRoles}
            options={roleOptions}
            onChange={(val) => setLocalRoles(val)}
            selectionType="checkbox"
            multiple={true}
            align="left"
            placeholder="All Roles"
            className="w-full"
            buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-between"
            menuClassName="w-56"
          />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Status
          </label>
          <ReusableDropdown
            value={localStatus}
            options={["All", "Pending", "Regularized"]}
            onChange={(val) => setLocalStatus(String(val))}
            align="left"
            placeholder="All"
            className="w-full"
            buttonClassName="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-between"
          />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            From Date
          </label>
          <ReusableDateFilter
            value={localFromDate}
            onChange={setLocalFromDate}
            modes={["date", "month", "year"]}
            title="Filter From Date"
            showCaret={false}
            className="w-full"
            buttonClassName="w-full h-10 px-3.5 flex items-center gap-2.5 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50 transition-all shadow-xs cursor-pointer select-none"
          />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            To Date
          </label>
          <ReusableDateFilter
            value={localToDate}
            onChange={setLocalToDate}
            modes={["date", "month", "year"]}
            title="Filter To Date"
            showCaret={false}
            className="w-full"
            buttonClassName="w-full h-10 px-3.5 flex items-center gap-2.5 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:border-[#5B50EC] hover:bg-gray-50 transition-all shadow-xs cursor-pointer select-none"
          />
        </div>

        <div className="flex items-center gap-2.5 sm:col-span-2 lg:col-span-3 xl:col-span-1 justify-end pt-1 xl:pt-0 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="h-10 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="h-10 px-5 rounded-xl bg-[#5B50EC] hover:bg-[#4d42df] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
