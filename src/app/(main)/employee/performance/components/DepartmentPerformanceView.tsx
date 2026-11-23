"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { CaretDown } from "phosphor-react"
import { ReusableTable, ReusablePagination, TableColumn } from "@/../reusableComponents"

export interface DepartmentObjective {
  id: number
  objective: string
  owner: string
  status: string
  progress: number
  timeline: string
}

const departmentObjectivesData: Record<string, DepartmentObjective[]> = {
  Design: [
    {
      id: 1,
      objective: "Redesign company HRMS dashboard",
      owner: "Deeksha",
      status: "In Progress",
      progress: 75,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 2,
      objective: "Create design system for product consistency",
      owner: "Arjun",
      status: "In Progress",
      progress: 75,
      timeline: "Sep 2025",
    },
    {
      id: 3,
      objective: "Conduct 5 user research sessions for new HR module",
      owner: "Riya",
      status: "In Progress",
      progress: 75,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 4,
      objective: "Improve mobile responsiveness for employee portal",
      owner: "Sneha",
      status: "In Progress",
      progress: 75,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 5,
      objective: 'Design and test "Leave Management" flow improvements',
      owner: "Kiran",
      status: "In Progress",
      progress: 75,
      timeline: "Oct-Dec 2025",
    },
  ],
  Engineering: [
    {
      id: 11,
      objective: "Migrate auth service to modern OAuth2/NextAuth",
      owner: "Rahul",
      status: "In Progress",
      progress: 80,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 12,
      objective: "Optimize database query performance on payroll",
      owner: "Vikram",
      status: "Completed",
      progress: 100,
      timeline: "Sep 2025",
    },
    {
      id: 13,
      objective: "Build automated CI/CD pipeline for employee app",
      owner: "Ananya",
      status: "In Progress",
      progress: 65,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 14,
      objective: "Implement real-time notification service with WebSockets",
      owner: "Suresh",
      status: "In Progress",
      progress: 70,
      timeline: "Oct-Dec 2025",
    },
  ],
  Product: [
    {
      id: 21,
      objective: "Launch Phase-2 asset tracking and audit features",
      owner: "Priya",
      status: "Completed",
      progress: 100,
      timeline: "Sep 2025",
    },
    {
      id: 22,
      objective: "Conduct quarterly product roadmap review",
      owner: "Amit",
      status: "In Progress",
      progress: 75,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 23,
      objective: "Define KPI metrics for employee performance reviews",
      owner: "Sunita",
      status: "In Progress",
      progress: 85,
      timeline: "Oct-Nov 2025",
    },
  ],
  Marketing: [
    {
      id: 31,
      objective: "Revamp internal employer branding & careers portal",
      owner: "Tanya",
      status: "In Progress",
      progress: 70,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 32,
      objective: "Launch Q4 company-wide employee engagement campaign",
      owner: "Rohan",
      status: "In Progress",
      progress: 90,
      timeline: "Oct-Dec 2025",
    },
  ],
  "Human Resources": [
    {
      id: 41,
      objective: "Automate annual performance review cycle for 500+ staff",
      owner: "Megha",
      status: "In Progress",
      progress: 80,
      timeline: "Oct-Dec 2025",
    },
    {
      id: 42,
      objective: "Implement new employee wellness & mental health support",
      owner: "Pooja",
      status: "In Progress",
      progress: 75,
      timeline: "Sep-Nov 2025",
    },
  ],
}

const availableDepartments = [
  "Design",
  "Engineering",
  "Product",
  "Marketing",
  "Human Resources",
]

export default function DepartmentPerformanceView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const parseDeptFromQuery = useCallback((param: string | null): string => {
    if (!param) return "Design"
    const match = availableDepartments.find(
      (d) => d.toLowerCase() === param.toLowerCase()
    )
    return match || "Design"
  }, [])

  const initialDept = parseDeptFromQuery(
    searchParams?.get("dept") || searchParams?.get("department")
  )
  const initialPage = Math.max(
    1,
    parseInt(searchParams?.get("deptPage") || "1", 10) || 1
  )

  const [selectedDept, setSelectedDept] = useState(initialDept)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    const d = parseDeptFromQuery(
      searchParams?.get("dept") || searchParams?.get("department")
    )
    setSelectedDept(d)
    const p = Math.max(
      1,
      parseInt(searchParams?.get("deptPage") || "1", 10) || 1
    )
    setCurrentPage(p)
  }, [searchParams, parseDeptFromQuery])

  const handleDeptSelect = (dept: string) => {
    setSelectedDept(dept)
    setCurrentPage(1)
    setIsDropdownOpen(false)

    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    params.set("tab", "department")
    params.set("dept", dept)
    params.delete("deptPage")
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)

    const params = new URLSearchParams(searchParams ? Array.from(searchParams.entries()) : [])
    if (newPage <= 1) {
      params.delete("deptPage")
    } else {
      params.set("deptPage", String(newPage))
    }
    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
  }

  const currentData = departmentObjectivesData[selectedDept] || []
  const totalPages = Math.ceil(currentData.length / pageSize)
  const paginatedData = currentData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const columns: TableColumn<DepartmentObjective>[] = [
    {
      key: "objective",
      header: "Objective",
      accessor: "objective",
      className: "font-medium text-gray-800 text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-5",
      headerClassName: "py-2.5 sm:py-3 px-3 sm:px-5 text-gray-800 text-xs sm:text-sm font-semibold",
    },
    {
      key: "owner",
      header: "Owner",
      accessor: "owner",
      className: "text-gray-700 text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-5",
      headerClassName: "py-2.5 sm:py-3 px-3 sm:px-5 text-gray-800 text-xs sm:text-sm font-semibold",
    },
    {
      key: "status",
      header: "Status",
      accessor: "status",
      className: "text-gray-700 text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-5 whitespace-nowrap",
      headerClassName: "py-2.5 sm:py-3 px-3 sm:px-5 text-gray-800 text-xs sm:text-sm font-semibold",
    },
    {
      key: "progress",
      header: "Progress",
      className: "py-3 sm:py-3.5 px-3 sm:px-5 whitespace-nowrap",
      headerClassName: "py-2.5 sm:py-3 px-3 sm:px-5 text-gray-800 text-xs sm:text-sm font-semibold",
      render: (row) => (
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-16 sm:w-20 md:w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-300"
              style={{ width: `${row.progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {row.progress}%
          </span>
        </div>
      ),
    },
    {
      key: "timeline",
      header: "Timeline",
      accessor: "timeline",
      className: "text-gray-700 text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-5 whitespace-nowrap",
      headerClassName: "py-2.5 sm:py-3 px-3 sm:px-5 text-gray-800 text-xs sm:text-sm font-semibold",
    },
  ]

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative inline-block w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="w-full sm:w-auto bg-white border border-gray-200 rounded-xl px-4 py-2 sm:py-2.5 flex items-center justify-between sm:justify-start gap-2 text-xs sm:text-sm font-medium text-gray-800 hover:border-purple-300 shadow-xs transition-colors cursor-pointer"
        >
          <span>Department : {selectedDept}</span>
          <CaretDown
            size={14}
            weight="bold"
            className={`text-gray-600 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-full sm:w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
            {availableDepartments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => handleDeptSelect(dept)}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                  selectedDept === dept
                    ? "bg-purple-50 text-[#8571EE] font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
        <ReusableTable<DepartmentObjective>
          columns={columns}
          data={paginatedData}
          headerBgColor="#EAE8E4"
          headerTextColor="#1F2937"
          headerRounded="rounded-none"
          rowHover={true}
          tableClassName="w-full text-left"
        />

        <div className="p-3 sm:p-4 border-t border-gray-100">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={currentData.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize)
              handlePageChange(1)
            }}
            pageSizeOptions={[3, 5, 10]}
          />
        </div>
      </div>
    </div>
  )
}
