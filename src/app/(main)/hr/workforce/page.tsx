"use client"

import React, { Suspense } from "react"
import WorkforceKpiCards from "./components/WorkforceKpiCards"
import DepartmentWiseChart from "./components/DepartmentWiseChart"
import WorkforceTable from "./components/WorkforceTable"

export default function WorkforcePage() {
  return (
    <Suspense fallback={null}>
      <div className="w-full min-h-full px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6 pb-6 flex flex-col gap-4 sm:gap-5 select-none">
        <WorkforceKpiCards />
        <DepartmentWiseChart />
        <WorkforceTable />
      </div>
    </Suspense>
  )
}
