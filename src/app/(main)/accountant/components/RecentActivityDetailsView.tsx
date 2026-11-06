"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Plus,
  CreditCard,
  RotateCcw,
  Zap,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { RecentActivity } from "../types"
import ViewActivityModal from "./ViewActivityModal"

interface RecentActivityDetailsViewProps {
  activities: RecentActivity[]
  onBack: () => void
}

type FilterType = "all" | "expense" | "payment" | "reimbursement"

const months = [
  "Nov 2026",
  "Oct 2026",
  "Sep 2026",
  "Aug 2026",
  "Jul 2026",
  "Jun 2026",
]

export default function RecentActivityDetailsView({
  activities,
  onBack,
}: RecentActivityDetailsViewProps) {
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [selectedMonth, setSelectedMonth] = useState("Nov 2026")
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<RecentActivity | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const filteredActivities = useMemo(() => {
    if (filterType === "all") return activities
    return activities.filter((act) => act.type === filterType)
  }, [activities, filterType])

  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / pageSize))
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredActivities.slice(start, start + pageSize)
  }, [filteredActivities, currentPage, pageSize])

  const renderActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "expense":
        return (
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </div>
        )
      case "payment":
        return (
          <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-3.5 h-3.5" />
          </div>
        )
      case "reimbursement":
        return (
          <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-3.5 h-3.5" />
          </div>
        )
      default:
        return null
    }
  }

  const renderTypeBadge = (type: RecentActivity["type"]) => {
    switch (type) {
      case "expense":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
            Expense
          </span>
        )
      case "payment":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100">
            Payment
          </span>
        )
      case "reimbursement":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-100">
            Reimbursement
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 xl:space-y-4.5 pb-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
          aria-label="Back to overview"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Recent Finance Activity
          </h1>
          <p className="text-xs text-slate-500">
            Latest financial transactions, expenses, reimbursements and payments.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <button
              type="button"
              onClick={() => {
                setFilterType("all")
                setCurrentPage(1)
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === "all"
                  ? "bg-[#EEF2FF] text-[#4F46E5] border border-indigo-200 shadow-2xs"
                  : "text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>All Activity</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterType("expense")
                setCurrentPage(1)
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === "expense"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs"
                  : "text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Expenses</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterType("payment")
                setCurrentPage(1)
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === "payment"
                  ? "bg-amber-50 text-amber-700 border border-amber-300 shadow-2xs"
                  : "text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payments</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterType("reimbursement")
                setCurrentPage(1)
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === "reimbursement"
                  ? "bg-purple-50 text-purple-700 border border-purple-300 shadow-2xs"
                  : "text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reimbursements</span>
            </button>
          </div>

          <div className="relative self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {monthDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMonthDropdownOpen(false)}
                />
                <div className="absolute top-full mt-1.5 right-0 z-30 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {months.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedMonth(m)
                        setMonthDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-medium cursor-pointer ${
                        selectedMonth === m
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-3">ACTIVITY</th>
                <th className="py-3 px-3">TYPE</th>
                <th className="py-3 px-3">AMOUNT</th>
                <th className="py-3 px-3">DATE</th>
                <th className="py-3 px-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {paginatedActivities.map((act) => (
                <tr
                  key={act.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-3 px-4 sm:px-3">
                    <div className="flex items-center gap-3">
                      {renderActivityIcon(act.type)}
                      <span className="font-semibold text-slate-800">
                        {act.description}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {renderTypeBadge(act.type)}
                  </td>

                  <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {act.amount}
                  </td>

                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{act.date}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedActivity(act)}
                      className="p-1.5 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedActivities.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-xs text-slate-400 font-medium"
                  >
                    No activity found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Showing {filteredActivities.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} -{" "}
            {Math.min(currentPage * pageSize, filteredActivities.length)} of{" "}
            {filteredActivities.length} activities
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-[#4F46E5] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ViewActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  )
}

