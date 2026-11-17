"use client"

import ActivePaidCompaniesHeader from "./components/ActivePaidCompaniesHeader"
import ActivePaidCompaniesStatCards from "./components/ActivePaidCompaniesStatCards"
import ActivePaidCompaniesTable from "./components/ActivePaidCompaniesTable"

export default function ActivePaidCompaniesPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pb-12">
      <ActivePaidCompaniesHeader />
      <ActivePaidCompaniesStatCards />
      <ActivePaidCompaniesTable />
    </div>
  )
}
