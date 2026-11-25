"use client"

import { Suspense } from "react"
import EmployeeEngagePage from "../../employee/engage/page"

export default function HrEngagePage() {
  return (
    <Suspense fallback={null}>
      <EmployeeEngagePage />
    </Suspense>
  )
}

