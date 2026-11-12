"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { FinanceTabType } from "./types"
import FinanceTabs, { TabItem } from "./FinanceTabs"
import FinanceSummaryView from "./FinanceSummaryView"
import FinanceMyPayView from "./FinanceMyPayView"
import FinanceManageTaxView from "./FinanceManageTaxView"
import FinanceOrgSalaryOverviewView from "./FinanceOrgSalaryOverviewView"
import FinanceExpensesView from "./FinanceExpensesView"
import FinanceTicketsView from "./FinanceTicketsView"
import PayslipView from "./PayslipView"
import HrFinanceDirectoryView from "./HrFinanceDirectoryView"
import HrFinanceEmployeeHeader from "./HrFinanceEmployeeHeader"
import FinanceSegmentedToggle, { SegmentedToggleOption } from "./FinanceSegmentedToggle"
import {
  HR_PAYROLL_EMPLOYEES,
  HrPayrollEmployee,
} from "./hrPayrollData"

export interface FinanceContainerProps {
  basePath?: string
  variant?: "employee" | "hr"
  customTabs?: TabItem[]
}

type HrSubView = "employee" | "org_overview"

const MODE_TOGGLE_OPTIONS: SegmentedToggleOption<"hr" | "personal">[] = [
  { id: "hr", label: "HR" },
  { id: "personal", label: "Personal" },
]

const HR_SUBVIEW_LINKS: {
  id: HrSubView
  label: string
  getHref: (basePath: string) => string
}[] = [
  { id: "employee", label: "Employee", getHref: (base) => base },
  {
    id: "org_overview",
    label: "Org Overview",
    getHref: (base) => `${base}?tab=org_overview`,
  },
]

const HR_EMPLOYEE_TABS: TabItem[] = [
  { id: "summary", label: "Summary" },
  { id: "mypay", label: "Employee Pay" },
  { id: "manage_tax", label: "Manage TAX" },
  { id: "expenses_travel", label: "Expenses and Travel" },
]

const PERSONAL_TABS: TabItem[] = [
  { id: "summary", label: "Summary" },
  { id: "mypay", label: "My Pay" },
  { id: "manage_tax", label: "Manage TAX" },
  { id: "expenses_travel", label: "Expenses and Travel" },
]

function FinanceContainerContent({
  basePath: propBasePath,
  variant = "hr",
  customTabs,
}: FinanceContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const basePath = propBasePath || pathname || "/hrmanager/finance"

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

  const rawTab = searchParams.get("tab")?.toLowerCase()
  const viewParam = searchParams.get("view")?.toLowerCase()
  const payslipParam = searchParams.get("payslip")?.toLowerCase()
  const isPayslipActive = viewParam === "payslip" || payslipParam === "true"
  const isTicketsActive = viewParam === "tickets"

  const isOrgOverviewParam =
    rawTab === "org_overview" ||
    rawTab === "org-overview" ||
    rawTab === "org_salary_overview" ||
    rawTab === "org-salary-overview" ||
    rawTab === "salary-overview" ||
    viewParam === "org_overview" ||
    viewParam === "org-overview"

  const hrSubView: HrSubView =
    variant === "hr" && currentMode === "hr" && !selectedEmployee && isOrgOverviewParam
      ? "org_overview"
      : "employee"

  useEffect(() => {
    if (rawTab === "mypay" || rawTab === "my-pay" || rawTab === "employeepay" || rawTab === "employee-pay") {
      setActiveTab("mypay")
    } else if (
      rawTab === "manage_tax" ||
      rawTab === "manage-tax" ||
      rawTab === "tax"
    ) {
      setActiveTab("manage_tax")
    } else if (
      isOrgOverviewParam &&
      customTabs?.some((t) => t.id === "org_salary_overview")
    ) {
      setActiveTab("org_salary_overview")
    } else if (
      rawTab === "expenses" ||
      rawTab === "expenses_travel" ||
      rawTab === "expenses-travel"
    ) {
      setActiveTab("expenses_travel")
    } else {
      setActiveTab("summary")
    }
  }, [rawTab, isOrgOverviewParam, customTabs])

  const currentTabs = useMemo(() => {
    if (customTabs && customTabs.length > 0) return customTabs
    return variant === "hr" && currentMode === "hr" ? HR_EMPLOYEE_TABS : PERSONAL_TABS
  }, [customTabs, variant, currentMode])

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
    if (hrSubView === "org_overview") {
      router.push(`${basePath}?tab=org_overview&view=payslip`)
      return
    }
    router.push(buildUrl(activeTab, { view: "payslip" }))
  }

  const handleClosePayslip = () => {
    if (hrSubView === "org_overview") {
      router.push(`${basePath}?tab=org_overview`)
      return
    }
    router.push(buildUrl(activeTab))
  }

  const handleOpenTickets = () => {
    router.push(buildUrl(activeTab, { view: "tickets" }))
  }

  const handleCloseTickets = () => {
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

  if (isTicketsActive) {
    return (
      <div className="w-full h-full max-w-full min-w-0 flex flex-col px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 pb-12 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <FinanceTicketsView onBack={handleCloseTickets} />
      </div>
    )
  }

  if (variant === "hr" && currentMode === "hr" && !selectedEmployee) {
    return (
      <div className="w-full min-h-full max-w-full min-w-0 flex flex-col px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-3 pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="shrink-0 mb-3 select-none">
          <FinanceSegmentedToggle
            options={MODE_TOGGLE_OPTIONS}
            activeId={currentMode}
            onChange={handleSwitchMode}
          />
        </div>

        <nav
          aria-label="HR Finance views"
          className="shrink-0 mb-2.5 sm:mb-3 px-1 flex items-center gap-2 text-xs sm:text-sm select-none"
        >
          {HR_SUBVIEW_LINKS.map((item, idx) => {
            const isActive = hrSubView === item.id
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <span className="font-bold text-slate-400" aria-hidden="true">
                    /
                  </span>
                )}
                <Link
                  href={item.getHref(basePath)}
                  className={`font-bold transition-colors ${
                    isActive
                      ? "text-[#5B50EC]"
                      : "text-slate-600 hover:text-[#5B50EC]"
                  }`}
                >
                  {item.label}
                </Link>
              </React.Fragment>
            )
          })}
        </nav>

        {hrSubView === "org_overview" ? (
          <FinanceOrgSalaryOverviewView onViewPayslip={handleOpenPayslip} />
        ) : (
          <HrFinanceDirectoryView onSelectEmployee={handleSelectEmployee} />
        )}
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
          <FinanceSegmentedToggle
            options={MODE_TOGGLE_OPTIONS}
            activeId={currentMode}
            onChange={handleSwitchMode}
          />
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
          <FinanceExpensesView onAddMore={handleOpenTickets} />
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

