"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../context/AccountantContext"

export default function AccountantPaymentsPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Payments")
    router.replace("/accountantmanager?mode=my-finance&tab=payments")
  }, [router, setActiveTab])

  return null
}
