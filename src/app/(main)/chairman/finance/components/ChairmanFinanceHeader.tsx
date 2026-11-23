"use client"

import {
  CreditCard,
  Database,
  Calendar,
  Layers,
  Wallet,
  Target,
  ChevronDown,
  Upload,
} from "lucide-react"
import { ChairmanFinanceTab } from "./ChairmanFinanceTabs"

interface ChairmanFinanceHeaderProps {
  activeTab?: ChairmanFinanceTab
}

export default function ChairmanFinanceHeader({
  activeTab = "overview",
}: ChairmanFinanceHeaderProps) {
  const getHeaderMeta = () => {
    switch (activeTab) {
      case "revenue":
        return {
          icon: Database,
          title: "Revenue",
          subtitle:
            "Monitor your company's earnings, collections, and revenue performance.",
        }
      case "expenses":
        return {
          icon: Layers,
          title: "Expenses",
          subtitle:
            "Track company spending, view trends and analyze expenses by department and category.",
        }
      case "payroll":
        return {
          icon: Wallet,
          title: "Payroll Cost",
          subtitle:
            "Monitor salary expenses, department-wise payroll distribution, and monthly payroll trends.",
        }
      case "receivables_payables":
        return {
          customIcon: (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 text-[#5B50E5] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
              GK
            </div>
          ),
          title: "Receivables & Payables",
          subtitle:
            "Track money to be received from clients and money to be paid to vendors and partners.",
        }
      case "reports":
        return {
          icon: Target,
          title: "Finance Reports",
          subtitle:
            "High-level financial reports and summaries for company performance.",
        }
      case "overview":
      default:
        return {
          icon: CreditCard,
          title: "Finance Overview",
          subtitle:
            "Monitor your company's revenue, expenses, payroll cost and overall financial health.",
        }
    }
  }

  const meta = getHeaderMeta()
  const HeaderIcon = meta.icon

  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-3.5">
        {meta.customIcon ? (
          meta.customIcon
        ) : HeaderIcon ? (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 text-[#5B50E5] border border-purple-100 flex items-center justify-center shrink-0">
            <HeaderIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        ) : null}
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {meta.title}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {activeTab === "expenses" ? (
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-2 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] sm:text-xs">
              Jan 01, 2026 – Nov 25, 2026
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </div>

          <button
            type="button"
            className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer text-xs font-semibold text-slate-700"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      ) : activeTab === "receivables_payables" ? (
        <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-2 shadow-2xs text-xs font-medium text-slate-700 self-start md:self-auto">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] sm:text-xs">
            Jan 01, 2026 – Nov 25, 2026
          </span>
        </div>
      ) : activeTab === "payroll" || activeTab === "reports" ? null : (
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center gap-3 self-start md:self-auto">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block leading-tight">
              Tuesday, 26 Aug 2025
            </span>
            <span className="text-[10px] text-slate-400 font-normal block leading-tight mt-0.5">
              Last 12 Months (Sep 2024 - Aug 2025)
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
