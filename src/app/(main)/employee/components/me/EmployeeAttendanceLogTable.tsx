"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ReusableTable, ReusablePagination, TableColumn } from "@/../reusableComponents"

interface LogRecord {
  sNo: string
  date: string
  name: string
  statusDot: "green" | "orange" | "red"
  email: string
  empId: string
  dept: string
  attendance: string
  effective: string
  gross: string
  checkIn: string
  checkOut: string
  mood: string
}

const mockData: LogRecord[] = [
  { sNo: "01", date: "09/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UI Designer", attendance: "89%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😊" },
  { sNo: "02", date: "08/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "80%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😃" },
  { sNo: "03", date: "07/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "75%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "🤩" },
  { sNo: "04", date: "06/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UI Designer", attendance: "89%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😊" },
  { sNo: "05", date: "05/09/2025", name: "Stanly", statusDot: "orange", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "80%", effective: "0h 0min", gross: "0h 0min", checkIn: "-", checkOut: "-", mood: "-" },
  { sNo: "06", date: "04/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "75%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😐" },
  { sNo: "07", date: "03/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UI Designer", attendance: "89%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😃" },
  { sNo: "08", date: "02/09/2025", name: "Stanly", statusDot: "orange", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "80%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😐" },
  { sNo: "09", date: "01/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "75%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😊" },
  { sNo: "10", date: "30/08/2025", name: "Stanly", statusDot: "red", email: "stanly@", empId: "1234", dept: "UI Designer", attendance: "89%", effective: "0h 0min", gross: "0h 0min", checkIn: "-", checkOut: "-", mood: "-" },
  { sNo: "11", date: "29/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "80%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😐" },
  { sNo: "12", date: "28/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "75%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😃" },
  { sNo: "13", date: "27/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UI Designer", attendance: "89%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😊" },
  { sNo: "14", date: "26/09/2025", name: "Stanly", statusDot: "orange", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "80%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😐" },
  { sNo: "15", date: "25/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "75%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "🤩" },
  { sNo: "16", date: "24/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UI Designer", attendance: "89%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😃" },
  { sNo: "17", date: "23/09/2025", name: "Stanly", statusDot: "orange", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "80%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "😐" },
  { sNo: "18", date: "22/09/2025", name: "Stanly", statusDot: "green", email: "stanly@", empId: "1234", dept: "UX Designer", attendance: "75%", effective: "6h 0min", gross: "8h 0min", checkIn: "9:00 PM", checkOut: "6:00 PM", mood: "🤩" },
]

const filterTabs = [
  { key: "30days", label: "30 DAYS" },
  { key: "jun", label: "JUN" },
  { key: "may", label: "MAY" },
  { key: "apr", label: "APR" },
  { key: "mar", label: "MAR" },
  { key: "feb", label: "FEB" },
  { key: "jan", label: "JAN" },
]

function EmployeeAttendanceLogTableContent() {
  const searchParams = useSearchParams()
  const filterFromQuery = searchParams?.get("filter") || searchParams?.get("logFilter") || "30days"
  const [activeFilter, setActiveFilter] = useState(filterFromQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)

  useEffect(() => {
    if (filterFromQuery && filterTabs.some((t) => t.key === filterFromQuery)) {
      setActiveFilter(filterFromQuery)
    }
  }, [filterFromQuery])

  const getDotClass = (dot: "green" | "orange" | "red") => {
    switch (dot) {
      case "green":
        return "bg-[#10B981]"
      case "orange":
        return "bg-[#F59E0B]"
      case "red":
        return "bg-[#EF4444]"
      default:
        return "bg-gray-400"
    }
  }

  const columns: TableColumn<LogRecord>[] = [
    {
      key: "sNo",
      header: "S.No",
      accessor: "sNo",
      className: "py-3 px-3 text-gray-400 font-medium text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "date",
      header: "Date",
      accessor: "date",
      className: "py-3 px-3 text-gray-700 font-medium text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div className="flex items-center gap-1.5 font-semibold text-gray-800 whitespace-nowrap">
          <span>{row.name}</span>
          <span className={`h-2 w-2 rounded-full ${getDotClass(row.statusDot)}`} />
        </div>
      ),
      className: "py-3 px-3 text-xs",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "email",
      header: "Email",
      accessor: "email",
      className: "py-3 px-3 text-gray-500 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "empId",
      header: "Employee ID",
      accessor: "empId",
      className: "py-3 px-3 text-gray-600 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "dept",
      header: "Department",
      accessor: "dept",
      className: "py-3 px-3 text-gray-600 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "attendance",
      header: "Attendance %",
      accessor: "attendance",
      className: "py-3 px-3 font-semibold text-gray-800 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "effective",
      header: "Effective Hours",
      accessor: "effective",
      className: "py-3 px-3 text-gray-700 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "gross",
      header: "Gross Hours",
      accessor: "gross",
      className: "py-3 px-3 text-gray-700 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "checkIn",
      header: "Check-in",
      accessor: "checkIn",
      className: "py-3 px-3 text-gray-600 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "checkOut",
      header: "Check-Out",
      accessor: "checkOut",
      className: "py-3 px-3 text-gray-600 text-xs whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs whitespace-nowrap",
    },
    {
      key: "mood",
      header: "Mood",
      accessor: "mood",
      align: "center",
      className: "py-3 px-3 text-center text-sm whitespace-nowrap",
      headerClassName: "py-3 px-3 text-gray-500 font-semibold text-xs text-center whitespace-nowrap",
    },
  ]

  const totalPages = Math.ceil(mockData.length / pageSize)
  const paginatedData = mockData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleFilterChange = (key: string) => {
    setActiveFilter(key)
    setCurrentPage(1)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("filter", key)
      window.history.pushState(null, "", url.toString())
    }
  }

  return (
    <div className="w-full max-w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 sm:p-5 mt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#1F2937]">Attendance Log</h3>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-0.5">Last 30 Days</p>
        </div>

        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleFilterChange(tab.key)}
                className={`text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#7D73E3] text-white shadow-sm"
                    : "bg-[#E1DFFB] text-[#323232] hover:bg-[#d5d2fa]"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full max-w-full overflow-hidden rounded-xl border border-gray-100">
        <ReusableTable<LogRecord>
          columns={columns}
          data={paginatedData}
          headerBgColor="#F9FAFB"
          headerTextColor="#6B7280"
          headerRounded="rounded-none"
          rowHover={true}
          tableClassName="w-full text-left"
          keyExtractor={(row) => row.sNo}
        />
      </div>

      <div className="pt-3 border-t border-gray-100 mt-3 overflow-x-auto">
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={mockData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize)
            setCurrentPage(1)
          }}
          pageSizeOptions={[6, 12, 18]}
        />
      </div>
    </div>
  )
}

export default function EmployeeAttendanceLogTable() {
  return (
    <Suspense fallback={null}>
      <EmployeeAttendanceLogTableContent />
    </Suspense>
  )
}
