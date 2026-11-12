"use client"

import React, { useState, useMemo } from "react"
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
  const [selectedDept, setSelectedDept] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedMonthType, setSelectedMonthType] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("September")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

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

  const handleDeptChange = (val: string) => {
    setSelectedDept(val)
    setCurrentPage(1)
  }

  const handleRoleChange = (val: string) => {
    setSelectedRole(val)
    setCurrentPage(1)
  }

  const columns: TableColumn<OrgEmployeePayroll>[] = [
    {
      header: "Employee Name",
      accessor: "name",
      className: "font-medium text-slate-800",
    },
    {
      header: "Department",
      accessor: "department",
      className: "text-slate-700 font-normal",
    },
    {
      header: "Designation",
      accessor: "designation",
      className: "text-slate-700 font-normal",
    },
    {
      header: "Gross Pay",
      accessor: "grossPay",
      className: "text-slate-800 font-normal",
    },
    {
      header: "Deductions",
      accessor: "deductions",
      className: "text-slate-800 font-normal",
    },
    {
      header: "Net Pay",
      accessor: "netPay",
      className: "text-slate-800 font-normal",
    },
    {
      header: "Pay Date",
      accessor: "payDate",
      className: "text-slate-700 font-normal",
    },
    {
      header: "Action",
      render: (row) => (
        <button
          type="button"
          onClick={() => onViewPayslip && onViewPayslip(row.name)}
          className="text-slate-700 hover:text-[#5B50EC] font-normal transition-colors cursor-pointer"
        >
          View Payslip
        </button>
      ),
    },
  ]

  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Total Employees
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            120
          </span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Total Monthly Payroll
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            ₹ 45,00,000
          </span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Average Salary
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            4.2 / 5
          </span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100/80 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 font-medium text-xs sm:text-sm">
            Last Payroll Processed
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            4.2 / 5
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-slate-100/80 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="w-full appearance-none bg-transparent py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Department</option>
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
              className="w-full appearance-none bg-transparent py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Role</option>
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
              onChange={(e) => setSelectedMonthType(e.target.value)}
              className="w-full appearance-none bg-transparent py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Month</option>
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full appearance-none bg-transparent py-1.5 px-3 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
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

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100/80 shadow-xs flex flex-col gap-4">
        <ReusableTable<OrgEmployeePayroll>
          columns={columns}
          data={paginatedData}
          keyExtractor={(row, index) => `${row.id}-${index}`}
          headerBgColor="transparent"
          headerTextColor="#0F172A"
          headerRounded="rounded-none"
          showBorder={false}
          rowHover={true}
          emptyMessage="No employee payroll records found"
        />

        {filteredData.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <ReusablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredData.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize: number) => {
                setPageSize(newSize)
                setCurrentPage(1)
              }}
              pageSizeOptions={[5, 8, 10, 20]}
              showPageSize={true}
              showTotalInfo={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}

