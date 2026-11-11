"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../context/AccountantContext"

export default function AccountantExpensesPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Expense Entries")
    router.replace("/accountantmanager?mode=my-finance&tab=expense-entries")
  }, [router, setActiveTab])

  return null
}
