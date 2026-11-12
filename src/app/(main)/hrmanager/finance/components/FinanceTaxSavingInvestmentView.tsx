"use client"

import React from "react"
import { ExternalLink } from "lucide-react"

const CARD_ONE_BULLETS = [
  "Save up to ₹46,800 in taxes annually by investing in top-performing ELSS mutual funds.",
  "InvestEase automatically monitors and rebalances your investment portfolio for optimal returns.",
  "Enjoy a fully digital, paperless, and zero-commission investment process.",
  "Complete your investment in under 5 minutes using your GK HRMS credentials.",
  "Gain access to diversified funds with high returns and low lock-in periods.",
  "Track all your tax-saving investments in one place directly from your HRMS.",
]

const CARD_TWO_BULLETS = [
  "Divert your taxable income into smart investments like ELSS, NPS, and Insurance.",
  "Get personalized suggestions through TaxOptimizer+ integrated in GK HRMS.",
  "Track your portfolio performance anytime from the My Finances section.",
  "Transparent dashboard — view total savings, investment growth, and tax benefit summaries.",
  "Start your journey toward smart, goal-based investing today!",
]

export interface FinanceTaxSavingInvestmentViewProps {
  onInvest?: () => void
  onExplore?: () => void
}

export default function FinanceTaxSavingInvestmentView({
  onInvest,
  onExplore,
}: FinanceTaxSavingInvestmentViewProps) {
  const handleInvestClick = () => {
    if (onInvest) {
      onInvest()
    } else {
      window.open("https://quicko.com", "_blank", "noopener,noreferrer")
    }
  }

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore()
    } else {
      window.open("https://quicko.com", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="w-full bg-white rounded-xl p-5 sm:p-6 md:p-7 border border-slate-100 shadow-2xs flex flex-col gap-4 sm:gap-5">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Tax Saving Investment
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Grow your savings smartly while reducing your taxable income.
        </p>
      </div>

      <div className="rounded-lg border border-slate-300 p-4 sm:p-5 md:p-6 flex flex-col gap-3.5 sm:gap-4 text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Wondering how to save tax and build wealth together?
          </h3>
          <button
            type="button"
            onClick={handleInvestClick}
            className="w-fit self-start sm:self-auto bg-[#8570EE] hover:bg-[#745ee4] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <span>Invest & Save Tax</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <ul className="flex flex-col gap-2 text-slate-700">
          {CARD_ONE_BULLETS.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-slate-800 font-bold shrink-0 leading-5 select-none">
                •
              </span>
              <span className="leading-5">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-slate-300 p-4 sm:p-5 md:p-6 flex flex-col gap-3.5 sm:gap-4 text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            Grow Your Financial Wellness
          </h3>
          <button
            type="button"
            onClick={handleExploreClick}
            className="w-fit self-start sm:self-auto bg-[#8570EE] hover:bg-[#745ee4] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <span>Explore Tax Options</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <ul className="flex flex-col gap-2 text-slate-700">
          {CARD_TWO_BULLETS.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-slate-800 font-bold shrink-0 leading-5 select-none">
                •
              </span>
              <span className="leading-5">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

