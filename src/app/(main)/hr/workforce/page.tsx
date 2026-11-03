"use client"

import React from "react"
import WorkforceKpiCards from "./components/WorkforceKpiCards"
import DepartmentWiseChart from "./components/DepartmentWiseChart"
import WorkforceTable from "./components/WorkforceTable"

export default function WorkforcePage() {
  return (
    <div className="w-full min-h-full px-3 pt-2.5 sm:px-4 sm:pt-3 md:px-6 md:pt-4 pb-6 flex flex-col gap-4 sm:gap-5 overflow-y-auto overflow-x-hidden scrollbar-hide select-none">
      <WorkforceKpiCards />
      <DepartmentWiseChart />
      <WorkforceTable />
    </div>
  )
}
