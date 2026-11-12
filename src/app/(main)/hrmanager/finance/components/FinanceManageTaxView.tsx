"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import FinanceFormsView from "./FinanceFormsView"
import FinanceTaxFilingView from "./FinanceTaxFilingView"
import FinanceTaxSavingInvestmentView from "./FinanceTaxSavingInvestmentView"

export interface FinanceManageTaxViewProps {
  basePath?: string
}

type ManageTaxSubTab =
  | "declaration"
  | "forms"
  | "tax_filing"
  | "tax_saving_investment"

interface SubTabItem {
  id: ManageTaxSubTab
  label: string
}

const SUB_TABS: SubTabItem[] = [
  { id: "declaration", label: "Declaration" },
  { id: "forms", label: "Forms" },
  { id: "tax_filing", label: "Tax Filing" },
  { id: "tax_saving_investment", label: "Tax Saving Investment" },
]

const normalizeSubTab = (param: string | null): ManageTaxSubTab => {
  const lower = param?.toLowerCase()
  if (lower === "forms" || lower === "form") return "forms"
  if (lower === "tax_filing" || lower === "tax-filing" || lower === "taxfiling")
    return "tax_filing"
  if (
    lower === "tax_saving_investment" ||
    lower === "tax-saving-investment" ||
    lower === "tax_saving" ||
    lower === "investment"
  ) {
    return "tax_saving_investment"
  }
  return "declaration"
}

export default function FinanceManageTaxView({
  basePath = "/hrmanager/finance",
}: FinanceManageTaxViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawSubTab = searchParams.get("subtab")

  const [activeSubTab, setActiveSubTab] = useState<ManageTaxSubTab>(() =>
    normalizeSubTab(rawSubTab)
  )

  useEffect(() => {
    setActiveSubTab(normalizeSubTab(rawSubTab))
  }, [rawSubTab])

  const handleSelectSubTab = (tabId: ManageTaxSubTab) => {
    setActiveSubTab(tabId)
    const sep = basePath.includes("?") ? "&" : "?"
    router.push(`${basePath}${sep}tab=manage_tax&subtab=${tabId}`)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full select-none mb-3 sm:mb-3.5">
        {SUB_TABS.map((tab) => {
          const isActive = activeSubTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectSubTab(tab.id)}
              className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold text-center transition-all cursor-pointer shadow-2xs ${
                isActive
                  ? "bg-[#8570EE] text-white"
                  : "bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="w-full flex flex-col pb-4">
        {activeSubTab === "declaration" && (
          <div className="w-full flex flex-col gap-3.5 sm:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col gap-2.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Investment Declaration
                </h3>

                <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-baseline">
                    <span className="font-semibold text-slate-800">
                      Current windows :
                    </span>
                    <span className="text-slate-600 font-normal ml-2">
                      Till Aug 25, 2025
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline">
                    <span className="font-semibold text-slate-800">
                      Monthly windows :
                    </span>
                    <span className="text-slate-600 font-normal ml-2">
                      1st to 25th of every month till 15th jan 2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col gap-2.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Proof Submission
                </h3>

                <div className="flex items-baseline text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800">
                    Current windows :
                  </span>
                  <span className="text-slate-600 font-normal ml-2">
                    Till Aug 25, 2025
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
                <span className="text-xs text-slate-600 font-normal">
                  Net Taxable Income
                </span>
                <div className="flex flex-wrap items-baseline gap-3 mt-1.5">
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    INR 3,39,200
                  </span>
                  <span className="text-xs text-slate-600 font-normal hover:text-[#8570EE] cursor-pointer transition-colors">
                    Income Tax Computation
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
                <span className="text-xs text-slate-600 font-normal">
                  Total tax Payable
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">
                  INR 0
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs flex flex-col justify-between">
                <span className="text-xs text-slate-600 font-normal">
                  Tax Already Paid
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">
                  INR 0
                </span>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "forms" && <FinanceFormsView />}

        {activeSubTab === "tax_filing" && <FinanceTaxFilingView />}

        {activeSubTab === "tax_saving_investment" && (
          <FinanceTaxSavingInvestmentView />
        )}
      </div>
    </div>
  )
}

