"use client"

import React, { useState, useMemo } from "react"
import { Plus, MagnifyingGlass } from "phosphor-react"
import ReusableDropdown from "../../ReusableDropdown"
import ReusablePagination from "../../ReusablePagination"
import HrTeamsStatsCards from "./HrTeamsStatsCards"
import HrTeamsTable from "./HrTeamsTable"
import { HrTeamItem } from "./types"

export interface HrTeamsOverviewProps {
  teams: HrTeamItem[]
  onViewTeam: (team: HrTeamItem) => void
  onEditTeam: (team: HrTeamItem) => void
  onDeleteTeam: (team: HrTeamItem) => void
  onCreateTeam: () => void
}

export default function HrTeamsOverview({
  teams,
  onViewTeam,
  onEditTeam,
  onDeleteTeam,
  onCreateTeam,
}: HrTeamsOverviewProps) {
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchSearch = search.trim() === "" || team.name.toLowerCase().includes(search.toLowerCase())
      const matchDept = deptFilter === "all" || team.department === deptFilter
      const matchProj = projectFilter === "all" || team.project === projectFilter
      const matchStatus = statusFilter === "all" || team.status.toLowerCase() === statusFilter.toLowerCase()
      return matchSearch && matchDept && matchProj && matchStatus
    })
  }, [teams, search, deptFilter, projectFilter, statusFilter])

  const totalPages = Math.ceil(filteredTeams.length / pageSize) || 1
  const paginatedTeams = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredTeams.slice(start, start + pageSize)
  }, [filteredTeams, page, pageSize])

  const handleClearFilters = () => {
    setSearch("")
    setDeptFilter("all")
    setProjectFilter("all")
    setStatusFilter("all")
    setPage(1)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <HrTeamsStatsCards teams={teams} />

      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">Teams List</h2>
            <p className="text-xs text-gray-500 mt-0.5">View and manage all teams across departments, managers and projects.</p>
          </div>
          <button
            type="button"
            onClick={onCreateTeam}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B50EC] hover:bg-[#4a40d4] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Plus size={14} weight="bold" />
            <span>Create Team</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search team name..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-xs focus:outline-hidden focus:border-[#5B50EC] focus:ring-1 focus:ring-[#5B50EC]"
            />
          </div>
          <ReusableDropdown
            value={deptFilter}
            options={[
              { label: "Department / Function", value: "all" },
              { label: "Technology", value: "Technology" },
              { label: "Product", value: "Product" },
              { label: "Finance", value: "Finance" },
              { label: "Human Resources", value: "Human Resources" },
              { label: "Operations", value: "Operations" },
            ]}
            onChange={(val) => { setDeptFilter(String(val)); setPage(1) }}
          />
          <ReusableDropdown
            value={projectFilter}
            options={[
              { label: "Project", value: "all" },
              { label: "GK Gym Life", value: "GK Gym Life" },
              { label: "Tekton", value: "Tekton" },
              { label: "HRMS", value: "HRMS" },
              { label: "Finance Suite", value: "Finance Suite" },
              { label: "Operations", value: "Operations" },
            ]}
            onChange={(val) => { setProjectFilter(String(val)); setPage(1) }}
          />
          <ReusableDropdown
            value={statusFilter}
            options={[
              { label: "Status", value: "all" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            onChange={(val) => { setStatusFilter(String(val)); setPage(1) }}
          />
          {(search || deptFilter !== "all" || projectFilter !== "all" || statusFilter !== "all") && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-[#5B50EC] hover:underline cursor-pointer ml-auto"
            >
              Clear All
            </button>
          )}
        </div>

        <HrTeamsTable
          teams={paginatedTeams}
          page={page}
          pageSize={pageSize}
          onViewTeam={onViewTeam}
          onEditTeam={onEditTeam}
          onDeleteTeam={onDeleteTeam}
        />

        <ReusablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredTeams.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1) }}
        />
      </div>
    </div>
  )
}
