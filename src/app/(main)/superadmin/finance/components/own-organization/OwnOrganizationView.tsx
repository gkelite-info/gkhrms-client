"use client"

import { useState } from "react"
import OwnOrgHeader from "./OwnOrgHeader"
import OwnOrgTabs, { OwnOrgTab } from "./OwnOrgTabs"
import OwnOrgStatCards from "./OwnOrgStatCards"
import OwnOrgEmployeesTable from "./OwnOrgEmployeesTable"
import OwnOrgAddEmployeeModal from "./OwnOrgAddEmployeeModal"
import AttendanceHeader from "./attendance/AttendanceHeader"
import AttendanceStatCards from "./attendance/AttendanceStatCards"
import AttendanceTable from "./attendance/AttendanceTable"
import PayrollView from "./payroll/PayrollView"
import ExpensesView from "./expenses/ExpensesView"
import LeaveView from "./leave/LeaveView"
import ReportsView from "./reports/ReportsView"
import {
  OwnOrgEmployee,
  INITIAL_OWN_ORG_EMPLOYEES,
} from "./OwnOrgEmployeesData"

interface OwnOrganizationViewProps {
  activeTab?: OwnOrgTab
  onTabChange?: (tab: OwnOrgTab) => void
}

export default function OwnOrganizationView({
  activeTab: controlledTab,
  onTabChange: controlledOnTabChange,
}: OwnOrganizationViewProps) {
  const [internalTab, setInternalTab] = useState<OwnOrgTab>("employees")
  const activeTab = controlledTab || internalTab

  const handleTabChange = (tab: OwnOrgTab) => {
    if (controlledOnTabChange) {
      controlledOnTabChange(tab)
    } else {
      setInternalTab(tab)
    }
  }

  const [employees, setEmployees] = useState<OwnOrgEmployee[]>(
    INITIAL_OWN_ORG_EMPLOYEES
  )
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddEmployee = (newEmp: OwnOrgEmployee) => {
    setEmployees((prev) => [newEmp, ...prev])
  }

  const handleUpdateEmployee = (updatedEmp: OwnOrgEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {activeTab === "employees" ? (
        <>
          <OwnOrgHeader onAddEmployee={() => setIsAddModalOpen(true)} />
          <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <OwnOrgStatCards />
          <OwnOrgEmployeesTable
            employees={employees}
            onUpdateEmployee={handleUpdateEmployee}
          />
        </>
      ) : activeTab === "attendance" ? (
        <>
          <AttendanceHeader />
          <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <AttendanceStatCards />
          <AttendanceTable />
        </>
      ) : activeTab === "payroll" ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Own Organization
            </h1>
            <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          <PayrollView />
        </>
      ) : activeTab === "expenses" ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Own Organization
            </h1>
            <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          <ExpensesView />
        </>
      ) : activeTab === "leave" ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Own Organization
            </h1>
            <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          <LeaveView />
        </>
      ) : activeTab === "reports" ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Own Organization
            </h1>
            <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          <ReportsView />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight capitalize">
              {activeTab}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your organization&apos;s {activeTab} information, reports, and records.
            </p>
          </div>
          <OwnOrgTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="bg-white border border-slate-100/90 rounded-2xl p-12 shadow-xs flex flex-col items-center justify-center text-center">
            <span className="text-sm font-bold text-slate-800 capitalize">
              {activeTab} Overview
            </span>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Records and details for {activeTab} are being processed.
            </p>
            <button
              type="button"
              onClick={() => handleTabChange("employees")}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#5B50E5] hover:bg-[#4E44C9] transition-colors cursor-pointer"
            >
              Back to Employees
            </button>
          </div>
        </>
      )}

      <OwnOrgAddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEmployee}
      />
    </div>
  )
}
