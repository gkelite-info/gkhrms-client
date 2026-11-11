"use client"

import { useState, useMemo } from "react"
import { useAccountant } from "../context/AccountantContext"
import AccountantExpenseKpis from "./AccountantExpenseKpis"
import AccountantExpenseFilterBar from "./AccountantExpenseFilterBar"
import AccountantExpenseTable from "./AccountantExpenseTable"
import AccountantAddExpenseModal from "./AccountantAddExpenseModal"
import AccountantViewExpenseModal from "./AccountantViewExpenseModal"
import {
  accountantExpenseKpis,
  mockAccountantExpenseEntries,
} from "../data/mockAccountantData"
import { AccountantExpenseEntry } from "../types"

export default function AccountantExpensesView() {
  const [entries, setEntries] = useState<AccountantExpenseEntry[]>(
    mockAccountantExpenseEntries
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [expenseType, setExpenseType] = useState("All Expense Types")
  const [status, setStatus] = useState("All Status")
  const [dateRange, setDateRange] = useState("01 Nov 2026 - 30 Nov 2026")

  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<AccountantExpenseEntry | null>(
    null
  )

  const handleOpenAddModal = () => {
    setSelectedEntry(null)
    setModalOpen(true)
  }

  const handleViewEntry = (entry: AccountantExpenseEntry) => {
    setSelectedEntry(entry)
    setViewModalOpen(true)
  }

  const handleEditEntry = (entry: AccountantExpenseEntry) => {
    setSelectedEntry(entry)
    setModalOpen(true)
  }

  const handleSaveExpense = (savedRecord: AccountantExpenseEntry) => {
    setEntries((prev) => {
      const index = prev.findIndex((item) => item.id === savedRecord.id)
      if (index >= 0) {
        const next = [...prev]
        next[index] = savedRecord
        return next
      }
      return [savedRecord, ...prev]
    })
  }

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      if (
        expenseType !== "All Expense Types" &&
        item.expenseType.toLowerCase() !== expenseType.toLowerCase()
      ) {
        return false
      }

      if (
        status !== "All Status" &&
        item.status.toLowerCase() !== status.toLowerCase()
      ) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          item.id.toLowerCase().includes(q) ||
          item.vendor.toLowerCase().includes(q) ||
          item.billNumber.toLowerCase().includes(q) ||
          item.expenseType.toLowerCase().includes(q) ||
          item.amount.toLowerCase().includes(q)
        if (!matches) return false
      }

      return true
    })
  }, [entries, expenseType, status, searchQuery])

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantExpenseKpis kpis={accountantExpenseKpis} />

      <AccountantExpenseFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        expenseType={expenseType}
        onExpenseTypeChange={setExpenseType}
        status={status}
        onStatusChange={setStatus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onAddExpenseClick={handleOpenAddModal}
      />

      <AccountantExpenseTable
        entries={filteredEntries}
        totalCount={128}
        onViewClick={handleViewEntry}
        onEditClick={handleEditEntry}
      />

      <AccountantAddExpenseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedEntry(null)
        }}
        onSave={handleSaveExpense}
        initialData={selectedEntry}
      />

      <AccountantViewExpenseModal
        expense={selectedEntry}
        onClose={() => {
          setViewModalOpen(false)
          setSelectedEntry(null)
        }}
        onEdit={handleEditEntry}
      />
    </div>
  )
}

