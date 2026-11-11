"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../context/AccountantContext"

export default function AccountantReportsPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Reports")
    router.replace("/accountantmanager?mode=my-finance&tab=reports")
  }, [router, setActiveTab])

  return null
}
