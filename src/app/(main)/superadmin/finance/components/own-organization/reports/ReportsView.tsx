"use client"

import { useState } from "react"
import ReportsHeader from "./ReportsHeader"
import ReportsStatCards from "./ReportsStatCards"
import ReportsMonthlyTrendChart from "./ReportsMonthlyTrendChart"
import ReportsExpensesDonutChart from "./ReportsExpensesDonutChart"
import ReportsHighlightsCard from "./ReportsHighlightsCard"
import ReportsSummaryTable from "./ReportsSummaryTable"
import { REPORT_SUMMARY_DATA } from "./ReportsData"

export default function ReportsView() {
  const [selectedRange, setSelectedRange] = useState(
    "Nov 01, 2026 - Nov 30, 2026"
  )

  const handleExportExcel = () => {
    const csvRows = [
      ["Report", "Key Metrics (Nov 2026)", "Change vs Oct 2026"],
      ...REPORT_SUMMARY_DATA.map((row) => [
        row.reportName,
        `"${row.keyMetrics}"`,
        row.change,
      ]),
    ]
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `GK_HRMS_Reports_${selectedRange.replace(/ /g, "_")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-6">
      <ReportsHeader
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        onExportExcel={handleExportExcel}
      />
      <ReportsStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <ReportsMonthlyTrendChart />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <ReportsExpensesDonutChart />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <ReportsHighlightsCard />
        </div>
      </div>

      <ReportsSummaryTable />
    </div>
  )
}
