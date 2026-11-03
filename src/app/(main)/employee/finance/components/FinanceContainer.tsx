"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { FinanceTabType } from "./types"
import FinanceTabs, { TabItem } from "./FinanceTabs"
import FinanceSummaryView from "./FinanceSummaryView"
import FinanceMyPayView from "./FinanceMyPayView"
import FinanceManageTaxView from "./FinanceManageTaxView"
import FinanceOrgSalaryOverviewView from "./FinanceOrgSalaryOverviewView"
import EmployeeExpensesView from "../../components/me/EmployeeExpensesView"
import PayslipView from "./PayslipView"
import HrFinanceDirectoryView from "./HrFinanceDirectoryView"
import HrFinanceEmployeeHeader from "./HrFinanceEmployeeHeader"
import {
  HR_PAYROLL_EMPLOYEES,
  HrPayrollEmployee,
} from "./hrPayrollData"

export interface FinanceContainerProps {
  basePath?: string
  variant?: "employee" | "hr"
  customTabs?: TabItem[]
}

function FinanceContainerContent({
  basePath: propBasePath,
  variant = "hr",
  customTabs,
}: FinanceContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const basePath =
    propBasePath ||
    (pathname?.startsWith("/employee") ? "/employee/finance" : "/hr/finance")

  const modeParam = searchParams.get("mode")?.toLowerCase()
  const currentMode: "hr" | "personal" = modeParam === "personal" ? "personal" : "hr"

  const employeeIdParam =
    searchParams.get("employeeId") || searchParams.get("employee")

  const selectedEmployee: HrPayrollEmployee | null = useMemo(() => {
    if (!employeeIdParam) return null
    const lower = employeeIdParam.toLowerCase()
    return (
      HR_PAYROLL_EMPLOYEES.find(
        (emp) =>
          emp.employeeId.toLowerCase() === lower ||
          String(emp.id) === employeeIdParam
      ) || HR_PAYROLL_EMPLOYEES[0]
    )
  }, [employeeIdParam])

  const [activeTab, setActiveTab] = useState<FinanceTabType>("summary")

  const viewParam = searchParams.get("view")?.toLowerCase()
  const payslipParam = searchParams.get("payslip")?.toLowerCase()
  const isPayslipActive = viewParam === "payslip" || payslipParam === "true"

  useEffect(() => {
    const rawTab = searchParams.get("tab")?.toLowerCase()
    if (rawTab === "mypay" || rawTab === "my-pay" || rawTab === "employeepay" || rawTab === "employee-pay") {
      setActiveTab("mypay")
    } else if (
      rawTab === "manage_tax" ||
      rawTab === "manage-tax" ||
      rawTab === "tax"
    ) {
      setActiveTab("manage_tax")
    } else if (
      rawTab === "org_salary_overview" ||
      rawTab === "org-salary-overview" ||
      rawTab === "salary-overview"
    ) {
      if (currentMode === "personal") {
        setActiveTab("org_salary_overview")
      } else {
        setActiveTab("summary")
      }
    } else if (
      rawTab === "expenses" ||
      rawTab === "expenses_travel" ||
      rawTab === "expenses-travel"
    ) {
      if (currentMode === "hr") {
        setActiveTab("expenses_travel")
      } else {
        setActiveTab("summary")
      }
    } else {
      setActiveTab("summary")
    }
  }, [searchParams, currentMode])

  const currentTabs = useMemo(() => {
    if (customTabs && customTabs.length > 0) return customTabs
    return currentMode === "personal"
      ? [
          { id: "summary" as const, label: "Summary" },
          { id: "mypay" as const, label: "My Pay" },
          { id: "manage_tax" as const, label: "Manage TAX" },
          { id: "org_salary_overview" as const, label: "Org Salary Overview" },
        ]
      : [
          { id: "summary" as const, label: "Summary" },
          { id: "mypay" as const, label: "My Pay" },
          { id: "manage_tax" as const, label: "Manage TAX" },
          { id: "expenses_travel" as const, label: "Expenses and Travel" },
        ]
  }, [customTabs, currentMode])

  const buildUrl = (targetTab: FinanceTabType, extraParams?: Record<string, string>) => {
    const params = new URLSearchParams()
    if (variant === "hr") {
      if (currentMode === "personal") {
        params.set("mode", "personal")
      } else if (selectedEmployee) {
        params.set("employeeId", selectedEmployee.employeeId)
      }
    }
    if (targetTab !== "summary" || params.toString().length > 0) {
      params.set("tab", targetTab)
    }
    if (extraParams) {
      Object.entries(extraParams).forEach(([k, v]) => params.set(k, v))
    }
    const query = params.toString()
    return query ? `${basePath}?${query}` : basePath
  }

  const handleSelectTab = (tab: FinanceTabType) => {
    setActiveTab(tab)
    router.push(buildUrl(tab))
  }

  const handleOpenPayslip = () => {
    router.push(buildUrl(activeTab, { view: "payslip" }))
  }

  const handleClosePayslip = () => {
    router.push(buildUrl(activeTab))
  }

  const handleSelectEmployee = (emp: HrPayrollEmployee) => {
    router.push(`${basePath}?employeeId=${emp.employeeId}&tab=summary`)
  }

  const handleBackToDirectory = () => {
    router.push(basePath)
  }

  const handleSwitchMode = (mode: "hr" | "personal") => {
    if (mode === "personal") {
      router.push(`${basePath}?mode=personal&tab=summary`)
    } else {
      router.push(basePath)
    }
  }

  if (isPayslipActive) {
    return (
      <div className="w-full h-full max-w-full min-w-0 flex flex-col px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-3 pb-3 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <PayslipView onBack={handleClosePayslip} />
      </div>
    )
  }

  if (variant === "hr" && currentMode === "hr" && !selectedEmployee) {
    return (
      <div className="w-full h-full max-w-full min-w-0 flex flex-col px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-3 pb-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <HrFinanceDirectoryView
          onSelectEmployee={handleSelectEmployee}
          currentMode={currentMode}
          onSwitchMode={handleSwitchMode}
        />
      </div>
    )
  }

  const tabBasePath =
    variant === "hr" && selectedEmployee
      ? `${basePath}?employeeId=${selectedEmployee.employeeId}`
      : variant === "hr" && currentMode === "personal"
      ? `${basePath}?mode=personal`
      : basePath

  return (
    <div className="w-full min-h-full max-w-full min-w-0 flex flex-col px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-3 pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      {variant === "hr" && currentMode === "personal" && (
        <div className="shrink-0 mb-3 select-none">
          <div className="w-full bg-white rounded-2xl p-1.5 shadow-2xs border border-slate-100/80 flex items-center justify-between">
            <div className="grid grid-cols-2 gap-1.5 w-full">
              <button
                type="button"
                onClick={() => handleSwitchMode("hr")}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer bg-[#A3A3A3] text-white hover:bg-[#949494] shadow-2xs"
              >
                HR
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode("personal")}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer bg-[#5B50EC] text-white shadow-xs"
              >
                Personal
              </button>
            </div>
          </div>
        </div>
      )}

      {variant === "hr" && currentMode === "hr" && selectedEmployee && (
        <div className="shrink-0 mb-2 sm:mb-2.5">
          <HrFinanceEmployeeHeader
            employee={selectedEmployee}
            onSelectEmployee={handleSelectEmployee}
            onBackToDirectory={handleBackToDirectory}
            currentMode={currentMode}
            onSwitchMode={handleSwitchMode}
          />
        </div>
      )}

      <div className="shrink-0 mb-2 sm:mb-2.5">
        <FinanceTabs
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          tabs={currentTabs}
          variant={currentMode === "personal" ? "employee" : variant}
        />
      </div>

      <div className="w-full flex flex-col mt-2">
        {activeTab === "summary" && (
          <FinanceSummaryView
            onViewPayslip={handleOpenPayslip}
            employee={selectedEmployee || undefined}
          />
        )}

        {activeTab === "mypay" && (
          <FinanceMyPayView
            onViewPayslip={handleOpenPayslip}
            basePath={tabBasePath}
          />
        )}

        {activeTab === "manage_tax" && (
          <FinanceManageTaxView basePath={tabBasePath} />
        )}

        {activeTab === "org_salary_overview" && (
          <FinanceOrgSalaryOverviewView onViewPayslip={handleOpenPayslip} />
        )}

        {activeTab === "expenses_travel" && (
          <EmployeeExpensesView
            onAddMore={() => router.push("/employee/tickets")}
          />
        )}
      </div>
    </div>
  )
}

export default function FinanceContainer(props: FinanceContainerProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-[#5B50EC] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FinanceContainerContent {...props} />
    </Suspense>
  )
}
