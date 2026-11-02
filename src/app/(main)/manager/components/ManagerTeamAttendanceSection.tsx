"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Users, UsersThree } from "phosphor-react"
import ManagerTLWiseAttendanceSection from "./ManagerTLWiseAttendanceSection"
import { DateFilterValue } from "@/components/reusableComponents"
import {
  MANAGER_TEAM_LEADS,
  MANAGER_TEAM_MEMBERS,
} from "../data/managerAttendanceData"
import { getDefaultDateFilterValue } from "../../teamlead/data/dateFilterUtils"
import ManagerAttendanceStatsGrid from "./team-attendance/ManagerAttendanceStatsGrid"
import ManagerTeamLeadsScroll from "./team-attendance/ManagerTeamLeadsScroll"
import ManagerTeamMembersTable from "./team-attendance/ManagerTeamMembersTable"

export default function ManagerTeamAttendanceSection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab")
  const subtabParam = searchParams.get("subtab")
  const activeSubtab =
    tabParam === "tl-wise-attendance" || subtabParam === "tl-wise" || subtabParam === "tl-wise-attendance"
      ? "tl-wise"
      : "team-attendance"

  const handleSubtabChange = (subtab: "team-attendance" | "tl-wise") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "team-attendance")
    params.set("subtab", subtab)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [selectedLeadId, setSelectedLeadId] = useState<string>("TL-001")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [shiftFilter, setShiftFilter] = useState("All Shifts")
  const [dateFilter, setDateFilter] = useState<DateFilterValue>(getDefaultDateFilterValue)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const selectedLead = useMemo(() => {
    return (
      MANAGER_TEAM_LEADS.find((tl) => tl.id === selectedLeadId) ||
      MANAGER_TEAM_LEADS[0]
    )
  }, [selectedLeadId])

  const totalMembersCount = useMemo(
    () => MANAGER_TEAM_LEADS.reduce((acc, tl) => acc + tl.membersCount, 0),
    []
  )
  const totalPresent = useMemo(
    () => MANAGER_TEAM_LEADS.reduce((acc, tl) => acc + tl.present, 0),
    []
  )
  const totalAbsent = useMemo(
    () => MANAGER_TEAM_LEADS.reduce((acc, tl) => acc + tl.absent, 0),
    []
  )
  const totalLeave = useMemo(
    () => MANAGER_TEAM_LEADS.reduce((acc, tl) => acc + tl.leave, 0),
    []
  )
  const totalWfh = useMemo(
    () => MANAGER_TEAM_LEADS.reduce((acc, tl) => acc + tl.wfh, 0),
    []
  )

  const presentPercentage = Math.round((totalPresent / totalMembersCount) * 100)
  const absentPercentage = Math.round((totalAbsent / totalMembersCount) * 100)
  const leavePercentage = Math.round((totalLeave / totalMembersCount) * 100)
  const wfhPercentage = Math.round((totalWfh / totalMembersCount) * 100)

  const teamMembers = useMemo(() => {
    const list = MANAGER_TEAM_MEMBERS.filter(
      (m) => m.teamLeadId === selectedLeadId
    )
    return list.length > 0 ? list : MANAGER_TEAM_MEMBERS
  }, [selectedLeadId])

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const match =
          item.name.toLowerCase().includes(query) ||
          item.employeeId.toLowerCase().includes(query) ||
          item.designation.toLowerCase().includes(query)
        if (!match) return false
      }
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false
      }
      if (
        shiftFilter !== "All Shifts" &&
        !item.shift.toLowerCase().includes(shiftFilter.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [teamMembers, searchQuery, statusFilter, shiftFilter])

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize))
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredMembers.slice(start, start + pageSize)
  }, [filteredMembers, currentPage, pageSize])

  const handleResetFilters = () => {
    setSearchQuery("")
    setStatusFilter("All")
    setShiftFilter("All Shifts")
    setDateFilter(getDefaultDateFilterValue())
    setCurrentPage(1)
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 min-w-0">
      <div className="w-full border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 min-w-max pb-0.5">
          <button
            type="button"
            onClick={() => handleSubtabChange("team-attendance")}
            className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
              activeSubtab === "team-attendance"
                ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Users
              size={16}
              weight={activeSubtab === "team-attendance" ? "fill" : "bold"}
              className={activeSubtab === "team-attendance" ? "text-[#5B50EC]" : "text-gray-400"}
            />
            <span>Team Attendance</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSubtab === "team-attendance"
                  ? "bg-[#EEF2FF] text-[#5B50EC]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {totalMembersCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSubtabChange("tl-wise")}
            className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] ${
              activeSubtab === "tl-wise"
                ? "border-[#5B50EC] text-[#5B50EC] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <UsersThree
              size={16}
              weight={activeSubtab === "tl-wise" ? "fill" : "bold"}
              className={activeSubtab === "tl-wise" ? "text-[#5B50EC]" : "text-gray-400"}
            />
            <span>TL-wise Attendance</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSubtab === "tl-wise"
                  ? "bg-[#EEF2FF] text-[#5B50EC]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {MANAGER_TEAM_LEADS.length}
            </span>
          </button>
        </div>
      </div>

      {activeSubtab === "tl-wise" ? (
        <ManagerTLWiseAttendanceSection />
      ) : (
        <>
          <ManagerAttendanceStatsGrid
        totalMembersCount={totalMembersCount}
        totalPresent={totalPresent}
        totalAbsent={totalAbsent}
        totalLeave={totalLeave}
        totalWfh={totalWfh}
        presentPercentage={presentPercentage}
        absentPercentage={absentPercentage}
        leavePercentage={leavePercentage}
        wfhPercentage={wfhPercentage}
      />

      <ManagerTeamLeadsScroll
        leads={MANAGER_TEAM_LEADS}
        selectedLeadId={selectedLeadId}
        onSelectLead={(id) => {
          setSelectedLeadId(id)
          setCurrentPage(1)
        }}
      />

      <ManagerTeamMembersTable
        selectedLead={selectedLead}
        members={paginatedMembers}
        totalItems={filteredMembers.length}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q)
          setCurrentPage(1)
        }}
        statusFilter={statusFilter}
        onStatusChange={(s) => {
          setStatusFilter(s)
          setCurrentPage(1)
        }}
        shiftFilter={shiftFilter}
        onShiftChange={(sh) => {
          setShiftFilter(sh)
          setCurrentPage(1)
        }}
        dateFilter={dateFilter}
        onDateChange={(df) => {
          setDateFilter(df)
          setCurrentPage(1)
        }}
        onResetFilters={handleResetFilters}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
      />
        </>
      )}
    </div>
  )
}
