"use client"

import { Suspense } from "react"
import EmployeeOrg from "../../employee/org/page"

export default function HrOrgPage() {
  return (
    <Suspense fallback={null}>
      <EmployeeOrg />
    </Suspense>
  )
}

