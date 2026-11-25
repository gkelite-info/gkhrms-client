"use client"

import { Suspense } from "react"
import AdminIntegrationAutomation from "../../admin/integration-automation/page"

export default function HrIntegrationAutomationPage() {
  return (
    <Suspense fallback={null}>
      <AdminIntegrationAutomation />
    </Suspense>
  )
}

