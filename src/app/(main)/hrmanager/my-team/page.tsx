"use client"

import { Suspense } from "react"
import { TeamsManagementView } from "../../../../../reusableComponents/teams-management"

export default function HrManagerMyTeamPage() {
  return (
    <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-gray-400" />}>
      <TeamsManagementView currentRole="hrmanager" />
    </Suspense>
  )
}
