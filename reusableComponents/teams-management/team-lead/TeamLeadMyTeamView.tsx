"use client"

import React, { useState, useMemo, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  UsersThree,
  User,
  ClipboardText,
  CalendarBlank,
  House,
  MagnifyingGlass,
  Eye,
} from "phosphor-react"
import ReusableTable, { TableColumn } from "@/components/reusableComponents/ReusableTable"
import ReusablePagination from "../../ReusablePagination"
import { initialTeamLeadMembers, initialTeamLeadSummary } from "./mockTeamLeadData"
import { TeamLeadMemberItem, TeamLeadSummaryStats } from "./types"
import TeamLeadEmployeeDetailsModal from "./TeamLeadEmployeeDetailsModal"
import TeamLeadTeamTreeView from "./TeamLeadTeamTreeView"
import ProductManagerTeamChatView from "../product-manager/ProductManagerTeamChatView"

type TeamLeadSubTab = "my-team" | "team-tree" | "chat"

export default function TeamLeadMyTeamView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab")
  const activeSubTab: TeamLeadSubTab =
    tabParam === "team-tree" || tabParam === "chat" ? tabParam : "my-team"

  const [summary] = useState<TeamLeadSummaryStats>(initialTeamLeadSummary)
  const [members] = useState<TeamLeadMemberItem[]>(initialTeamLeadMembers)
  const [searchQuery, setSearchQuery] = useState("")

  const memberIdParam = searchParams.get("member")
  const selectedMember = useMemo(() => {
    if (!memberIdParam) return null
    return (
      members.find(
        (m) =>
          m.id === memberIdParam ||
          m.employeeId.toLowerCase() === memberIdParam.toLowerCase()
      ) || null
    )
  }, [members, memberIdParam])

  const pageParam = searchParams.get("page")
  const currentPage = useMemo(() => {
    const p = parseInt(pageParam || "1", 10)
    return isNaN(p) || p < 1 ? 1 : p
  }, [pageParam])

  const [pageSize, setPageSize] = useState(5)

  const updateQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === "") {
          params.delete(k)
        } else {
          params.set(k, v)
        }
      })
      const qs = params.toString()
      router.push(`${pathname}${qs ? `?${qs}` : ""}`)
    },
    [router, pathname, searchParams]
  )

  const handleTabChange = (newTab: TeamLeadSubTab) => {
    updateQuery({
      tab: newTab === "my-team" ? null : newTab,
      member: null,
      page: null,
    })
  }

  const handleSelectMember = (member: TeamLeadMemberItem | null) => {
    updateQuery({
      member: member ? member.employeeId : null,
    })
  }

  const handlePageChange = (newPage: number) => {
    updateQuery({
      page: newPage === 1 ? null : String(newPage),
    })
  }

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members
    const q = searchQuery.toLowerCase().trim()
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.employeeId.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        m.reportingTo.toLowerCase().includes(q)
    )
  }, [members, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize))
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredMembers.slice(start, start + pageSize)
  }, [filteredMembers, currentPage, pageSize])

  const columns: TableColumn<TeamLeadMemberItem>[] = [
    {
      header: "EMPLOYEE",
      accessor: "name",
      className: "py-2 px-3",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 ring-1 ring-gray-100 shadow-2xs"
          />
          <span className="font-semibold text-gray-900 text-xs whitespace-nowrap">
            {item.name}
          </span>
        </div>
      ),
    },
    {
      header: "EMPLOYEE ID",
      accessor: "employeeId",
      className: "py-2 px-3 text-xs font-medium text-gray-500 whitespace-nowrap",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
    },
    {
      header: "DESIGNATION",
      accessor: "designation",
      className: "py-2 px-3 text-xs text-gray-600 whitespace-nowrap",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
    },
    {
      header: "ROLE",
      accessor: "role",
      className: "py-2 px-3 whitespace-nowrap",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
      render: (item) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold inline-block ${
            item.role === "Team Lead"
              ? "bg-[#EEF2FF] text-[#5046E5]"
              : "bg-[#F3F4F6] text-[#6366F1]"
          }`}
        >
          {item.role}
        </span>
      ),
    },
    {
      header: "DEPARTMENT",
      accessor: "department",
      className: "py-2 px-3 text-xs text-gray-600 whitespace-nowrap",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
    },
    {
      header: "REPORTING TO",
      accessor: "reportingTo",
      className: "py-2 px-3 text-xs text-gray-600 whitespace-nowrap",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
    },
    {
      header: "STATUS",
      accessor: "status",
      className: "py-2 px-3 whitespace-nowrap",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase",
      render: (item) => {
        let badgeColor = "bg-emerald-50 text-emerald-600 border border-emerald-100"
        let dotColor = "bg-emerald-500"
        if (item.status === "On Leave") {
          badgeColor = "bg-amber-50 text-amber-600 border border-amber-100"
          dotColor = "bg-amber-500"
        } else if (item.status === "WFH") {
          badgeColor = "bg-indigo-50 text-indigo-600 border border-indigo-100"
          dotColor = "bg-indigo-500"
        }

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badgeColor}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {item.status}
          </span>
        )
      },
    },
    {
      header: "VIEW",
      align: "center",
      className: "py-2 px-3 whitespace-nowrap text-center",
      headerClassName: "py-2.5 px-3 text-[11px] font-semibold tracking-wider text-gray-500 uppercase text-center",
      render: (item) => (
        <button
          type="button"
          onClick={() => handleSelectMember(item)}
          className="w-7 h-7 rounded-lg bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5046E5] flex items-center justify-center transition-colors cursor-pointer mx-auto shadow-2xs"
          title="View Details"
        >
          <Eye size={15} weight="regular" />
        </button>
      ),
    },
  ]

  return (
    <div className="w-full flex-1 flex flex-col p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 max-w-[1600px] mx-auto pb-24">
      <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-xs border border-gray-100/80 flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0 shadow-2xs">
          <UsersThree size={20} weight="bold" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            My Team
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
            View your team members and team summary.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-1 shadow-xs border border-gray-100 flex items-center gap-1 w-fit max-w-full overflow-x-auto">
        <button
          type="button"
          onClick={() => handleTabChange("my-team")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === "my-team"
              ? "bg-[#5046E5] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          My Team
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("team-tree")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === "team-tree"
              ? "bg-[#5046E5] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Team Tree
        </button>
        <button
          type="button"
          onClick={() => handleTabChange("chat")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === "chat"
              ? "bg-[#5046E5] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          Chat
        </button>
      </div>

      {activeSubTab === "my-team" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <UsersThree size={13} className="text-[#5046E5]" weight="bold" />
                <span className="text-[10px] font-medium truncate">Team Name</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate mt-1.5">
                {summary.teamName}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <User size={13} className="text-[#5046E5]" weight="bold" />
                <span className="text-[10px] font-medium truncate">Manager</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate mt-1.5">
                {summary.manager}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <UsersThree size={13} className="text-[#5046E5]" weight="bold" />
                <span className="text-[10px] font-medium truncate">Assistant Manage</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate mt-1.5">
                {summary.assistantManager}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <UsersThree size={13} className="text-[#5046E5]" weight="bold" />
                <span className="text-[10px] font-medium truncate">Total Members</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1.5">
                {summary.totalMembers}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-emerald-600">
                <ClipboardText size={13} weight="bold" />
                <span className="text-[10px] font-medium text-gray-500 truncate">
                  Present Today
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1.5">
                {summary.presentToday}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                <CalendarBlank size={13} weight="bold" />
                <span className="text-[10px] font-medium text-gray-500 truncate">
                  On Leave
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1.5">
                {summary.onLeave}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2.5 sm:p-3 shadow-xs border border-gray-100/80 flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1 text-indigo-500">
                <House size={13} weight="bold" />
                <span className="text-[10px] font-medium text-gray-500 truncate">
                  Work From Home
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 mt-1.5">
                {summary.workFromHome}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-gray-100/80 overflow-hidden flex flex-col">
            <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-b border-gray-100/80">
              <h2 className="text-sm font-bold text-gray-900">
                Team Members ({filteredMembers.length})
              </h2>
              <div className="relative w-full sm:w-64">
                <MagnifyingGlass
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handlePageChange(1)
                  }}
                  placeholder="Search team members..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-gray-50/70 border border-gray-200/80 focus:bg-white focus:border-[#5046E5] focus:ring-1 focus:ring-[#5046E5] outline-hidden transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="p-2 sm:p-3 space-y-3">
              <ReusableTable
                columns={columns}
                data={paginatedMembers}
                headerBgColor="#F8F9FA"
                headerTextColor="#4B5563"
                headerRounded="rounded-lg"
                rowHover={true}
                emptyMessage="No team members found."
                keyExtractor={(item) => item.id}
              />

              <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredMembers.length}
                pageSize={pageSize}
                onPageSizeChange={(size) => {
                  setPageSize(size)
                  handlePageChange(1)
                }}
                pageSizeOptions={[5, 10, 20]}
                itemLabel="members"
                showJumpToPage={false}
              />
            </div>
          </div>
        </>
      )}

      {activeSubTab === "team-tree" && <TeamLeadTeamTreeView />}

      {activeSubTab === "chat" && <ProductManagerTeamChatView />}

      <TeamLeadEmployeeDetailsModal
        member={selectedMember}
        teamName={summary.teamName}
        onClose={() => handleSelectMember(null)}
      />
    </div>
  )
}
