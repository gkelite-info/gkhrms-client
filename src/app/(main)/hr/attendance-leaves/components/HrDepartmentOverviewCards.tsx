"use client"

import {
  Desktop,
  CurrencyInr,
  Users,
  Gear,
  TrendUp,
} from "phosphor-react"
import {
  HR_DEPARTMENT_OVERVIEWS,
  HrDepartmentOverview,
} from "../data/hrAttendanceData"

interface HrDepartmentOverviewCardsProps {
  selectedDepartment?: string | null
  onSelectDepartment?: (deptName: string) => void
  hideHrDepartment?: boolean
}

function CircularProgress({ percentage }: { percentage: number }) {
  const size = 38
  const strokeWidth = 3.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EEF2FF"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#5B50EC"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-[#5B50EC]">
        {percentage}%
      </span>
    </div>
  )
}

export default function HrDepartmentOverviewCards({
  selectedDepartment,
  onSelectDepartment,
  hideHrDepartment = false,
}: HrDepartmentOverviewCardsProps) {
  const departments = hideHrDepartment
    ? HR_DEPARTMENT_OVERVIEWS.filter(
        (dept) => dept.id !== "hr" && dept.iconType !== "hr"
      )
    : HR_DEPARTMENT_OVERVIEWS

  const defaultDept = departments[0]?.name || "Technology"
  const activeDept =
    hideHrDepartment && selectedDepartment === "Human Resources"
      ? defaultDept
      : selectedDepartment || defaultDept

  const getDeptIcon = (iconType: HrDepartmentOverview["iconType"]) => {
    switch (iconType) {
      case "technology":
        return {
          icon: Desktop,
          bg: "bg-blue-50",
          color: "text-blue-600",
        }
      case "finance":
        return {
          icon: CurrencyInr,
          bg: "bg-emerald-50",
          color: "text-emerald-600",
        }
      case "hr":
        return {
          icon: Users,
          bg: "bg-purple-50",
          color: "text-purple-600",
        }
      case "operations":
        return {
          icon: Gear,
          bg: "bg-amber-50",
          color: "text-amber-600",
        }
      case "sales":
        return {
          icon: TrendUp,
          bg: "bg-indigo-50",
          color: "text-indigo-600",
        }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-bold text-gray-900 leading-tight">
        Department-wise Attendance Overview
      </h2>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          hideHrDepartment ? "lg:grid-cols-4" : "lg:grid-cols-5"
        } gap-3 sm:gap-3.5`}
      >
        {departments.map((dept) => {
          const config = getDeptIcon(dept.iconType)
          const Icon = config.icon
          const isSelected = activeDept === dept.name

          return (
            <div
              key={dept.id}
              onClick={() => onSelectDepartment?.(dept.name)}
              className={`bg-white rounded-2xl p-4 border shadow-xs flex flex-col justify-between gap-3 h-full min-h-[142px] transition-all cursor-pointer select-none ${
                isSelected
                  ? "border-[#5B50EC] ring-2 ring-[#5B50EC]/20"
                  : "border-gray-100 hover:border-[#5B50EC]/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}
                >
                  <Icon size={18} weight="bold" />
                </div>
                <CircularProgress percentage={dept.percentage} />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-sm font-bold text-gray-900 truncate" title={dept.name}>
                  {dept.name}
                </span>

                <div className="flex flex-col gap-0.5 mt-0.5">
                  <div className="text-xs text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
                    <span className="font-bold text-gray-900">
                      {dept.present} / {dept.total}
                    </span>
                    <span className="text-gray-400 font-normal">present</span>
                  </div>

                  <div className="text-[11px] text-gray-400 font-medium whitespace-nowrap flex items-center gap-1">
                    <span className="text-gray-300 font-light">|</span>
                    <span className="font-semibold text-gray-700">{dept.absent}</span>
                    <span>absent</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
