"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../finance/context/AccountantContext"

export default function AccountantPaymentsPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Payments")
    router.replace("/accountantmanager/finance?mode=my-finance&tab=payments")
  }, [router, setActiveTab])

  return null
}
