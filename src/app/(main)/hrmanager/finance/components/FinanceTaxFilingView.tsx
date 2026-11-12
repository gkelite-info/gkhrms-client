"use client"

import React from "react"

const WHY_CHOOSE_ITEMS = [
  "Trusted by 1.5M+ employees across India",
  "Auto-imports Form 16 & deduction data from GK HRMS",
  "Instant tax refund calculation",
  "Step-by-step guided filing",
  "Expert review option available",
]

const HOW_TO_FILE_STEPS = [
  "Log in to SmartTax through your GK HRMS account",
  "Verify pre-filled details (income, deductions, and PAN info)",
  "Review tax summary and select “File ITR”",
  "Download acknowledgment instantly",
]

export default function FinanceTaxFilingView() {
  return (
    <div className="w-full bg-white rounded-xl p-5 sm:p-6 md:p-7 border border-slate-100 shadow-2xs flex flex-col gap-4 sm:gap-5">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Tax Filing
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          E-file your income tax returns easily through trusted HRMS partners.
        </p>
      </div>

      <div>
        <div className="w-fit rounded-md border border-slate-400/80 px-3.5 py-1.5 text-xs sm:text-sm text-slate-700 font-normal">
          Filing due date for FY 2024–25 (AY 2025–26) is September 15, 2025
        </div>
      </div>

      <div className="rounded-lg border border-slate-400/80 p-4 sm:p-5 md:p-6 flex flex-col gap-3.5 sm:gap-4 text-xs sm:text-sm">
        <h3 className="font-bold text-sm sm:text-base text-slate-900">
          GK’s Choice
        </h3>

        <div className="text-slate-700 leading-relaxed space-y-1">
          <p>
            SmartTax is a government-authorized e-filing platform integrated with HRMS to simplify tax filing for employees.
          </p>
          <p>
            It enables auto-fetching of Form 16, deductions, and investment details directly from your HRMS portal — making filing accurate and hassle-free.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <h4 className="font-bold text-slate-900">Why Choose GK :</h4>
          <ul className="flex flex-col gap-1.5 text-slate-800">
            {WHY_CHOOSE_ITEMS.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-sm leading-none shrink-0 select-none" aria-hidden="true">
                  ✅
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <h4 className="font-bold text-slate-900">How to File Via Smart Tax</h4>
          <ol className="flex flex-col gap-1 text-slate-800">
            {HOW_TO_FILE_STEPS.map((step, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <span className="shrink-0">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

