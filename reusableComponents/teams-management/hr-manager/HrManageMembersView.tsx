"use client"

import { useState, useMemo } from "react"
import { MagnifyingGlass, Plus } from "phosphor-react"
import ReusableDropdown from "../../ReusableDropdown"
import HrMemberActionsPanel from "./HrMemberActionsPanel"
import HrTeamSummaryCard from "./HrTeamSummaryCard"
import HrManageMembersTable from "./HrManageMembersTable"
import { HrTeamItem, HrTeamMember } from "./types"

interface HrManageMembersViewProps {
  team: HrTeamItem
  members: HrTeamMember[]
  onBack: () => void
  onAddMember: (employeeName: string, role: string) => void
  onUpdateLeadership: (teamLead: string, asstManager: string) => void
  onReassignMember: (memberId: string, targetTeam: string) => void
  onRemoveMember: (member: HrTeamMember) => void
}

export default function HrManageMembersView({
  team,
  members,
  onBack,
  onAddMember,
  onUpdateLeadership,
  onReassignMember,
  onRemoveMember,
}: HrManageMembersViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [deptFilter, setDeptFilter] = useState("All")
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
      const matchRole = roleFilter === "All" || m.teamRole.toLowerCase() === roleFilter.toLowerCase()
      const matchStatus = statusFilter === "All" || m.status === statusFilter
      const matchDept = deptFilter === "All" || m.department === deptFilter
      return matchSearch && matchRole && matchStatus && matchDept
    })
  }, [members, searchQuery, roleFilter, statusFilter, deptFilter])

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredMembers.slice(start, start + pageSize)
  }, [filteredMembers, currentPage])

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 select-none">
      <HrTeamSummaryCard team={team} membersCount={members.length} onBack={onBack} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100/90 shadow-xs p-4 sm:p-6 flex flex-col gap-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">Team Members ({members.length})</h3>
              <p className="text-xs text-gray-500 mt-0.5">View, manage, and take actions on all members in {team.name}.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const inputEl = document.querySelector('input[placeholder*="Search employee"]') as HTMLInputElement
                inputEl?.focus()
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus size={14} weight="bold" />
              <span>Add Member</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="relative flex-1 min-w-[180px]">
              <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search by name or employee ID..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 text-xs outline-none focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC]"
              />
            </div>
            <ReusableDropdown
              value={roleFilter}
              options={[
                { label: "Role", value: "All" },
                { label: "Product Manager", value: "Product Manager" },
                { label: "Backend Developer", value: "Backend Developer" },
                { label: "Frontend Developer", value: "Frontend Developer" },
                { label: "Team Lead", value: "Team Lead" },
                { label: "Senior Member", value: "Senior Member" },
                { label: "Member", value: "Member" },
              ]}
              onChange={(val) => { setRoleFilter(String(val)); setCurrentPage(1) }}
              buttonClassName="bg-white border border-gray-200 !py-2 text-xs"
            />
            <ReusableDropdown
              value={statusFilter}
              options={[
                { label: "Status", value: "All" },
                { label: "Active", value: "Active" },
                { label: "On Leave", value: "On Leave" },
              ]}
              onChange={(val) => { setStatusFilter(String(val)); setCurrentPage(1) }}
              buttonClassName="bg-white border border-gray-200 !py-2 text-xs"
            />
            <ReusableDropdown
              value={deptFilter}
              options={[
                { label: "Department", value: "All" },
                { label: "Product & Engineering", value: "Product & Engineering" },
                { label: "Technology", value: "Technology" },
                { label: "Operations", value: "Operations" },
              ]}
              onChange={(val) => { setDeptFilter(String(val)); setCurrentPage(1) }}
              buttonClassName="bg-white border border-gray-200 !py-2 text-xs"
            />
          </div>

          <HrManageMembersTable
            members={paginatedMembers}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={Math.ceil(filteredMembers.length / pageSize)}
            totalItems={filteredMembers.length}
            onPageChange={setCurrentPage}
            onSelectMember={setSelectedMemberId}
            onRemoveMember={onRemoveMember}
          />
        </div>

        <div className="lg:col-span-1 min-w-0">
          <HrMemberActionsPanel
            members={members}
            selectedMemberId={selectedMemberId}
            onAddMember={onAddMember}
            onUpdateLeadership={onUpdateLeadership}
            onReassignMember={onReassignMember}
          />
        </div>
      </div>
    </div>
  )
}
