"use client"

import React, { useState, useMemo } from "react"
import { Article } from "phosphor-react"
import {
  ReusableTable,
  TableColumn,
  ReusablePagination,
  ReusableDateFilter,
  DateFilterValue,
} from "@/components/reusableComponents"

export interface HistoryItem {
  id: string
  date: string
  status: "Present" | "Late" | "On Leave"
  checkIn: string
  checkOut: string
  grossHours: string
}

interface MemberAttendanceHistoryCardProps {
  history: HistoryItem[]
}

const historyColumns: TableColumn<HistoryItem>[] = [
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

export default function MemberAttendanceHistoryCard({
  history,
}: MemberAttendanceHistoryCardProps) {
  const [historyPage, setHistoryPage] = useState(1)
  const [historyPageSize, setHistoryPageSize] = useState(5)
  const [historyDateFilter, setHistoryDateFilter] = useState<DateFilterValue>(null)

  const totalHistoryPages = Math.max(1, Math.ceil(history.length / historyPageSize))

  const paginatedHistory = useMemo(() => {
    const start = (historyPage - 1) * historyPageSize
    return history.slice(start, start + historyPageSize)
  }, [history, historyPage, historyPageSize])

  return (
    <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-between h-full gap-4 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center flex-shrink-0">
            <Article size={18} weight="bold" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 truncate">Attendance History</h3>
        </div>

        <ReusableDateFilter
          value={historyDateFilter}
          onChange={setHistoryDateFilter}
          modes={["date", "month", "year"]}
          title="Attendance History Filter"
        />
      </div>

      <div className="flex-1 w-full">
        <ReusableTable
          columns={historyColumns}
          data={paginatedHistory}
          keyExtractor={(row) => row.id}
          headerBgColor="#F7F6FE"
          headerTextColor="#374151"
          headerRounded="rounded-xl"
          rowHover={true}
          tableClassName="text-xs min-w-[620px]"
          containerClassName="w-full rounded-xl border border-gray-100/60 pb-1"
          maxHeight="285px"
        />
      </div>

      <div className="flex-shrink-0">
        <ReusablePagination
          currentPage={historyPage}
          totalPages={totalHistoryPages}
          onPageChange={setHistoryPage}
          totalItems={history.length}
          pageSize={historyPageSize}
          onPageSizeChange={(newSize) => {
            setHistoryPageSize(newSize)
            setHistoryPage(1)
          }}
          pageSizeOptions={[5, 10, 20]}
          showPageSize={true}
          showTotalInfo={true}
          showJumpToPage={true}
          layout="two-row"
        />
      </div>
    </div>
  )
}

