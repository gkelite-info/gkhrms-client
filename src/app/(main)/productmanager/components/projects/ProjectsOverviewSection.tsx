"use client"

import React, { useState, useMemo } from "react"
import {
  DateFilterValue,
  ReusablePagination,
} from "@/components/reusableComponents"
import {
  INITIAL_PROJECTS_DATA,
  PROJECTS_OVERALL_STATS,
} from "../../data/projectsAttendanceData"
import ProjectAttendanceStats from "./ProjectAttendanceStats"
import ProjectAttendanceFilters from "./ProjectAttendanceFilters"
import ProjectAttendanceCard from "./ProjectAttendanceCard"

interface ProjectsOverviewSectionProps {
  onSelectProject: (projectId: string) => void
}

export default function ProjectsOverviewSection({
  onSelectProject,
}: ProjectsOverviewSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedDate, setSelectedDate] = useState<DateFilterValue>(
    new Date(2025, 7, 26)
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)

  const filteredProjects = useMemo(() => {
    return INITIAL_PROJECTS_DATA.filter((project) => {
      if (statusFilter !== "All" && project.status !== statusFilter) {
        return false
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = project.name.toLowerCase().includes(query)
        const matchManager = project.manager.name.toLowerCase().includes(query)
        if (!matchName && !matchManager) return false
      }

      return true
    })
  }, [searchQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize))

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProjects.slice(start, start + pageSize)
  }, [filteredProjects, currentPage, pageSize])

  const handleSearchChange = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }

  const handleStatusChange = (s: string) => {
    setStatusFilter(s)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <ProjectAttendanceStats stats={PROJECTS_OVERALL_STATS} />

      <ProjectAttendanceFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl py-12 flex flex-col items-center justify-center text-center text-gray-400 border border-gray-100 shadow-xs">
          <span className="text-sm font-semibold text-gray-600">
            No projects found
          </span>
          <span className="text-xs mt-1">
            Try adjusting your search query or status filter.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
          {paginatedProjects.map((project) => (
            <ProjectAttendanceCard
              key={project.id}
              project={project}
              onView={onSelectProject}
            />
          ))}
        </div>
      )}

      <div className="w-full">
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredProjects.length}
          pageSize={pageSize}
          onPageSizeChange={(sz) => {
            setPageSize(sz)
            setCurrentPage(1)
          }}
          pageSizeOptions={[6, 9, 12, 18]}
          showJumpToPage={true}
          showPageSize={true}
          showTotalInfo={true}
        />
      </div>
    </div>
  )
}
