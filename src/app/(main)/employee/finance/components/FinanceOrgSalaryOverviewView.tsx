"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { ReusableTable, ReusablePagination, TableColumn } from "@/../reusableComponents"

export interface OrgEmployeePayroll {
  id: string
  name: string
  department: string
  designation: string
  grossPay: string
  deductions: string
  netPay: string
  payDate: string
}

export interface FinanceOrgSalaryOverviewViewProps {
  onViewPayslip?: (employeeName?: string) => void
}

const EMPLOYEE_PAYROLL_DATA: OrgEmployeePayroll[] = [
  {
    id: "1",
    name: "Alexander",
    department: "Design",
    designation: "UI/UX Designer",
    grossPay: "₹ 45,000",
    deductions: "₹5,000",
    netPay: "₹ 40,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "2",
    name: "Priya sharma",
    department: "HR",
    designation: "HR Manager",
    grossPay: "₹ 65,000",
    deductions: "₹3,000",
    netPay: "₹ 62,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "3",
    name: "Rajesh",
    department: "Tech",
    designation: "Frontend Dev",
    grossPay: "₹ 55,000",
    deductions: "₹4,500",
    netPay: "₹ 50,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "4",
    name: "Aisha",
    department: "Marketing",
    designation: "Brand Executive",
    grossPay: "₹ 38,000",
    deductions: "₹2,000",
    netPay: "₹ 36,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "5",
    name: "Alexander",
    department: "Design",
    designation: "UI/UX Designer",
    grossPay: "₹ 45,000",
    deductions: "₹5,000",
    netPay: "₹ 40,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "6",
    name: "Priya sharma",
    department: "HR",
    designation: "HR Manager",
    grossPay: "₹ 65,000",
    deductions: "₹3,000",
    netPay: "₹ 62,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "7",
    name: "Rajesh",
    department: "Tech",
    designation: "Frontend Dev",
    grossPay: "₹ 55,000",
    deductions: "₹4,500",
    netPay: "₹ 50,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "8",
    name: "Aisha",
    department: "Marketing",
    designation: "Brand Executive",
    grossPay: "₹ 38,000",
    deductions: "₹2,000",
    netPay: "₹ 36,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "9",
    name: "Kavita Verma",
    department: "Design",
    designation: "Product Designer",
    grossPay: "₹ 52,000",
    deductions: "₹4,000",
    netPay: "₹ 48,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "10",
    name: "Siddharth Rao",
    department: "Tech",
    designation: "Backend Architect",
    grossPay: "₹ 85,000",
    deductions: "₹7,500",
    netPay: "₹ 77,500",
    payDate: "23 Sept 2025",
  },
  {
    id: "11",
    name: "Sneha Reddy",
    department: "HR",
    designation: "Talent Acquisition",
    grossPay: "₹ 48,000",
    deductions: "₹3,500",
    netPay: "₹ 44,500",
    payDate: "23 Sept 2025",
  },
  {
    id: "12",
    name: "Vikram Malhotra",
    department: "Marketing",
    designation: "Growth Lead",
    grossPay: "₹ 72,000",
    deductions: "₹6,000",
    netPay: "₹ 66,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "13",
    name: "Ananya Roy",
    department: "Tech",
    designation: "QA Lead",
    grossPay: "₹ 58,000",
    deductions: "₹4,200",
    netPay: "₹ 53,800",
    payDate: "23 Sept 2025",
  },
  {
    id: "14",
    name: "Rohan Kapoor",
    department: "Design",
    designation: "Visual Designer",
    grossPay: "₹ 42,000",
    deductions: "₹3,000",
    netPay: "₹ 39,000",
    payDate: "23 Sept 2025",
  },
  {
    id: "15",
    name: "Meera Nair",
    department: "HR",
    designation: "HR Associate",
    grossPay: "₹ 36,000",
    deductions: "₹2,500",
    netPay: "₹ 33,500",
    payDate: "23 Sept 2025",
  },
  {
    id: "16",
    name: "Farhan Ali",
    department: "Marketing",
    designation: "Content Strategist",
    grossPay: "₹ 46,000",
    deductions: "₹3,800",
    netPay: "₹ 42,200",
    payDate: "23 Sept 2025",
  },
]

export default function FinanceOrgSalaryOverviewView({
  onViewPayslip,
}: FinanceOrgSalaryOverviewViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const deptParam = searchParams?.get("orgDept") || "all"
  const roleParam = searchParams?.get("orgRole") || "all"
  const monthTypeParam = searchParams?.get("orgMonthType") || "all"
  const monthParam = searchParams?.get("orgMonth") || "September"
  const pageParam = searchParams?.get("orgPage")

  const [selectedDept, setSelectedDept] = useState(deptParam)
  const [selectedRole, setSelectedRole] = useState(roleParam)
  const [selectedMonthType, setSelectedMonthType] = useState(monthTypeParam)
  const [selectedMonth, setSelectedMonth] = useState(monthParam)

  const [currentPage, setCurrentPage] = useState(() => {
    const p = pageParam ? parseInt(pageParam, 10) : 1
    return isNaN(p) || p < 1 ? 1 : p
  })
  const [pageSize, setPageSize] = useState(8)

  useEffect(() => {
    setSelectedDept(deptParam)
  }, [deptParam])

  useEffect(() => {
    setSelectedRole(roleParam)
  }, [roleParam])

  useEffect(() => {
    setSelectedMonthType(monthTypeParam)
  }, [monthTypeParam])

  useEffect(() => {
    setSelectedMonth(monthParam)
  }, [monthParam])

  useEffect(() => {
    if (pageParam) {
      const p = parseInt(pageParam, 10)
      if (!isNaN(p) && p >= 1) {
        setCurrentPage(p)
      }
    }
  }, [pageParam])

  const updateUrl = (newParams: {
    dept?: string
    role?: string
    monthType?: string
    month?: string
    page?: number
  }) => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    if (newParams.dept !== undefined) {
      if (newParams.dept !== "all") params.set("orgDept", newParams.dept)
      else params.delete("orgDept")
    }
    if (newParams.role !== undefined) {
      if (newParams.role !== "all") params.set("orgRole", newParams.role)
      else params.delete("orgRole")
    }
    if (newParams.monthType !== undefined) {
      if (newParams.monthType !== "all") params.set("orgMonthType", newParams.monthType)
      else params.delete("orgMonthType")
    }
    if (newParams.month !== undefined) {
      if (newParams.month !== "September") params.set("orgMonth", newParams.month)
      else params.delete("orgMonth")
    }
    if (newParams.page !== undefined) {
      if (newParams.page > 1) params.set("orgPage", String(newParams.page))
      else params.delete("orgPage")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleDeptChange = (val: string) => {
    setSelectedDept(val)
    setCurrentPage(1)
    updateUrl({ dept: val, page: 1 })
  }

  const handleRoleChange = (val: string) => {
    setSelectedRole(val)
    setCurrentPage(1)
    updateUrl({ role: val, page: 1 })
  }

  const handleMonthTypeChange = (val: string) => {
    setSelectedMonthType(val)
    setCurrentPage(1)
    updateUrl({ monthType: val, page: 1 })
  }

  const handleMonthChange = (val: string) => {
    setSelectedMonth(val)
    setCurrentPage(1)
    updateUrl({ month: val, page: 1 })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateUrl({ page })
  }

  const filteredData = useMemo(() => {
    return EMPLOYEE_PAYROLL_DATA.filter((item) => {
      if (
        selectedDept !== "all" &&
        item.department.toLowerCase() !== selectedDept.toLowerCase()
      ) {
        return false
      }
      if (
        selectedRole !== "all" &&
        item.designation.toLowerCase() !== selectedRole.toLowerCase()
      ) {
        return false
      }
      return true
    })
  }, [selectedDept, selectedRole])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage, pageSize])

  const columns: TableColumn<OrgEmployeePayroll>[] = [
    {
      header: "Employee Name",
      accessor: "name",
      className: "font-medium text-slate-800 whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Department",
      accessor: "department",
      className: "text-slate-700 font-normal whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Designation",
      accessor: "designation",
      className: "text-slate-700 font-normal whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Gross Pay",
      accessor: "grossPay",
      className: "text-slate-800 font-medium whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Deductions",
      accessor: "deductions",
      className: "text-slate-700 font-normal whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Net Pay",
      accessor: "netPay",
      className: "text-slate-900 font-semibold whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Pay Date",
      accessor: "payDate",
      className: "text-slate-600 font-normal whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
    {
      header: "Payslip",
      render: (row) => (
        <button
          type="button"
          onClick={() => onViewPayslip && onViewPayslip(row.name)}
          className="text-slate-700 hover:text-[#5B50EC] font-normal transition-colors cursor-pointer whitespace-nowrap underline"
        >
          View Payslip
        </button>
      ),
      className: "whitespace-nowrap",
      headerClassName: "whitespace-nowrap",
    },
  ]

  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-4 select-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 w-full">
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Total Employees
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            120
          </span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Total Monthly Payroll
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            ₹ 45,00,000
          </span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Average Salary
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            4.2 / 5
          </span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Last Payroll Processed
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            4.2 / 5
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-slate-100/80 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="w-full appearance-none bg-slate-50/70 border border-slate-200/80 rounded-lg py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Departments</option>
              <option value="Design">Design</option>
              <option value="HR">HR</option>
              <option value="Tech">Tech</option>
              <option value="Marketing">Marketing</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full appearance-none bg-slate-50/70 border border-slate-200/80 rounded-lg py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Frontend Dev">Frontend Dev</option>
              <option value="Brand Executive">Brand Executive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedMonthType}
              onChange={(e) => handleMonthTypeChange(e.target.value)}
              className="w-full appearance-none bg-slate-50/70 border border-slate-200/80 rounded-lg py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Cycles</option>
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="w-full appearance-none bg-slate-50/70 border border-slate-200/80 rounded-lg py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="September">September</option>
              <option value="August">August</option>
              <option value="July">July</option>
              <option value="June">June</option>
              <option value="May">May</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-100/80 shadow-xs overflow-hidden">
        <div className="w-full max-w-full overflow-x-auto scrollbar-thin">
          <ReusableTable<OrgEmployeePayroll>
            columns={columns}
            data={paginatedData}
            headerBgColor="#F3F0EC"
            headerTextColor="#1F2937"
            headerRounded="rounded-xl"
            tableClassName="border-collapse w-full min-w-[760px]"
            containerClassName="w-full"
            rowHover={true}
            keyExtractor={(row) => row.id}
          />
        </div>

        <div className="pt-3 border-t border-slate-100 mt-3 overflow-x-auto">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredData.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize)
              handlePageChange(1)
            }}
            pageSizeOptions={[4, 8, 12, 16]}
          />
        </div>
      </div>
    </div>
  )
}
