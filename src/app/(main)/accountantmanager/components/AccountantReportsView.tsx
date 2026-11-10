"use client"

import { useState } from "react"
import AccountantReportKpis from "./AccountantReportKpis"
import AccountantReportFilterBar from "./AccountantReportFilterBar"
import AccountantReportTrendChart from "./AccountantReportTrendChart"
import AccountantReportExpenseCategoriesDonut from "./AccountantReportExpenseCategoriesDonut"
import AccountantReportSummaryTable from "./AccountantReportSummaryTable"
import AccountantViewReportModal from "./AccountantViewReportModal"
import {
  accountantReportKpis,
  reportTrendData,
  reportExpenseCategories,
  reportSummaryRows,
} from "../data/mockAccountantData"
import { ReportSummaryRow } from "../types"

export default function AccountantReportsView() {
  const [reportType, setReportType] = useState("Monthly Summary")
  const [dateRange, setDateRange] = useState("01 Jun 2026 - 30 Nov 2026")
  const [department, setDepartment] = useState("All Departments")
  const [category, setCategory] = useState("All Categories")

  const [selectedReport, setSelectedReport] = useState<ReportSummaryRow | null>(
    null
  )
  const [viewModalOpen, setViewModalOpen] = useState(false)

  const handleViewReport = (report: ReportSummaryRow) => {
    setSelectedReport(report)
    setViewModalOpen(true)
  }

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <AccountantReportKpis kpis={accountantReportKpis} />

      <AccountantReportFilterBar
        reportType={reportType}
        onReportTypeChange={setReportType}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        department={department}
        onDepartmentChange={setDepartment}
        category={category}
        onCategoryChange={setCategory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 xl:gap-4 items-stretch">
        <div className="lg:col-span-7">
          <AccountantReportTrendChart data={reportTrendData} />
        </div>
        <div className="lg:col-span-5">
          <AccountantReportExpenseCategoriesDonut
            categories={reportExpenseCategories}
            totalExpenseText="₹ 18,76,200"
          />
        </div>
      </div>

      <AccountantReportSummaryTable
        rows={reportSummaryRows}
        onViewReport={handleViewReport}
      />

      <AccountantViewReportModal
        report={selectedReport}
        onClose={() => {
          setViewModalOpen(false)
          setSelectedReport(null)
        }}
      />
    </div>
  )
}

