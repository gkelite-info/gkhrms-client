"use client"

import React, { useState, useMemo } from "react"
import ChairmanRoleFilterBar from "./ChairmanRoleFilterBar"
import ChairmanTeamsFilterBar from "./ChairmanTeamsFilterBar"
import ChairmanMembersTable from "./ChairmanMembersTable"
import FinanceTeamOverviewCard from "./FinanceTeamOverviewCard"
import TeamLeadsOverviewCard from "./TeamLeadsOverviewCard"
import EmployeesOverviewCard from "./EmployeesOverviewCard"
import TechAdminsOverviewCard from "./TechAdminsOverviewCard"
import HrTeamOverviewCard from "./HrTeamOverviewCard"
import ProductManagersOverviewCard from "./ProductManagersOverviewCard"
import AccountantsOverviewCard from "./AccountantsOverviewCard"
import ApplyFiltersModal from "./ApplyFiltersModal"
import {
  CHAIRMAN_ROLE_CATEGORIES,
  MOCK_CHAIRMAN_MEMBERS,
} from "./mockChairmanTeamsData"
import { ChairmanRoleCategoryId } from "./types"

interface ChairmanTeamsManagementViewProps {
  defaultCategory?: ChairmanRoleCategoryId
}

const TECH_ADMIN_DEPARTMENT_OPTIONS = [
  "All Departments",
  "IT Infrastructure",
  "Systems & Operations",
  "Network & Security",
  "Platform & Tools",
  "IT Support",
]

const HR_DEPARTMENT_OPTIONS = [
  "All Departments",
  "Human Resources",
  "Talent Acquisition",
  "Employee Relations",
  "HR Operations",
  "Compliance & Policy",
  "Learning & Development",
  "Compensation & Benefits",
  "Employee Engagement",
]

const PRODUCT_MANAGER_DEPARTMENT_OPTIONS = [
  "All Departments",
  "Product - Fitness",
  "Product - Wellness",
  "Product - Gym",
  "Product - Nutrition",
  "Product - Mobile App",
]

export default function ChairmanTeamsManagementView({
  defaultCategory = "managers",
}: ChairmanTeamsManagementViewProps) {
  const [activeCategory, setActiveCategory] =
    useState<ChairmanRoleCategoryId>(defaultCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("All Departments")
  const [location, setLocation] = useState("All Locations")
  const [status, setStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const [appliedFilters, setAppliedFilters] = useState({
    searchQuery: "",
    department: "All Departments",
    location: "All Locations",
    status: "All Status",
  })

  const handleApplyInlineFilters = () => {
    setAppliedFilters({
      searchQuery,
      department,
      location,
      status,
    })
    setCurrentPage(1)
  }

  const handleApplyModalFilters = (filters: {
    searchQuery: string
    department: string
    location: string
    status: string
  }) => {
    setSearchQuery(filters.searchQuery)
    setDepartment(filters.department)
    setLocation(filters.location)
    setStatus(filters.status)
    setAppliedFilters(filters)
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
    setDepartment("All Departments")
    setLocation("All Locations")
    setStatus("All Status")
    setAppliedFilters({
      searchQuery: appliedFilters.searchQuery,
      department: "All Departments",
      location: "All Locations",
      status: "All Status",
    })
    setCurrentPage(1)
  }

  const isFinance = activeCategory === "finance"
  const isTeamLeads = activeCategory === "team_leads"
  const isEmployees = activeCategory === "employees"
  const isTechAdmins = activeCategory === "tech_admins"
  const isHr = activeCategory === "hr"
  const isProductManagers = activeCategory === "product_managers"
  const isAccountants = activeCategory === "accountants"

  const showDepartment =
    !isFinance && !isTeamLeads && !isAccountants

  const pageSize =
    isTeamLeads || isEmployees || isTechAdmins || isHr || isProductManagers ? 5 : 6

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
        showDepartment &&
        appliedFilters.department !== "All Departments" &&
        member.department !== appliedFilters.department
      ) {
        return false
      }
      if (
        appliedFilters.location !== "All Locations" &&
        appliedFilters.location !== "Location" &&
        member.location !== appliedFilters.location
      ) {
        return false
      }
      if (
        appliedFilters.status !== "All Status" &&
        appliedFilters.status !== "Status" &&
        member.status !== appliedFilters.status
      ) {
        return false
      }
      return true
    })
  }, [activeCategory, appliedFilters, showDepartment])

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredMembers.slice(start, start + pageSize)
  }, [filteredMembers, currentPage, pageSize])

  const financeStats = useMemo(() => {
    const finMembers = MOCK_CHAIRMAN_MEMBERS.filter((m) => m.category === "finance")
    const total = finMembers.length
    const managers = finMembers.filter((m) => m.designation.toLowerCase().includes("manager")).length
    const executives = finMembers.filter((m) => m.designation.toLowerCase().includes("executive")).length
    const active = finMembers.filter((m) => m.status === "Active").length
    return { total, managers, executives, active }
  }, [])

  const teamLeadStats = useMemo(() => {
    const tlMembers = MOCK_CHAIRMAN_MEMBERS.filter((m) => m.category === "team_leads")
    const total = tlMembers.length
    const active = tlMembers.filter((m) => m.status === "Active").length
    return { total, active }
  }, [])

  const employeeStats = useMemo(() => {
    const empMembers = MOCK_CHAIRMAN_MEMBERS.filter((m) => m.category === "employees")
    const total = empMembers.length
    const uniqueDepts = new Set(empMembers.map((m) => m.department)).size
    const active = empMembers.filter((m) => m.status === "Active").length
    return { total, departments: uniqueDepts, active }
  }, [])

  const techAdminStats = useMemo(() => {
    const taMembers = MOCK_CHAIRMAN_MEMBERS.filter((m) => m.category === "tech_admins")
    const total = taMembers.length
    const active = taMembers.filter((m) => m.status === "Active").length
    return { total, departments: 4, active }
  }, [])

  const hrStats = useMemo(() => {
    const hrMembers = MOCK_CHAIRMAN_MEMBERS.filter((m) => m.category === "hr")
    const total = hrMembers.length
    const managers = hrMembers.filter((m) => m.designation.toLowerCase().includes("manager")).length
    const regularMembers = total - managers
    const active = hrMembers.filter((m) => m.status === "Active").length
    return { total, managers, regularMembers, active }
  }, [])

  const productManagerStats = useMemo(() => {
    const pmMembers = MOCK_CHAIRMAN_MEMBERS.filter(
      (m) => m.category === "product_managers"
    )
    const total = pmMembers.length
    const uniqueProducts = new Set(pmMembers.map((m) => m.department)).size
    const active = pmMembers.filter((m) => m.status === "Active").length
    return { total, products: uniqueProducts, active }
  }, [])

  const accountantStats = useMemo(() => {
    const accMembers = MOCK_CHAIRMAN_MEMBERS.filter(
      (m) => m.category === "accountants"
    )
    const total = accMembers.length
    const seniors = accMembers.filter((m) =>
      m.designation.toLowerCase().includes("senior")
    ).length
    const active = accMembers.filter((m) => m.status === "Active").length
    return { total, seniors, active }
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full">
      <ChairmanRoleFilterBar
        categories={CHAIRMAN_ROLE_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {isFinance && (
        <FinanceTeamOverviewCard
          totalMembers={financeStats.total}
          financeManagersCount={financeStats.managers}
          financeExecutivesCount={financeStats.executives}
          activeCount={financeStats.active}
        />
      )}

      {isTeamLeads && (
        <TeamLeadsOverviewCard
          totalTeamLeads={teamLeadStats.total}
          activeTeamsCount={teamLeadStats.active}
        />
      )}

      {isEmployees && (
        <EmployeesOverviewCard
          totalEmployees={employeeStats.total}
          departmentsCount={employeeStats.departments}
          activeEmployeesCount={employeeStats.active}
        />
      )}

      {isTechAdmins && (
        <TechAdminsOverviewCard
          totalTechAdmins={techAdminStats.total}
          departmentsCount={techAdminStats.departments}
          activeTechAdminsCount={techAdminStats.active}
        />
      )}

      {isHr && (
        <HrTeamOverviewCard
          totalHrMembers={hrStats.total}
          hrManagersCount={hrStats.managers}
          hrMembersCount={hrStats.regularMembers}
          activeCount={hrStats.active}
        />
      )}

      {isProductManagers && (
        <ProductManagersOverviewCard
          totalProductManagers={productManagerStats.total}
          productsCount={productManagerStats.products}
          activeProductManagersCount={productManagerStats.active}
        />
      )}

      {isAccountants && (
        <AccountantsOverviewCard
          totalMembers={accountantStats.total}
          seniorAccountantsCount={accountantStats.seniors}
          activeCount={accountantStats.active}
        />
      )}

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
        onApply={handleApplyInlineFilters}
        showDepartmentFilter={showDepartment}
        departmentOptions={
          isTechAdmins
            ? TECH_ADMIN_DEPARTMENT_OPTIONS
            : isHr
            ? HR_DEPARTMENT_OPTIONS
            : isProductManagers
            ? PRODUCT_MANAGER_DEPARTMENT_OPTIONS
            : undefined
        }
      />

      <ChairmanMembersTable
        members={paginatedMembers}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredMembers.length}
        onPageChange={setCurrentPage}
        showDepartmentColumn={showDepartment}
        departmentHeaderLabel={isHr ? "Department" : "Department / Function"}
        itemLabel={
          isHr
            ? "HR members"
            : isProductManagers
            ? "product managers"
            : isAccountants
            ? "accountants"
            : undefined
        }
      />

      <ApplyFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentSearchQuery={searchQuery}
        currentDepartment={department}
        currentLocation={location}
        currentStatus={status}
        showDepartmentFilter={showDepartment}
        onApplyFilters={handleApplyModalFilters}
        onResetFilters={handleReset}
        totalResultsCount={filteredMembers.length}
      />
    </div>
  )
}
