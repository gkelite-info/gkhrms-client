"use client"

import ChairmanRevenueStatCards from "./ChairmanRevenueStatCards"
import ChairmanRevenueTrendChart from "./ChairmanRevenueTrendChart"
import ChairmanRevenueBySourceChart from "./ChairmanRevenueBySourceChart"
import ChairmanCollectionsSummaryCard from "./ChairmanCollectionsSummaryCard"
import ChairmanRecentRevenueTable from "./ChairmanRecentRevenueTable"

export default function ChairmanRevenueTabContent() {
  return (
    <div className="flex flex-col gap-5">
      <ChairmanRevenueStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
          <ChairmanRevenueTrendChart />
        </div>
        <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
          <ChairmanRevenueBySourceChart />
        </div>
        <div className="lg:col-span-6 xl:col-span-3 flex flex-col">
          <ChairmanCollectionsSummaryCard />
        </div>
      </div>

      <ChairmanRecentRevenueTable />
    </div>
  )
}
