"use client"

import { CreditCard, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function PaymentsView() {
  const pendingPayments = [
    {
      id: "p-1",
      recipient: "Cloud Infrastructure AWS",
      category: "Technology",
      amount: "$18,500",
      dueDate: "28 Aug 2025",
      status: "Due Soon",
    },
    {
      id: "p-2",
      recipient: "Workspace Office Leasing Ltd",
      category: "Operations",
      amount: "$42,000",
      dueDate: "30 Aug 2025",
      status: "Scheduled",
    },
    {
      id: "p-3",
      recipient: "Global HR Payroll Provider",
      category: "Salaries & Benefits",
      amount: "$65,500",
      dueDate: "01 Sep 2025",
      status: "Scheduled",
    },
    {
      id: "p-4",
      recipient: "Digital Design Studio Agency",
      category: "Marketing",
      amount: "$18,000",
      dueDate: "20 Aug 2025",
      status: "Overdue",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Pending Payments</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">12</div>
            <span className="text-xs text-rose-500 font-semibold mt-1 block">
              $126K due
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Overdue Invoices</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">5</div>
            <span className="text-xs text-rose-500 font-semibold mt-1 block">
              $18K total
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Auto-Debit Health</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">99.4%</div>
            <span className="text-xs text-slate-400 font-normal mt-1 block">
              All gateways operational
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Upcoming & Overdue Payables
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1">Payee / Vendor</th>
                <th className="pb-3 pt-1">Category</th>
                <th className="pb-3 pt-1">Due Date</th>
                <th className="pb-3 pt-1">Amount</th>
                <th className="pb-3 pt-1">Status</th>
                <th className="pb-3 pt-1 text-right">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {pendingPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 font-semibold text-slate-800">
                    {p.recipient}
                  </td>
                  <td className="py-3.5 text-slate-500">
                    {p.category}
                  </td>
                  <td className="py-3.5 text-slate-600 whitespace-nowrap">
                    {p.dueDate}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">
                    {p.amount}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === "Overdue"
                          ? "bg-rose-50 text-rose-600 border border-rose-200"
                          : p.status === "Due Soon"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-blue-50 text-blue-600 border border-blue-200"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      className="px-3 py-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Pay Now
                    </button>
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

