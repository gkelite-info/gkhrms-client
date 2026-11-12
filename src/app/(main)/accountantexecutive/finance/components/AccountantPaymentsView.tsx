"use client"

import { useState, useMemo } from "react"
import AccountantPaymentKpis from "./AccountantPaymentKpis"
import AccountantPaymentsFilterBar from "./AccountantPaymentsFilterBar"
import AccountantPaymentsTable from "./AccountantPaymentsTable"
import AccountantRecordPaymentModal from "./AccountantRecordPaymentModal"
import AccountantViewPaymentModal from "./AccountantViewPaymentModal"
import AccountantVendorPaymentsView from "./AccountantVendorPaymentsView"
import AccountantEmployeeReimbursementsView from "./AccountantEmployeeReimbursementsView"
import {
  accountantPaymentKpis,
  mockAccountantPayments,
} from "../data/mockAccountantData"
import { AccountantPayment, PaymentSubTab } from "../types"

interface AccountantPaymentsViewProps {
  initialSubTab?: PaymentSubTab
  onSubTabChange?: (subTab: PaymentSubTab) => void
}

export default function AccountantPaymentsView({
  initialSubTab = "All Payments",
  onSubTabChange: externalOnSubTabChange,
}: AccountantPaymentsViewProps) {
  const [payments, setPayments] = useState<AccountantPayment[]>(
    mockAccountantPayments
  )
  const [subTab, setSubTab] = useState<PaymentSubTab>(initialSubTab)
  const [dateRange, setDateRange] = useState("01 Nov 2026 – 30 Nov 2026")
  const [paymentType, setPaymentType] = useState("All Payment Types")
  const [status, setStatus] = useState("All Status")
  const [department, setDepartment] = useState("All Departments")
  const [paymentMethod, setPaymentMethod] = useState("All Methods")

  const [recordModalOpen, setRecordModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<AccountantPayment | null>(
    null
  )

  const handleSubTabChange = (newSubTab: PaymentSubTab) => {
    setSubTab(newSubTab)
    if (externalOnSubTabChange) {
      externalOnSubTabChange(newSubTab)
    }

    if (newSubTab === "Vendor Payments") {
      setPaymentType("Vendor Payment")
    } else if (newSubTab === "Employee Reimbursements") {
      setPaymentType("Reimbursement")
    } else {
      setPaymentType("All Payment Types")
    }
  }

  const handlePaymentTypeChange = (newType: string) => {
    setPaymentType(newType)
    if (newType === "Vendor Payment") {
      setSubTab("Vendor Payments")
    } else if (newType === "Reimbursement") {
      setSubTab("Employee Reimbursements")
    } else {
      setSubTab("All Payments")
    }
  }

  const handleViewPayment = (payment: AccountantPayment) => {
    setSelectedPayment(payment)
    setViewModalOpen(true)
  }

  const handleSavePayment = (newPayment: AccountantPayment) => {
    setPayments((prev) => [newPayment, ...prev])
  }

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      if (subTab === "Vendor Payments" && item.paymentType !== "Vendor Payment") {
        return false
      }
      if (
        subTab === "Employee Reimbursements" &&
        item.paymentType !== "Reimbursement"
      ) {
        return false
      }

      if (
        paymentType !== "All Payment Types" &&
        item.paymentType.toLowerCase() !== paymentType.toLowerCase()
      ) {
        return false
      }

      if (
        status !== "All Status" &&
        item.status.toLowerCase() !== status.toLowerCase()
      ) {
        return false
      }

      if (
        department !== "All Departments" &&
        item.department?.toLowerCase() !== department.toLowerCase()
      ) {
        return false
      }

      if (
        paymentMethod !== "All Methods" &&
        item.paymentMethod.toLowerCase() !== paymentMethod.toLowerCase()
      ) {
        return false
      }

      return true
    })
  }, [payments, subTab, paymentType, status, department, paymentMethod])

  if (subTab === "Vendor Payments") {
    return (
      <AccountantVendorPaymentsView
        subTab={subTab}
        onSubTabChange={handleSubTabChange}
      />
    )
  }

  if (subTab === "Employee Reimbursements") {
    return (
      <AccountantEmployeeReimbursementsView
        subTab={subTab}
        onSubTabChange={handleSubTabChange}
      />
    )
  }

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantPaymentKpis kpis={accountantPaymentKpis} />

      <AccountantPaymentsFilterBar
        subTab={subTab}
        onSubTabChange={handleSubTabChange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        paymentType={paymentType}
        onPaymentTypeChange={handlePaymentTypeChange}
        status={status}
        onStatusChange={setStatus}
        department={department}
        onDepartmentChange={setDepartment}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onRecordPaymentClick={() => setRecordModalOpen(true)}
      />

      <AccountantPaymentsTable
        payments={filteredPayments}
        totalCount={152}
        onViewPayment={handleViewPayment}
      />

      <AccountantRecordPaymentModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onSavePayment={handleSavePayment}
      />

      <AccountantViewPaymentModal
        payment={selectedPayment}
        onClose={() => {
          setViewModalOpen(false)
          setSelectedPayment(null)
        }}
      />
    </div>
  )
}

