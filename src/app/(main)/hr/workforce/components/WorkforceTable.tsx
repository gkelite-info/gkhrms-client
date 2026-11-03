"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { MagnifyingGlass, Funnel } from "phosphor-react"
import { ReusableTable, ReusablePagination, TableColumn } from "@/../reusableComponents"

export interface WorkforceEmployee {
  id: number
  name: string
  department: string
  role: string
  status: "Active" | "Inactive"
  joiningDate: string
}

export const workforceEmployees: WorkforceEmployee[] = [
  {
    id: 1,
    name: "Alexander",
    department: "Design",
    role: "Product",
    status: "Active",
    joiningDate: "10 Jan 2024",
  },
  {
    id: 2,
    name: "Priya sharma",
    department: "HR",
    role: "HR Manager",
    status: "Active",
    joiningDate: "11 Jan 2024",
  },
  {
    id: 3,
    name: "Rajesh",
    department: "Development",
    role: "Frontend DeV",
    status: "Active",
    joiningDate: "15 Jan 2024",
  },
  {
    id: 4,
    name: "Aisha",
    department: "Marketing",
    role: "Brand Executive",
    status: "Active",
    joiningDate: "17 Jan 2024",
  },
  {
    id: 5,
    name: "Alexander",
    department: "Design",
    role: "Product",
    status: "Active",
    joiningDate: "19 Jan 2024",
  },
  {
    id: 6,
    name: "Priya sharma",
    department: "HR",
    role: "HR Manager",
    status: "Active",
    joiningDate: "20 Jan 2024",
  },
  {
    id: 7,
    name: "Rajesh",
    department: "Development",
    role: "Frontend DeV",
    status: "Active",
    joiningDate: "25 Jan 2024",
  },
  {
    id: 8,
    name: "Aisha",
    department: "Marketing",
    role: "Brand Executive",
    status: "Active",
    joiningDate: "28 Jan 2024",
  },
  {
    id: 9,
    name: "Michael Smith",
    department: "Development",
    role: "Full Stack DeV",
    status: "Active",
    joiningDate: "02 Feb 2024",
  },
  {
    id: 10,
    name: "Sarah Johnson",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
    joiningDate: "05 Feb 2024",
  },
  {
    id: 11,
    name: "Emily Davis",
    department: "HR",
    role: "Recruiter",
    status: "Active",
    joiningDate: "12 Feb 2024",
  },
  {
    id: 12,
    name: "David Wilson",
    department: "Marketing",
    role: "Content Strategist",
    status: "Active",
    joiningDate: "18 Feb 2024",
  },
  {
    id: 13,
    name: "James Miller",
    department: "Finance",
    role: "Accountant",
    status: "Active",
    joiningDate: "24 Feb 2024",
  },
  {
    id: 14,
    name: "Joy Taylor",
    department: "Operations",
    role: "Operations Lead",
    status: "Active",
    joiningDate: "01 Mar 2024",
  },
  {
    id: 15,
    name: "Robert Brown",
    department: "Development",
    role: "Backend DeV",
    status: "Active",
    joiningDate: "08 Mar 2024",
  },
  {
    id: 16,
    name: "Sophia Martinez",
    department: "Design",
    role: "Visual Designer",
    status: "Active",
    joiningDate: "15 Mar 2024",
  },
]

const departments = ["All", "Design", "Development", "HR", "Marketing", "Finance", "Operations"]
const statuses = ["All", "Active", "Inactive"]

export default function WorkforceTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const filteredEmployees = useMemo(() => {
    return workforceEmployees.filter((emp) => {
      if (selectedDept !== "All" && emp.department.toLowerCase() !== selectedDept.toLowerCase()) {
        return false
      }
      if (selectedStatus !== "All" && emp.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesName = emp.name.toLowerCase().includes(q)
        const matchesDept = emp.department.toLowerCase().includes(q)
        const matchesRole = emp.role.toLowerCase().includes(q)
        if (!matchesName && !matchesDept && !matchesRole) {
          return false
        }
      }
      return true
    })
  }, [searchQuery, selectedDept, selectedStatus])

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredEmployees.slice(start, start + pageSize)
  }, [filteredEmployees, currentPage, pageSize])

  const columns: TableColumn<WorkforceEmployee>[] = [
    {
      key: "name",
      header: "Employee Name",
      accessor: "name",
      headerClassName: "border-b border-gray-200 border-r border-gray-100 py-3 px-4 text-left font-semibold text-xs sm:text-sm text-gray-800",
      className: "border-r border-gray-100 py-3 px-4 font-medium text-xs sm:text-sm text-gray-900",
    },
    {
      key: "department",
      header: "Department",
      accessor: "department",
      headerClassName: "border-b border-gray-200 border-r border-gray-100 py-3 px-4 text-left font-semibold text-xs sm:text-sm text-gray-800",
      className: "border-r border-gray-100 py-3 px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "role",
      header: "Role",
      accessor: "role",
      headerClassName: "border-b border-gray-200 border-r border-gray-100 py-3 px-4 text-left font-semibold text-xs sm:text-sm text-gray-800",
      className: "border-r border-gray-100 py-3 px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "status",
      header: "Status",
      accessor: "status",
      headerClassName: "border-b border-gray-200 border-r border-gray-100 py-3 px-4 text-left font-semibold text-xs sm:text-sm text-gray-800",
      className: "border-r border-gray-100 py-3 px-4 font-medium text-xs sm:text-sm text-gray-800",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
            row.status === "Active"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-gray-100 text-gray-600 border border-gray-200"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "joiningDate",
      header: "Joining Date",
      accessor: "joiningDate",
      headerClassName: "border-b border-gray-200 border-r border-gray-100 py-3 px-4 text-left font-semibold text-xs sm:text-sm text-gray-800",
      className: "border-r border-gray-100 py-3 px-4 font-normal text-xs sm:text-sm text-gray-700",
    },
    {
      key: "action",
      header: "Action",
      headerClassName: "border-b border-gray-200 py-3 px-4 text-left font-semibold text-xs sm:text-sm text-gray-800",
      className: "py-3 px-4 text-left text-xs sm:text-sm",
      render: (row) => (
        <Link
          href={`/hr/profile?id=${row.id}`}
          className="font-medium text-[#4F46E5] hover:text-[#3730A3] underline transition-colors"
        >
          View Profile
        </Link>
      ),
    },
  ]

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100/80 shadow-2xs overflow-hidden select-none flex flex-col">
      <div className="p-3.5 sm:p-4 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search by name, role or dept..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] focus:border-[#5B50EC] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Funnel size={14} className="text-gray-400" />
            <span>Dept:</span>
          </div>
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value)
              setCurrentPage(1)
            }}
            className="px-2.5 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] transition-all cursor-pointer"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-2.5 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#5B50EC] transition-all cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Status" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ReusableTable<WorkforceEmployee>
        columns={columns}
        data={paginatedData}
        headerBgColor="#ffffff"
        headerTextColor="#1F2937"
        headerRounded="rounded-none"
        tableClassName="border-collapse w-full"
        containerClassName="w-full"
        rowHover={true}
        keyExtractor={(row) => row.id}
      />

      <div className="px-3 sm:px-4 py-2 border-t border-gray-100/80">
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredEmployees.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize)
            setCurrentPage(1)
          }}
          pageSizeOptions={[4, 5, 8, 10, 16]}
        />
      </div>
    </div>
  )
}
