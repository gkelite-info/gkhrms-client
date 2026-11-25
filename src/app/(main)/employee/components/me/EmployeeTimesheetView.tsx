"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { CalendarBlank } from "phosphor-react"
import { ReusableTable, ReusablePagination, TableColumn } from "@/../reusableComponents"

interface TimesheetRecord {
  date: string
  taskSummary: string
  pending: string
  comment: string
}

const timesheetData: TimesheetRecord[] = [
  {
    date: "22 Aug 2025",
    taskSummary: "Created wireframes for HRMS",
    pending: "Review from manager",
    comment: "Shared in Figma link",
  },
  {
    date: "21 Aug 2025",
    taskSummary: "Designed dashboard UI",
    pending: "Need stakeholder feedback",
    comment: "Uploaded latest vers....",
  },
  {
    date: "20 Aug 2025",
    taskSummary: "Conducted user testing (mock)",
    pending: "Report preparation pending",
    comment: "Collected initial feed...",
  },
  {
    date: "19 Aug 2025",
    taskSummary: "Updated style guide",
    pending: "Color palette finalization",
    comment: "Waiting for brand tea...",
  },
  {
    date: "18 Aug 2025",
    taskSummary: "Timesheet update",
    pending: "None",
    comment: "Submitted before EOD",
  },
  {
    date: "17 Aug 2025",
    taskSummary: "Created wireframes for HRMS",
    pending: "Review from manager",
    comment: "Shared in Figma link",
  },
  {
    date: "16 Aug 2025",
    taskSummary: "Designed dashboard UI",
    pending: "Need stakeholder feedback",
    comment: "Uploaded latest vers....",
  },
  {
    date: "15 Aug 2025",
    taskSummary: "Conducted user testing (mock)",
    pending: "Report preparation pending",
    comment: "Collected initial feed...",
  },
  {
    date: "14 Aug 2025",
    taskSummary: "Updated style guide",
    pending: "Color palette finalization",
    comment: "Waiting for brand tea...",
  },
  {
    date: "12 Aug 2025",
    taskSummary: "Timesheet update",
    pending: "None",
    comment: "Submitted before EOD",
  },
  {
    date: "11 Aug 2025",
    taskSummary: "Updated style guide",
    pending: "Color palette finalization",
    comment: "Waiting for brand tea...",
  },
  {
    date: "10 Aug 2025",
    taskSummary: "Timesheet update",
    pending: "None",
    comment: "Submitted before EOD",
  },
]

const columns: TableColumn<TimesheetRecord>[] = [
  {
    key: "date",
    header: "Date",
    accessor: "date",
    className: "text-gray-700 font-medium py-3 px-3 sm:px-4 whitespace-nowrap",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
  {
    key: "taskSummary",
    header: "Task Summary",
    accessor: "taskSummary",
    className: "text-gray-700 font-medium py-3 px-3 sm:px-4",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
  {
    key: "pending",
    header: "Pending",
    accessor: "pending",
    className: "text-gray-700 font-medium py-3 px-3 sm:px-4 whitespace-nowrap",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
  {
    key: "comment",
    header: "Comment",
    accessor: "comment",
    className: "text-gray-700 font-medium py-3 px-3 sm:px-4",
    headerClassName: "py-2.5 px-3 sm:px-4",
  },
]

function EmployeeTimesheetViewContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageParam = parseInt(searchParams?.get("page") || searchParams?.get("tsPage") || "1", 10)
  const initialPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    if (!isNaN(pageParam) && pageParam >= 1) {
      setCurrentPage(pageParam)
    }
  }, [pageParam])

  const totalPages = Math.ceil(timesheetData.length / pageSize)
  const paginatedData = timesheetData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("page", String(page))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-full flex flex-col gap-3.5 sm:gap-4 md:gap-5">
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[96px] sm:min-h-[105px]">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-gray-500">Name</span>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight truncate">Alexander</h4>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 block">Employee ID</span>
              <span className="text-[11px] sm:text-xs font-medium text-gray-700">0903672</span>
            </div>
            <div>
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 block">Manager</span>
              <span className="text-[11px] sm:text-xs font-medium text-gray-700 truncate">John Doe</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[96px] sm:min-h-[105px]">
          <h3 className="text-xs sm:text-base font-bold text-[#1F2937] truncate">Project Name</h3>
          <p className="text-xs md:text-sm font-medium text-gray-600 mt-2 truncate">Lorem Ipsum</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[96px] sm:min-h-[105px]">
          <h3 className="text-xs sm:text-base font-bold text-[#1F2937] truncate">Date & Time</h3>
          <div className="flex flex-col gap-0.5 mt-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-gray-800">
              Date : <span className="font-normal text-gray-600">09/09/2025</span>
            </span>
            <span className="font-semibold text-gray-800">
              Time: <span className="font-normal text-gray-600">10:30 AM</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 flex items-center justify-between min-h-[96px] sm:min-h-[105px]">
          <div className="flex flex-col justify-between h-full min-w-0 pr-1">
            <h3 className="text-xs sm:text-base font-bold text-[#1F2937] truncate">Timesheets</h3>
            <div className="flex flex-col text-[10px] sm:text-[11px] text-gray-600 mt-1 leading-tight">
              <span className="truncate">Start: 18 Aug 2025</span>
              <span className="text-gray-400 pl-2 py-0.5">To</span>
              <span className="truncate">End: 24 Aug 2025</span>
            </div>
          </div>
          <div className="shrink-0 text-[#1F2937] ml-2">
            <CalendarBlank size={26} weight="regular" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 overflow-hidden">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <ReusableTable<TimesheetRecord>
            columns={columns}
            data={paginatedData}
            headerBgColor="#EAE8E4"
            headerTextColor="#1F2937"
            headerRounded="rounded-xl"
          />
        </div>

        <div className="pt-3 border-t border-gray-100 mt-3 overflow-x-auto">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={timesheetData.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize)
              handlePageChange(1)
            }}
            pageSizeOptions={[5, 10, 15]}
          />
        </div>
      </div>
    </div>
  )
}

export default function EmployeeTimesheetView() {
  return (
    <Suspense fallback={null}>
      <EmployeeTimesheetViewContent />
    </Suspense>
  )
}
