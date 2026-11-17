"use client"

import React from "react"
import FinanceContainer from "../../employee/finance/components/FinanceContainer"
import { TabItem } from "../../employee/finance/components/FinanceTabs"

const FINANCE_TABS: TabItem[] = [
    { id: "summary", label: "Summary" },
    { id: "mypay", label: "My Pay" },
    { id: "manage_tax", label: "Manage TAX" },
]

export default function TeamLeadFinancePage() {
    return (
        <FinanceContainer
            basePath="/teamlead/finance"
            variant="employee"
            customTabs={FINANCE_TABS}
        />
    )
}
