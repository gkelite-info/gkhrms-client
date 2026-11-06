"use client"

import { TableColumn } from "@/components/reusableComponents"
import { MemberDailyAttendance } from "../../../data/teamAttendanceData"

export const memberHistoryColumns: TableColumn<MemberDailyAttendance>[] = [
  {
    header: "DATE",
    accessor: "date",
    className: "font-semibold text-gray-800 whitespace-nowrap",
  },
  {
    header: "STATUS",
    accessor: "status",
    render: (row) => {
      if (row.status === "Present") {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8FAF4] text-[#10B981] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Present
          </span>
        )
      }
      if (row.status === "On Leave") {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF8EC] text-[#F59E0B] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            On Leave
          </span>
        )
      }
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF1EB] text-[#F97316] select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
          Late
        </span>
      )
    },
  },
  {
    header: "CHECK IN",
    accessor: "checkIn",
    className: "text-gray-700 font-medium whitespace-nowrap",
  },
  {
    header: "CHECK OUT",
    accessor: "checkOut",
    className: "text-gray-700 font-medium whitespace-nowrap",
  },
  {
    header: "TOTAL HOURS",
    accessor: "grossHours",
    className: "font-semibold text-gray-900 whitespace-nowrap",
  },
]

