"use client"

import { useState, useMemo } from "react"
import AccountantReimbursementKpis from "./AccountantReimbursementKpis"
import AccountantReimbursementFilterBar from "./AccountantReimbursementFilterBar"
import AccountantReimbursementTable from "./AccountantReimbursementTable"
import AccountantReimbursementActivity from "./AccountantReimbursementActivity"
import AccountantViewClaimModal from "./AccountantViewClaimModal"
import AccountantProcessPayModal from "./AccountantProcessPayModal"
import {
  accountantReimbursementKpis,
  mockReimbursementClaims,
  reimbursementActivityList,
} from "../data/mockAccountantData"
import { AccountantReimbursementClaim, ReimbursementActivityItem } from "../types"

export default function AccountantReimbursementsView() {
  const [claims, setClaims] = useState<AccountantReimbursementClaim[]>(
    mockReimbursementClaims
  )
  const [activities, setActivities] = useState<ReimbursementActivityItem[]>(
    reimbursementActivityList
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [claimType, setClaimType] = useState("All Claim Types")
  const [department, setDepartment] = useState("All Departments")
  const [status, setStatus] = useState("All Statuses")
  const [dateRange, setDateRange] = useState("01 Oct 2026 - 31 Oct 2026")

  const [viewingClaim, setViewingClaim] = useState<AccountantReimbursementClaim | null>(
    null
  )
  const [processingClaim, setProcessingClaim] = useState<AccountantReimbursementClaim | null>(
    null
  )

  const handleProcessPay = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, paymentStatus: "Paid" as const } : c
      )
    )

    const paidClaim = claims.find((c) => c.id === claimId)
    if (paidClaim) {
      const newActivity: ReimbursementActivityItem = {
        id: `act-${Date.now()}`,
        title: "Reimbursement Paid",
        description: `${paidClaim.employeeName}'s claim ${paidClaim.claimId} for ${paidClaim.expenseType} (${paidClaim.amount}) was paid to the employee.`,
        timestamp: "Just now",
        type: "paid",
      }
      setActivities((prev) => [newActivity, ...prev])
    }
  }

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      if (
        claimType !== "All Claim Types" &&
        claim.expenseType.toLowerCase() !== claimType.toLowerCase()
      ) {
        return false
      }

      if (
        department !== "All Departments" &&
        claim.department.toLowerCase() !== department.toLowerCase()
      ) {
        return false
      }

      if (
        status !== "All Statuses" &&
        claim.approvalStatus.toLowerCase() !== status.toLowerCase()
      ) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          claim.employeeName.toLowerCase().includes(q) ||
          claim.claimId.toLowerCase().includes(q) ||
          claim.expenseType.toLowerCase().includes(q) ||
          claim.department.toLowerCase().includes(q) ||
          claim.amount.toLowerCase().includes(q)
        if (!matches) return false
      }

      return true
    })
  }, [claims, claimType, department, status, searchQuery])

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantReimbursementKpis kpis={accountantReimbursementKpis} />

      <AccountantReimbursementFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        claimType={claimType}
        onClaimTypeChange={setClaimType}
        department={department}
        onDepartmentChange={setDepartment}
        status={status}
        onStatusChange={setStatus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <AccountantReimbursementTable
        claims={filteredClaims}
        onViewClick={setViewingClaim}
        onProcessPayClick={setProcessingClaim}
      />

      <AccountantReimbursementActivity activities={activities} />

      <AccountantViewClaimModal
        claim={viewingClaim}
        onClose={() => setViewingClaim(null)}
        onProcessPay={(c) => {
          setViewingClaim(null)
          setProcessingClaim(c)
        }}
      />

      <AccountantProcessPayModal
        claim={processingClaim}
        isOpen={Boolean(processingClaim)}
        onClose={() => setProcessingClaim(null)}
        onConfirm={handleProcessPay}
      />
    </div>
  )
}

