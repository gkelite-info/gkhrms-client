"use client"

import { Eye } from "phosphor-react"
import {
  TableColumn,
  ReusableAvatar,
} from "@/components/reusableComponents"
import { HrAttendanceRecord } from "../data/hrAttendanceData"

export function getStatusBadge(status: HrAttendanceRecord["status"]) {
  switch (status) {
    case "Present":
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        dot: "bg-emerald-500",
      }
    case "Late":
      return {
        bg: "bg-amber-50 text-amber-700 border-amber-200/60",
        dot: "bg-amber-500",
      }
    case "Absent":
      return {
        bg: "bg-rose-50 text-rose-700 border-rose-200/60",
        dot: "bg-rose-500",
      }
    case "On Leave":
      return {
        bg: "bg-amber-50 text-amber-700 border-amber-200/60",
        dot: "bg-amber-500",
      }
    case "Work From Home":
      return {
        bg: "bg-[#EEF2FF] text-[#5B50EC] border-[#DDD9FD]",
        dot: "bg-[#5B50EC]",
      }
    default:
      return {
        bg: "bg-gray-50 text-gray-700 border-gray-200",
        dot: "bg-gray-400",
      }
  }
}

export function createHrAttendanceColumns(
  onViewRecord: (record: HrAttendanceRecord) => void
): TableColumn<HrAttendanceRecord>[] {
  return [
    {
      header: "Employee",
      accessor: "name",
      className: "whitespace-nowrap min-w-[190px]",
      render: (row) => (
        <div className="flex items-center gap-3">
          <ReusableAvatar
            src={row.avatar}
            alt={row.name}
            name={row.name}
            size="sm"
            fallbackType="icon"
          />
          <span className="font-bold text-gray-900 text-xs sm:text-sm">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      header: "Employee ID",
      accessor: "employeeId",
      className: "text-gray-400 font-mono text-xs whitespace-nowrap",
    },
    {
      header: "Department",
      accessor: "department",
      className: "text-gray-600 font-medium text-xs whitespace-nowrap",
    },
    {
      header: "Role",
      accessor: "role",
      className: "text-gray-700 font-medium text-xs whitespace-nowrap",
    },
    {
      header: "Status",
      accessor: "status",
      className: "whitespace-nowrap",
      render: (row) => {
        const config = getStatusBadge(row.status)
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {row.status}
          </span>
        )
      },
    },
    {
      header: "Check-in",
      accessor: "checkIn",
      className: "text-gray-700 font-medium text-xs whitespace-nowrap",
    },
    {
      header: "Check-out",
      accessor: "checkOut",
      className: "text-gray-700 font-medium text-xs whitespace-nowrap",
    },
    {
      header: "Working Hours",
      accessor: "workingHours",
      className: "text-gray-800 font-semibold text-xs whitespace-nowrap",
    },
    {
      header: "Action",
      key: "action",
      className: "text-center whitespace-nowrap",
      align: "center",
      render: (row) => (
        <button
          type="button"
          onClick={() => onViewRecord(row)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-[#5B50EC] hover:bg-[#F3F2FD] transition-colors cursor-pointer inline-flex items-center justify-center"
          aria-label={`View details for ${row.name}`}
        >
          <Eye size={18} weight="bold" />
        </button>
      ),
    },
  ]
}

