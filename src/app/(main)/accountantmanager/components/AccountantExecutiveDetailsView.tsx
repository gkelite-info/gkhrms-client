"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Users,
  Briefcase,
  Phone,
  Calendar,
  Mail,
  UserCheck,
  CreditCard,
  BarChart2,
  Clock,
  ChevronRight,
  X,
  Search,
} from "lucide-react"
import ReusableAvatar from "../../../../../reusableComponents/ReusableAvatar"
import { AccountantExecutive, ExecutiveActivityItem } from "../types"

interface AccountantExecutiveDetailsViewProps {
  executive: AccountantExecutive
  onBack: () => void
}

export default function AccountantExecutiveDetailsView({
  executive,
  onBack,
}: AccountantExecutiveDetailsViewProps) {
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [historySearchQuery, setHistorySearchQuery] = useState("")

  const workSummary = executive.workSummary ?? {
    expenseEntries: executive.completedEntries ?? 46,
    vendorPayments: 10,
    employeeReimbursements: executive.completedReimbursements ?? 8,
    moneyHandledThisMonth: "₹1,24,800",
    averageEntriesPerWeek: 11,
  }

  const activities: ExecutiveActivityItem[] = executive.recentActivity ?? [
    {
      id: "act-1",
      date: "21 Jun 2025, 11:24 AM",
      activityType: "Expense Entry Added",
      reference: "EXP-250621-003",
      amount: "₹7,500",
      status: "Completed",
    },
    {
      id: "act-2",
      date: "20 Jun 2025, 04:18 PM",
      activityType: "Vendor Payment Recorded",
      reference: "PAY-250620-002",
      amount: "₹1,10,000",
      status: "Completed",
    },
    {
      id: "act-3",
      date: "19 Jun 2025, 02:37 PM",
      activityType: "Reimbursement Recorded",
      reference: "REIM-250619-001",
      amount: "₹4,800",
      status: "Approved",
    },
    {
      id: "act-4",
      date: "18 Jun 2025, 10:09 AM",
      activityType: "Expense Entry Added",
      reference: "EXP-250618-002",
      amount: "₹3,200",
      status: "Completed",
    },
    {
      id: "act-5",
      date: "17 Jun 2025, 03:46 PM",
      activityType: "Vendor Payment Recorded",
      reference: "PAY-250617-001",
      amount: "₹56,000",
      status: "Completed",
    },
  ]

  const filteredHistory = useMemo(() => {
    if (!historySearchQuery.trim()) return activities
    const q = historySearchQuery.toLowerCase()
    return activities.filter(
      (item) =>
        item.activityType.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        item.amount.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
    )
  }, [activities, historySearchQuery])

  return (
    <div className="space-y-4 xl:space-y-4.5 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Executive Details
          </h1>
          <p className="text-xs text-slate-500">
            View finance activity and personal information of the selected accountant executive.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#6366F1] bg-white/70 hover:bg-white border border-[#A5B4FC]/80 hover:border-[#818CF8] shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Executives</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <ReusableAvatar
              src={executive.avatar || "/images/admin_rohan.jpg"}
              name={executive.name}
              size={88}
              shape="rounded"
              fallbackType="initials"
              bgColor="#D6D9E0"
              textColor="#475569"
              className="shrink-0 rounded-2xl shadow-2xs"
            />

            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {executive.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
                  {executive.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {executive.employeeId} | {executive.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-[#FAF8FF] border border-[#EDE9FE] rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-medium leading-none">
                  Employee ID
                </span>
                <span className="block text-xs font-bold text-slate-900 mt-1 leading-none">
                  {executive.employeeId}
                </span>
              </div>
            </div>

            <div className="bg-[#FAF8FF] border border-[#EDE9FE] rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <Users className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-medium leading-none">
                  Role
                </span>
                <span className="block text-xs font-bold text-slate-900 mt-1 leading-none">
                  {executive.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 pt-6 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <Users className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-slate-400 font-medium">Department</span>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {executive.department ?? "Finance"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Briefcase className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-slate-400 font-medium">Designation</span>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {executive.designation ?? "Accounts Executive"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-slate-400 font-medium">Phone</span>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {executive.phone ?? "+91 98765 43210"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-slate-400 font-medium">Joining Date</span>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {executive.joiningDate ?? "12 Jun 2025"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-slate-400 font-medium">Email</span>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {executive.email ?? "ravi.kumar@gkhrms.com"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <UserCheck className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-slate-400 font-medium">Reporting To</span>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {executive.reportingTo ?? "Elvaraj S. (Accountant Manager)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5">
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <BarChart2 className="w-4 h-4 text-[#8B5CF6]" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Work Summary
              </h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">Expense Entries</span>
                <span className="font-bold text-slate-900">
                  {workSummary.expenseEntries}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">Vendor Payments</span>
                <span className="font-bold text-slate-900">
                  {workSummary.vendorPayments}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">Employee Reimbursements</span>
                <span className="font-bold text-slate-900">
                  {workSummary.employeeReimbursements}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">Money Handled This Month</span>
                <span className="font-bold text-slate-900">
                  {workSummary.moneyHandledThisMonth}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">Average Entries per Week</span>
                <span className="font-bold text-slate-900">
                  {workSummary.averageEntriesPerWeek}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Recent Executive Activity
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setHistoryModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-indigo-200/80 text-xs font-semibold text-[#4F46E5] hover:bg-indigo-50/50 transition-colors cursor-pointer"
              >
                <span>View Full History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3 first:pl-0">
                      DATE
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3">
                      ACTIVITY TYPE
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3">
                      REFERENCE
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3">
                      AMOUNT
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3 last:pr-0">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activities.slice(0, 5).map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 px-3 first:pl-0 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {act.date}
                      </td>
                      <td className="py-3.5 px-3 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {act.activityType}
                      </td>
                      <td className="py-3.5 px-3 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {act.reference}
                      </td>
                      <td className="py-3.5 px-3 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {act.amount}
                      </td>
                      <td className="py-3.5 px-3 last:pr-0 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {historyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setHistoryModalOpen(false)} />

          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 pb-4 flex items-center justify-between gap-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <h3 className="text-base font-bold text-slate-900">
                  Executive Activity History • {executive.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setHistoryModalOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 pb-2 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  placeholder="Search activity by type, reference, amount or date..."
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="px-5 sm:px-6 py-2 flex-1 overflow-y-auto modal-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3 first:pl-0">
                      DATE
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3">
                      ACTIVITY TYPE
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3">
                      REFERENCE
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3">
                      AMOUNT
                    </th>
                    <th className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider py-3 px-3 last:pr-0">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredHistory.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3 px-3 first:pl-0 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {act.date}
                      </td>
                      <td className="py-3 px-3 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {act.activityType}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {act.reference}
                      </td>
                      <td className="py-3 px-3 text-xs font-bold text-slate-900 whitespace-nowrap">
                        {act.amount}
                      </td>
                      <td className="py-3 px-3 last:pr-0 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A]">
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                        No activities found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-end bg-white shrink-0">
              <button
                type="button"
                onClick={() => setHistoryModalOpen(false)}
                className="px-5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

