"use client"

import { useState, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  ReusableTable,
  ReusablePagination,
  DateFilterValue,
} from "@/components/reusableComponents"
import {
  mockTeamMembers,
  TeamMemberAttendance,
} from "../data/teamAttendanceData"
import TeamAttendanceStats from "./TeamAttendanceStats"
import TeamAttendanceFilters from "./TeamAttendanceFilters"
import { getTeamAttendanceColumns } from "./teamAttendanceColumns"
import { getDefaultDateFilterValue } from "../data/dateFilterUtils"

export default function TeamAttendanceSection() {
  const router = useRouter()
  const pathname = usePathname()
  const isEmployee = pathname?.startsWith("/employee")
  const memberBasePath = isEmployee ? "/employee/member" : "/teamlead/member"

  const [data] = useState<TeamMemberAttendance[]>(mockTeamMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [dateFilter, setDateFilter] = useState<DateFilterValue>(
    getDefaultDateFilterValue
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const handleResetFilters = () => {
    setSearchQuery("")
    setDepartmentFilter("All Departments")
    setStatusFilter("All Statuses")
    setDateFilter(getDefaultDateFilterValue())
    setCurrentPage(1)
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesId = item.employeeId.toLowerCase().includes(query)
        const matchesDesignation = item.designation.toLowerCase().includes(query)
        if (!matchesName && !matchesId && !matchesDesignation) return false
      }
      if (
        departmentFilter !== "All Departments" &&
        item.department !== departmentFilter
      ) {
        return false
      }
      if (statusFilter !== "All Statuses" && item.status !== statusFilter) {
        return false
      }
      return true
    })
  }, [data, searchQuery, departmentFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  const columns = useMemo(
    () =>
      getTeamAttendanceColumns({
        onView: (id) => router.push(`${memberBasePath}/${id}`),
      }),
    [router, memberBasePath]
  )

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 min-w-0">
      <TeamAttendanceStats
        totalCount={data.length}
        presentCount={data.filter((d) => d.status === "Present").length}
        absentCount={data.filter((d) => d.status === "On Leave").length}
        lateCount={data.filter((d) => d.status === "Late").length}
      />

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-4">
        <TeamAttendanceFilters
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q)
            setCurrentPage(1)
          }}
          departmentFilter={departmentFilter}
          onDepartmentChange={(d) => {
            setDepartmentFilter(d)
            setCurrentPage(1)
          }}
          statusFilter={statusFilter}
          onStatusChange={(s) => {
            setStatusFilter(s)
            setCurrentPage(1)
          }}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
          onResetFilters={handleResetFilters}
        />

        <ReusableTable
          columns={columns}
          data={paginatedData}
          keyExtractor={(row) => row.id}
          headerBgColor="#F7F6FE"
          headerTextColor="#374151"
          headerRounded="rounded-xl"
          rowHover={true}
          tableClassName="text-xs min-w-[850px]"
          containerClassName="w-full overflow-x-auto rounded-xl border border-gray-100/60 pb-1"
        />

        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize)
            setCurrentPage(1)
          }}
          pageSizeOptions={[5, 8, 10, 20]}
          showPageSize={true}
          showTotalInfo={true}
        />
      </div>
    </div>
  )
}
