"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Download } from "lucide-react"
import { ReusableCalendar } from "@/../reusableComponents"
import FinanceIncomeTaxView from "./FinanceIncomeTaxView"
import { downloadPayslipPdf } from "../utils/downloadPdf"
import { DEFAULT_PAYSLIP_DATA } from "./EmployeePayslipDocument"

export interface FinanceMyPayViewProps {
  onViewPayslip: () => void
  basePath?: string
}

interface PaySlipCardData {
  title: string
  status: string
  payDate: string
  grossPay: string
  deductions: string
  netPay: string
}

const PAY_SLIP_ITEMS: PaySlipCardData[] = [
  {
    title: "January 2025",
    status: "Paid",
    payDate: "23/09/2025",
    grossPay: "45,500.0",
    deductions: "5,80.00",
    netPay: "6,90.00",
  },
  {
    title: "February",
    status: "Paid",
    payDate: "23/09/2025",
    grossPay: "45,500.0",
    deductions: "5,80.00",
    netPay: "6,90.00",
  },
]

export default function FinanceMyPayView({
  onViewPayslip,
  basePath = "/hrmanager/finance",
}: FinanceMyPayViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawSubTab = searchParams.get("subtab")

  const [subTab, setSubTab] = useState<"salary_payslips" | "income_tax">(
    () => (rawSubTab?.toLowerCase() === "income_tax" || rawSubTab?.toLowerCase() === "incometax" ? "income_tax" : "salary_payslips")
  )

  useEffect(() => {
    if (rawSubTab?.toLowerCase() === "income_tax" || rawSubTab?.toLowerCase() === "incometax") {
      setSubTab("income_tax")
    } else {
      setSubTab("salary_payslips")
    }
  }, [rawSubTab])

  const handleSelectSubTab = (tab: "salary_payslips" | "income_tax") => {
    setSubTab(tab)
    const sep = basePath.includes("?") ? "&" : "?"
    router.push(`${basePath}${sep}tab=mypay&subtab=${tab}`)
  }

  const handleDownloadCard = (cardTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const sanitizedTitle = cardTitle.replace(/\s+/g, "_")
    downloadPayslipPdf(
      DEFAULT_PAYSLIP_DATA,
      `Payslip_Alexander_${sanitizedTitle}.pdf`
    )
  }

  return (
    <div className="w-full flex flex-col">
      <div className="shrink-0 flex items-center gap-2 select-none mb-3 sm:mb-3.5">
        <button
          type="button"
          onClick={() => handleSelectSubTab("salary_payslips")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${subTab === "salary_payslips"
              ? "bg-[#D4D0FA] text-[#312E81] shadow-2xs"
              : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
        >
          My Salary & Pay Slips
        </button>

        <button
          type="button"
          onClick={() => handleSelectSubTab("income_tax")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${subTab === "income_tax"
              ? "bg-[#D4D0FA] text-[#312E81] shadow-2xs"
              : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
        >
          Income TAX
        </button>
      </div>

      <div className="w-full flex flex-col pb-4">
        {subTab === "income_tax" ? (
          <FinanceIncomeTaxView />
        ) : (
        <div className="w-full flex flex-col gap-3.5 sm:gap-4">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              My Salary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="bg-white rounded-xl py-3 px-4 border border-slate-100 shadow-2xs flex flex-col items-center justify-center text-center">
                <span className="text-[11px] text-slate-500 font-normal">
                  Current Compensation
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                  INR 8,50,000/Annum
                </span>
              </div>

              <div className="bg-white rounded-xl py-3 px-6 sm:px-10 border border-slate-100 shadow-2xs flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Payroll
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 font-normal">
                    Paycycle
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    Monthly
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-3 items-stretch mt-0.5">
              <div className="flex-1 min-w-0 bg-white rounded-xl p-3.5 sm:p-4 border border-slate-100 shadow-2xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Salary Timeline
                  </h4>

                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs">
                    <span className="font-bold text-slate-800 text-[10px] sm:text-[11px] uppercase tracking-wide">
                      SALARY Revision :
                    </span>
                    <span className="text-slate-500 text-[10px] sm:text-[11px]">
                      Effective Jan 23, 2025
                    </span>
                    <span className="bg-[#7D73E3] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase ml-1">
                      CURRENT
                    </span>
                  </div>

                  <div className="border border-slate-200/80 rounded-lg p-3 sm:p-3.5 mt-2.5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div>
                        <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                          Regular Salary
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                          INR 8,50,000
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                          Other
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                          INR 5
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                          Bonus
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                          INR 50,00,000
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                          Total
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                          INR 9,00,005
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[215px] shrink-0">
                <ReusableCalendar monthName="January" className="h-full" />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 mt-0.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Pay Slips
            </h3>

            <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-3 items-stretch">
              <div className="w-full lg:w-[215px] shrink-0">
                <ReusableCalendar monthName="January" className="h-full" />
              </div>

              <div className="flex-1 min-w-0 w-full flex flex-col gap-2.5">
                {PAY_SLIP_ITEMS.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-100 shadow-2xs flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100/90 pb-2">
                      <button
                        type="button"
                        onClick={onViewPayslip}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#5B50EC] transition-colors cursor-pointer text-left"
                      >
                        {card.title}
                      </button>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-700">
                          Status -{" "}
                          <span className="text-emerald-600 font-semibold">
                            {card.status}
                          </span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDownloadCard(card.title, e)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B50EC] hover:text-[#4338CA] transition-colors cursor-pointer ml-1"
                        >
                          <span>Download</span>
                          <Download className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                      <div className="flex items-center">
                        <span className="w-20 shrink-0 font-semibold text-slate-800">
                          Pay Date :
                        </span>
                        <span className="text-slate-600 font-normal ml-2">
                          {card.payDate}
                        </span>
                      </div>

                      <div className="flex items-center sm:justify-end">
                        <span className="w-24 shrink-0 font-semibold text-slate-800">
                          Deductions :
                        </span>
                        <span className="text-slate-600 font-normal ml-2">
                          {card.deductions}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="w-20 shrink-0 font-semibold text-slate-800">
                          Gross Pay :
                        </span>
                        <span className="text-slate-600 font-normal ml-2">
                          {card.grossPay}
                        </span>
                      </div>

                      <div className="flex items-center sm:justify-end">
                        <span className="w-24 shrink-0 font-semibold text-slate-800">
                          Net Pay :
                        </span>
                        <span className="text-slate-600 font-normal ml-2">
                          {card.netPay}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

