"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../context/AccountantContext"

export default function AccountantTransactionsPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Transactions")
    router.replace("/accountantmanager?mode=my-finance&tab=transactions")
  }, [router, setActiveTab])

  return null
}
