"use client"

import React, { useState, useMemo } from "react"
import ChairmanRoleFilterBar from "./ChairmanRoleFilterBar"
import ChairmanTeamsFilterBar from "./ChairmanTeamsFilterBar"
import ChairmanMembersTable from "./ChairmanMembersTable"
import {
  CHAIRMAN_ROLE_CATEGORIES,
  MOCK_CHAIRMAN_MEMBERS,
} from "./mockChairmanTeamsData"
import { ChairmanRoleCategoryId } from "./types"

const PAGE_SIZE = 6

export default function ChairmanTeamsManagementView() {
  const [activeCategory, setActiveCategory] =
    useState<ChairmanRoleCategoryId>("managers")
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("All Departments")
  const [location, setLocation] = useState("All Locations")
  const [status, setStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)

  const [appliedFilters, setAppliedFilters] = useState({
    searchQuery: "",
    department: "All Departments",
    location: "All Locations",
    status: "All Status",
  })

  const handleApply = () => {
    setAppliedFilters({
      searchQuery,
      department,
      location,
      status,
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchQuery("")
    setDepartment("All Departments")
    setLocation("All Locations")
    setStatus("All Status")
    setAppliedFilters({
      searchQuery: "",
      department: "All Departments",
      location: "All Locations",
      status: "All Status",
    })
    setCurrentPage(1)
  }

  const handleSelectCategory = (cat: ChairmanRoleCategoryId) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  const filteredMembers = useMemo(() => {
    return MOCK_CHAIRMAN_MEMBERS.filter((member) => {
      if (member.category !== activeCategory) {
        return false
      }
      if (appliedFilters.searchQuery.trim()) {
        const q = appliedFilters.searchQuery.toLowerCase().trim()
        const matchesName = member.name.toLowerCase().includes(q)
        const matchesId = member.employeeId.toLowerCase().includes(q)
        const matchesEmail = member.email.toLowerCase().includes(q)
        if (!matchesName && !matchesId && !matchesEmail) return false
      }
      if (
        appliedFilters.department !== "All Departments" &&
        member.department !== appliedFilters.department
      ) {
        return false
      }
      if (
        appliedFilters.location !== "All Locations" &&
        member.location !== appliedFilters.location
      ) {
        return false
      }
      if (
        appliedFilters.status !== "All Status" &&
        member.status !== appliedFilters.status
      ) {
        return false
      }
      return true
    })
  }, [activeCategory, appliedFilters])

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredMembers.slice(start, start + PAGE_SIZE)
  }, [filteredMembers, currentPage])

  return (
    <div className="flex flex-col gap-4 w-full">
      <ChairmanRoleFilterBar
        categories={CHAIRMAN_ROLE_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <ChairmanTeamsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={department}
        onDepartmentChange={setDepartment}
        selectedLocation={location}
        onLocationChange={setLocation}
        selectedStatus={status}
        onStatusChange={setStatus}
        onReset={handleReset}
        onApply={handleApply}
      />

      <ChairmanMembersTable
        members={paginatedMembers}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        totalItems={filteredMembers.length}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
