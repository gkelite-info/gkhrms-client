"use client"

import { useState, useMemo } from "react"
import AccountantVendorPaymentKpis from "./AccountantVendorPaymentKpis"
import AccountantVendorPaymentsFilterBar from "./AccountantVendorPaymentsFilterBar"
import AccountantVendorPaymentsTable from "./AccountantVendorPaymentsTable"
import AccountantRecordVendorPaymentModal from "./AccountantRecordVendorPaymentModal"
import AccountantViewVendorPaymentModal from "./AccountantViewVendorPaymentModal"
import {
  vendorPaymentKpis,
  mockVendorPayments,
} from "../data/mockAccountantData"
import { AccountantVendorPayment, PaymentSubTab } from "../types"

interface AccountantVendorPaymentsViewProps {
  subTab: PaymentSubTab
  onSubTabChange: (subTab: PaymentSubTab) => void
}

export default function AccountantVendorPaymentsView({
  subTab,
  onSubTabChange,
}: AccountantVendorPaymentsViewProps) {
  const [payments, setPayments] = useState<AccountantVendorPayment[]>(
    mockVendorPayments
  )
  const [dateRange, setDateRange] = useState("01 Nov 2026 – 30 Nov 2026")
  const [vendor, setVendor] = useState("All Vendors")
  const [status, setStatus] = useState("All Status")

  const [recordModalOpen, setRecordModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<AccountantVendorPayment | null>(
    null
  )

  const handleViewPayment = (payment: AccountantVendorPayment) => {
    setSelectedPayment(payment)
    setViewModalOpen(true)
  }

  const handleSavePayment = (newPayment: AccountantVendorPayment) => {
    setPayments((prev) => [newPayment, ...prev])
  }

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      if (vendor !== "All Vendors" && item.vendorName !== vendor) {
        return false
      }

      if (status !== "All Status" && item.status !== status) {
        return false
      }

      return true
    })
  }, [payments, vendor, status])

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantVendorPaymentKpis kpis={vendorPaymentKpis} />

      <AccountantVendorPaymentsFilterBar
        subTab={subTab}
        onSubTabChange={onSubTabChange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        vendor={vendor}
        onVendorChange={setVendor}
        status={status}
        onStatusChange={setStatus}
        onRecordVendorPaymentClick={() => setRecordModalOpen(true)}
      />

      <AccountantVendorPaymentsTable
        payments={filteredPayments}
        onViewPayment={handleViewPayment}
      />

      <AccountantRecordVendorPaymentModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onSavePayment={handleSavePayment}
      />

      <AccountantViewVendorPaymentModal
        payment={selectedPayment}
        onClose={() => {
          setViewModalOpen(false)
          setSelectedPayment(null)
        }}
      />
    </div>
  )
}

