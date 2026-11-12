"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../finance/context/AccountantContext"

export default function AccountantExpensesPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Expense Entries")
    router.replace("/accountantmanager/finance?mode=my-finance&tab=expense-entries")
  }, [router, setActiveTab])

  return null
}
