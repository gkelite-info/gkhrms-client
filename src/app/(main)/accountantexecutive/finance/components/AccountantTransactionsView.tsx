"use client"

import { useState, useMemo } from "react"
import { useAccountant } from "../context/AccountantContext"
import AccountantTransactionKpis from "./AccountantTransactionKpis"
import AccountantTransactionsFilter from "./AccountantTransactionsFilter"
import AccountantTransactionsTable from "./AccountantTransactionsTable"
import AccountantTransactionModal from "./AccountantTransactionModal"
import {
  accountantTransactionKpis,
  mockAccountantTransactions,
} from "../data/mockAccountantData"
import { AccountantTransaction } from "../types"

export default function AccountantTransactionsView() {
  const { searchQuery } = useAccountant()

  const [dateRange, setDateRange] = useState("01 Nov 2026 - 30 Nov 2026")
  const [transactionType, setTransactionType] = useState(
    "All (Money Received & Paid)"
  )
  const [category, setCategory] = useState("All Categories")
  const [paymentMethod, setPaymentMethod] = useState("All Methods")
  const [selectedTx, setSelectedTx] = useState<AccountantTransaction | null>(
    null
  )

  const filteredTransactions = useMemo(() => {
    return mockAccountantTransactions.filter((tx) => {
      if (
        transactionType !== "All (Money Received & Paid)" &&
        tx.type !== transactionType
      ) {
        return false
      }

      if (category !== "All Categories" && tx.category !== category) {
        return false
      }

      if (paymentMethod !== "All Methods" && tx.paymentMethod !== paymentMethod) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          tx.id.toLowerCase().includes(q) ||
          tx.description.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q) ||
          tx.paymentMethod.toLowerCase().includes(q) ||
          tx.amount.toLowerCase().includes(q) ||
          tx.date.toLowerCase().includes(q)
        if (!matches) return false
      }

      return true
    })
  }, [transactionType, category, paymentMethod, searchQuery])

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantTransactionKpis kpis={accountantTransactionKpis} />

      <AccountantTransactionsFilter
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        transactionType={transactionType}
        onTransactionTypeChange={setTransactionType}
        category={category}
        onCategoryChange={setCategory}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
      />

      <AccountantTransactionsTable
        transactions={filteredTransactions}
        totalCount={152}
        onTransactionClick={setSelectedTx}
      />

      <AccountantTransactionModal
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </div>
  )
}

