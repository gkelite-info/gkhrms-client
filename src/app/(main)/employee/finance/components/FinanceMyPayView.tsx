"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Download } from "lucide-react"
import { ReusableCalendar } from "@/../reusableComponents"
import FinanceIncomeTaxView from "./FinanceIncomeTaxView"
import { downloadPayslipPdf } from "../utils/downloadPdf"
import { DEFAULT_PAYSLIP_DATA } from "./EmployeePayslipDocument"
import { HrPayrollEmployee } from "./hrPayrollData"
import AddPayDetailsModal, { AddPayDetailsData } from "./AddPayDetailsModal"

export interface FinanceMyPayViewProps {
  onViewPayslip: () => void
  basePath?: string
  employee?: HrPayrollEmployee
  isHrMode?: boolean
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

function parseAmount(raw: string): number {
  const cleaned = raw.replace(/,/g, "").trim()
  const parsed = Number(cleaned)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function formatInr(amount: number): string {
  return `INR ${amount.toLocaleString("en-IN")}`
}

export default function FinanceMyPayView({
  onViewPayslip,
  basePath = "/employee/finance",
  employee,
  isHrMode = false,
}: FinanceMyPayViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rawSubTab = searchParams.get("subtab")
  const modalParam = searchParams.get("modal")?.toLowerCase()
  const actionParam = searchParams.get("action")?.toLowerCase()
  const addPayParam = (
    searchParams.get("addpay") || searchParams.get("addPay")
  )?.toLowerCase()

  const isAddPayModalOpen =
    isHrMode &&
    (modalParam === "add-pay" ||
      modalParam === "addpay" ||
      actionParam === "add-pay" ||
      actionParam === "addpay" ||
      addPayParam === "true")

  const [savedPayByEmployee, setSavedPayByEmployee] = useState<
    Record<string, AddPayDetailsData>
  >({})

  const parseSubTab = useCallback(
    (param: string | null): "salary_payslips" | "income_tax" => {
      const lower = param?.toLowerCase()
      if (lower === "income_tax" || lower === "incometax") {
        return "income_tax"
      }
      return "salary_payslips"
    },
    []
  )

  const [subTab, setSubTab] = useState<"salary_payslips" | "income_tax">(() =>
    parseSubTab(rawSubTab)
  )

  useEffect(() => {
    setSubTab(parseSubTab(rawSubTab))
  }, [rawSubTab, parseSubTab])

  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search)
      setSubTab(parseSubTab(currentParams.get("subtab")))
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [parseSubTab])

  const targetPathname = pathname || basePath.split("?")[0]

  const handleSelectSubTab = (tab: "salary_payslips" | "income_tax") => {
    setSubTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "mypay")
    params.set("subtab", tab)
    params.delete("modal")
    params.delete("action")
    params.delete("addpay")
    params.delete("addPay")
    const url = `${targetPathname}?${params.toString()}`
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", url)
    }
    router.push(url, { scroll: false })
  }

  const handleOpenAddPay = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "mypay")
    params.set("modal", "add-pay")
    const url = `${targetPathname}?${params.toString()}`
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", url)
    }
    router.push(url, { scroll: false })
  }

  const handleCloseAddPay = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("modal")
    params.delete("action")
    params.delete("addpay")
    params.delete("addPay")
    const query = params.toString()
    const url = query ? `${targetPathname}?${query}` : targetPathname
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", url)
    }
    router.push(url, { scroll: false })
  }

  const employeeKey = employee?.employeeId || "default"
  const savedPayData = savedPayByEmployee[employeeKey] || null

  const handleSavePayDetails = (data: AddPayDetailsData) => {
    setSavedPayByEmployee((prev) => ({
      ...prev,
      [employeeKey]: data,
    }))
  }

  const salarySummary = useMemo(() => {
    if (!savedPayData) {
      return {
        compensation: "INR 8,50,000/Annum",
        regularSalary: "INR 8,50,000",
        other: "INR 5",
        bonus: "INR 50,00,000",
        total: "INR 9,00,005",
      }
    }
    const regularNum =
      parseAmount(savedPayData.fixedPay) || parseAmount(savedPayData.basicSalary)
    const totalBonusNum = savedPayData.bonuses.reduce(
      (sum, item) => sum + parseAmount(item.bonusAmount),
      0
    )
    const otherNum =
      parseAmount(savedPayData.hra) +
      parseAmount(savedPayData.telephoneAllowance) +
      parseAmount(savedPayData.transportationAllowance) +
      parseAmount(savedPayData.otherAllowance)
    const ctcNum =
      parseAmount(savedPayData.totalCtc) ||
      regularNum + otherNum + totalBonusNum
    const totalNum = regularNum + otherNum + totalBonusNum

    return {
      compensation: `${formatInr(ctcNum)}/Annum`,
      regularSalary: formatInr(regularNum),
      other: formatInr(otherNum),
      bonus: formatInr(totalBonusNum),
      total: formatInr(totalNum),
    }
  }, [savedPayData])

  const handleDownloadCard = (cardTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const sanitizedTitle = cardTitle.replace(/\s+/g, "_")
    const empSlug = (employee?.name || "Alexander").replace(/\s+/g, "_")
    downloadPayslipPdf(
      DEFAULT_PAYSLIP_DATA,
      `Payslip_${empSlug}_${sanitizedTitle}.pdf`
    )
  }

  return (
    <div className="w-full flex flex-col">
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 select-none mb-3 sm:mb-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelectSubTab("salary_payslips")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              subTab === "salary_payslips"
                ? "bg-[#D4D0FA] text-[#312E81] shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {isHrMode ? "Salary & Pay Slips" : "My Salary & Pay Slips"}
          </button>

          <button
            type="button"
            onClick={() => handleSelectSubTab("income_tax")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              subTab === "income_tax"
                ? "bg-[#D4D0FA] text-[#312E81] shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Income TAX
          </button>
        </div>

        {isHrMode && (
          <button
            type="button"
            onClick={handleOpenAddPay}
            className="ml-auto px-3.5 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap bg-[#7D73E3] hover:bg-[#6A5FD8] text-white shadow-2xs transition-all cursor-pointer"
          >
            Add Pay
          </button>
        )}
      </div>

      <div className="w-full flex flex-col pb-4">
        {subTab === "income_tax" ? (
          <FinanceIncomeTaxView />
        ) : (
          <div className="w-full flex flex-col gap-3.5 sm:gap-4">
            <div className="w-full flex flex-col gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {isHrMode ? "Salary" : "My Salary"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="bg-white rounded-xl py-3 px-4 border border-slate-100 shadow-2xs flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] text-slate-500 font-normal">
                    Current Compensation
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    {salarySummary.compensation}
                  </span>
                </div>

                <div className="bg-white rounded-xl py-3 px-4 sm:px-6 md:px-10 border border-slate-100 shadow-2xs flex items-center justify-between">
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
                            {salarySummary.regularSalary}
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                            Other
                          </div>
                          <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                            {salarySummary.other}
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                            Bonus
                          </div>
                          <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                            {salarySummary.bonus}
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-[11px] sm:text-xs text-slate-900">
                            Total
                          </div>
                          <div className="text-[11px] sm:text-xs text-slate-600 mt-1">
                            {salarySummary.total}
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
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100/90 pb-2">
                        <button
                          type="button"
                          onClick={onViewPayslip}
                          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#5B50EC] transition-colors cursor-pointer text-left"
                        >
                          {card.title}
                        </button>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-xs text-slate-700">
                            Status -{" "}
                            <span className="text-emerald-600 font-semibold">
                              {card.status}
                            </span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleDownloadCard(card.title, e)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B50EC] hover:text-[#4338CA] transition-colors cursor-pointer sm:ml-1"
                          >
                            <span>Download</span>
                            <Download className="w-3.5 h-3.5 stroke-[2]" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs">
                        <div className="flex items-center justify-between sm:justify-start">
                          <span className="w-24 sm:w-20 shrink-0 font-semibold text-slate-800">
                            Pay Date :
                          </span>
                          <span className="text-slate-600 font-normal sm:ml-2">
                            {card.payDate}
                          </span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end">
                          <span className="w-24 shrink-0 font-semibold text-slate-800">
                            Deductions :
                          </span>
                          <span className="text-slate-600 font-normal sm:ml-2">
                            {card.deductions}
                          </span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-start">
                          <span className="w-24 sm:w-20 shrink-0 font-semibold text-slate-800">
                            Gross Pay :
                          </span>
                          <span className="text-slate-600 font-normal sm:ml-2">
                            {card.grossPay}
                          </span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end">
                          <span className="w-24 shrink-0 font-semibold text-slate-800">
                            Net Pay :
                          </span>
                          <span className="text-slate-600 font-normal sm:ml-2">
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

      {isHrMode && (
        <AddPayDetailsModal
          isOpen={isAddPayModalOpen}
          onClose={handleCloseAddPay}
          employee={employee}
          initialData={savedPayData}
          onSave={handleSavePayDetails}
        />
      )}
    </div>
  )
}
