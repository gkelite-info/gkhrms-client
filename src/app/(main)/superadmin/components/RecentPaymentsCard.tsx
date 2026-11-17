"use client"

import { CreditCard } from "lucide-react"

interface PaymentRow {
  id: string
  company: string
  amount: string
  plan: string
  date: string
  status: "Paid" | "Failed"
}

const recentPayments: PaymentRow[] = [
  {
    id: "pay-1",
    company: "TechNova Solutions",
    amount: "$299.00",
    plan: "Professional",
    date: "26 Aug 2025",
    status: "Paid",
  },
  {
    id: "pay-2",
    company: "GreenField Pvt Ltd",
    amount: "$99.00",
    plan: "Basic",
    date: "24 Aug 2025",
    status: "Paid",
  },
  {
    id: "pay-3",
    company: "Skyline Technologies",
    amount: "$499.00",
    plan: "Enterprise",
    date: "22 Aug 2025",
    status: "Paid",
  },
  {
    id: "pay-4",
    company: "NextGen Innovations",
    amount: "$299.00",
    plan: "Professional",
    date: "20 Aug 2025",
    status: "Failed",
  },
  {
    id: "pay-5",
    company: "TechNova Solutions",
    amount: "$299.00",
    plan: "Professional",
    date: "26 Aug 2025",
    status: "Paid",
  },
  {
    id: "pay-6",
    company: "GreenField Pvt Ltd",
    amount: "$99.00",
    plan: "Basic",
    date: "24 Aug 2025",
    status: "Paid",
  },
  {
    id: "pay-7",
    company: "Skyline Technologies",
    amount: "$499.00",
    plan: "Enterprise",
    date: "22 Aug 2025",
    status: "Paid",
  },
  {
    id: "pay-8",
    company: "NextGen Innovations",
    amount: "$299.00",
    plan: "Professional",
    date: "20 Aug 2025",
    status: "Failed",
  },
]

export default function RecentPaymentsCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#5B50E5]" />
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Recent Payments
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
              <th className="pb-2.5 font-semibold">COMPANY</th>
              <th className="pb-2.5 font-semibold">AMOUNT</th>
              <th className="pb-2.5 font-semibold">PLAN</th>
              <th className="pb-2.5 font-semibold">PAYMENT DATE</th>
              <th className="pb-2.5 font-semibold text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentPayments.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/70 transition-colors"
              >
                <td className="py-2.5 font-bold text-slate-800">
                  {item.company}
                </td>
                <td className="py-2.5 font-extrabold text-slate-800">
                  {item.amount}
                </td>
                <td className="py-2.5 text-slate-500 font-medium">
                  {item.plan}
                </td>
                <td className="py-2.5 text-slate-400 font-medium">
                  {item.date}
                </td>
                <td className="py-2.5 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === "Paid"
                        ? "bg-[#EEF0FD] text-[#5B50E5] border border-indigo-100/60"
                        : "bg-purple-50 text-purple-600 border border-purple-100/60"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === "Paid"
                          ? "bg-[#5B50E5]"
                          : "bg-purple-600"
                      }`}
                    />
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
