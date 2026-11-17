"use client"

import React from "react"
import FinanceContainer from "../../employee/finance/components/FinanceContainer"
import { EMPLOYEE_TABS } from "../../employee/finance/components/FinanceTabs"

export default function ManagerFinancePage() {
  return (
    <FinanceContainer
      basePath="/manager/finance"
      variant="employee"
      customTabs={EMPLOYEE_TABS}
    />
  )
}

