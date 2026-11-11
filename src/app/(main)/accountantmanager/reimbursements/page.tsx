"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccountant } from "../context/AccountantContext"

export default function AccountantReimbursementsPage() {
  const router = useRouter()
  const { setActiveTab } = useAccountant()

  useEffect(() => {
    setActiveTab("Reimbursements")
    router.replace("/accountantmanager?mode=my-finance&tab=reimbursements")
  }, [router, setActiveTab])

  return null
}
