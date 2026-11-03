"use client"

import StatusCards from "./components/StatusCards"
import TeamTreeChart from "./components/TeamTreeChart"
import TeamCalendar from "./components/TeamCalendar"

export default function HrMyTeamPage() {
  return (
    <div className="w-full min-h-full px-4 pt-4 md:px-6 md:pt-6 pb-4 md:pb-5 flex flex-col gap-5 md:gap-6 select-none">
      <StatusCards />
      <TeamTreeChart />
      <TeamCalendar />
      <div className="w-full h-4 shrink-0" aria-hidden="true" />
    </div>
  )
}

