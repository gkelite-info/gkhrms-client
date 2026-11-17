"use client"

import React from "react"
import FinanceContainer from "../../employee/finance/components/FinanceContainer"
import { TabItem } from "../../employee/finance/components/FinanceTabs"

const TECHADMIN_FINANCE_TABS: TabItem[] = [
  { id: "summary", label: "Summary" },
  { id: "mypay", label: "My Pay" },
  { id: "manage_tax", label: "Manage TAX" },
]

export default function TechAdminFinancePage() {
  return (
    <FinanceContainer
      basePath="/techadmin/finance"
      variant="employee"
      customTabs={TECHADMIN_FINANCE_TABS}
    />
  )
}

