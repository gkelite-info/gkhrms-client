import React from "react"

interface TaxMetric {
  label: string
  value: string
}

interface SalaryBreakupRow {
  component: string
  total: string
  apr: string
  may: string
  jun: string
  jul: string
  aug: string
  sep: string
}

const TAX_METRICS: TaxMetric[] = [
  { label: "Net Taxable Income", value: "INR 3,39,200" },
  { label: "Gross Income Tax", value: "INR 3,39,200" },
  { label: "Total Surcharge & Cess", value: "INR 3,39,200" },
  { label: "Net Income Tax Payable", value: "INR 3,39,200" },
  { label: "TAX paid Till Now", value: "INR 0" },
  { label: "Remaining Tax To Be Paid", value: "INR 0" },
]

const SALARY_BREAKUP_DATA: SalaryBreakupRow[] = [
  {
    component: "Basic",
    total: "2,12.500",
    apr: "37,417",
    may: "37,417",
    jun: "37,417",
    jul: "37,417",
    aug: "37,417",
    sep: "37,417",
  },
  {
    component: "HRA",
    total: "85,000",
    apr: "14,234",
    may: "14,234",
    jun: "14,234",
    jul: "14,234",
    aug: "14,234",
    sep: "14,234",
  },
]

export default function FinanceIncomeTaxView() {
  return (
    <div className="w-full flex flex-col gap-3 sm:gap-3.5">
      <div className="w-full bg-white rounded-xl shadow-2xs p-3.5 sm:p-4 border border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {TAX_METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight">
                {metric.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-2xs p-3.5 sm:p-4 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[130px]">
                  Salary Breakup
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[90px]">
                  Total
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[80px]">
                  Apr 25
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[80px]">
                  May 25
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[80px]">
                  Jun 25
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[80px]">
                  Jul 25
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 border-r border-slate-100 whitespace-nowrap min-w-[80px]">
                  Aug 25
                </th>
                <th className="py-2.5 px-3 sm:px-4 font-semibold text-slate-800 whitespace-nowrap min-w-[80px]">
                  Sep 25
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SALARY_BREAKUP_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3 sm:px-4 font-medium text-slate-800 border-r border-slate-100 whitespace-nowrap">
                    {row.component}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                    {row.total}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                    {row.apr}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                    {row.may}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                    {row.jun}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                    {row.jul}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                    {row.aug}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                    {row.sep}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

