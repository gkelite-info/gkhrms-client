"use client"

import { useState, useMemo } from "react"
import AccountantEmployeeReimbursementKpis from "./AccountantEmployeeReimbursementKpis"
import AccountantEmployeeReimbursementFilterBar from "./AccountantEmployeeReimbursementFilterBar"
import AccountantEmployeeReimbursementTable from "./AccountantEmployeeReimbursementTable"
import AccountantRecordReimbursementPaymentModal from "./AccountantRecordReimbursementPaymentModal"
import AccountantViewReimbursementPaymentModal from "./AccountantViewReimbursementPaymentModal"
import {
  employeeReimbursementPaymentKpis,
  mockEmployeeReimbursementPayments,
} from "../data/mockAccountantData"
import { AccountantEmployeeReimbursementPayment, PaymentSubTab } from "../types"

interface AccountantEmployeeReimbursementsViewProps {
  subTab: PaymentSubTab
  onSubTabChange: (subTab: PaymentSubTab) => void
}

export default function AccountantEmployeeReimbursementsView({
  subTab,
  onSubTabChange,
}: AccountantEmployeeReimbursementsViewProps) {
  const [payments, setPayments] = useState<
    AccountantEmployeeReimbursementPayment[]
  >(mockEmployeeReimbursementPayments)

  const [dateRange, setDateRange] = useState("01 Nov 2026 – 30 Nov 2026")
  const [employee, setEmployee] = useState("All Employees")
  const [department, setDepartment] = useState("All Departments")
  const [paymentStatus, setPaymentStatus] = useState("All Status")
  const [paymentMethod, setPaymentMethod] = useState("All Methods")

  const [recordModalOpen, setRecordModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] =
    useState<AccountantEmployeeReimbursementPayment | null>(null)

  const handleViewPayment = (payment: AccountantEmployeeReimbursementPayment) => {
    setSelectedPayment(payment)
    setViewModalOpen(true)
  }

  const handleSavePayment = (
    newPayment: AccountantEmployeeReimbursementPayment
  ) => {
    setPayments((prev) => [newPayment, ...prev])
  }

  const filteredPayments = useMemo(() => {
    return payments.filter((item) => {
      if (employee !== "All Employees" && item.employeeName !== employee) {
        return false
      }

      if (
        department !== "All Departments" &&
        item.department?.toLowerCase() !== department.toLowerCase()
      ) {
        return false
      }

      if (
        paymentStatus !== "All Status" &&
        item.status.toLowerCase() !== paymentStatus.toLowerCase()
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
  }, [payments, employee, department, paymentStatus, paymentMethod])

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantEmployeeReimbursementKpis
        kpis={employeeReimbursementPaymentKpis}
      />

      <AccountantEmployeeReimbursementFilterBar
        subTab={subTab}
        onSubTabChange={onSubTabChange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        employee={employee}
        onEmployeeChange={setEmployee}
        department={department}
        onDepartmentChange={setDepartment}
        paymentStatus={paymentStatus}
        onPaymentStatusChange={setPaymentStatus}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onRecordPaymentClick={() => setRecordModalOpen(true)}
      />

      <AccountantEmployeeReimbursementTable
        payments={filteredPayments}
        onViewPayment={handleViewPayment}
      />

      <AccountantRecordReimbursementPaymentModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onSavePayment={handleSavePayment}
      />

      <AccountantViewReimbursementPaymentModal
        payment={selectedPayment}
        onClose={() => {
          setViewModalOpen(false)
          setSelectedPayment(null)
        }}
      />
    </div>
  )
}

