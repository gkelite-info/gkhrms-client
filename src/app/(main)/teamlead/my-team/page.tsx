"use client"

import { Suspense } from "react"
import TeamLeadMyTeamView from "../../../../../reusableComponents/teams-management/team-lead/TeamLeadMyTeamView"

export default function TeamLeadMyTeamPage() {
  return (
    <Suspense fallback={null}>
      <TeamLeadMyTeamView />
    </Suspense>
  )
}
