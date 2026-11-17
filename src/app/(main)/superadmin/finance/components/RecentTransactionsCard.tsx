"use client"

import { useState } from "react"
import { Receipt, ArrowRight, X, Search, Filter } from "lucide-react"

export interface Transaction {
  id: string
  company: string
  plan: string
  amount: string
  date: string
  status: "Paid" | "Pending" | "Failed"
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-105784",
    company: "Orion Technologies",
    plan: "Enterprise",
    amount: "₹ 4,00,000",
    date: "10 Nov 2026",
    status: "Paid",
  },
  {
    id: "TXN-105783",
    company: "Phoenix Solutions",
    plan: "Professional",
    amount: "₹ 2,40,000",
    date: "09 Nov 2026",
    status: "Paid",
  },
  {
    id: "TXN-105782",
    company: "Horizon Foods",
    plan: "Standard",
    amount: "₹ 1,20,000",
    date: "08 Nov 2026",
    status: "Paid",
  },
  {
    id: "TXN-105781",
    company: "Aurora Digital",
    plan: "Professional",
    amount: "₹ 2,40,000",
    date: "07 Nov 2026",
    status: "Pending",
  },
  {
    id: "TXN-105780",
    company: "Vertex Systems",
    plan: "Enterprise",
    amount: "₹ 4,00,000",
    date: "06 Nov 2026",
    status: "Paid",
  },
  {
    id: "TXN-105779",
    company: "Nexus Dynamics",
    plan: "Standard",
    amount: "₹ 1,20,000",
    date: "05 Nov 2026",
    status: "Paid",
  },
  {
    id: "TXN-105778",
    company: "Apex Global",
    plan: "Basic",
    amount: "₹ 60,000",
    date: "04 Nov 2026",
    status: "Paid",
  },
  {
    id: "TXN-105777",
    company: "Crestwood Labs",
    plan: "Professional",
    amount: "₹ 2,40,000",
    date: "03 Nov 2026",
    status: "Pending",
  },
]

export default function RecentTransactionsCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")

  const displayTransactions = INITIAL_TRANSACTIONS.slice(0, 5)

  const filteredTransactions = INITIAL_TRANSACTIONS.filter((tx) => {
    const matchesSearch =
      tx.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.plan.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "All" || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
              <Receipt className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Recent Transactions
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-[#5B50E5] hover:text-[#463cb9] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                <th className="pb-2.5 font-semibold">Transaction ID</th>
                <th className="pb-2.5 font-semibold">Company</th>
                <th className="pb-2.5 font-semibold">Plan</th>
                <th className="pb-2.5 font-semibold">Amount</th>
                <th className="pb-2.5 font-semibold">Payment Date</th>
                <th className="pb-2.5 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3 font-semibold text-slate-700">
                    {tx.id}
                  </td>
                  <td className="py-3 font-medium text-slate-800">
                    {tx.company}
                  </td>
                  <td className="py-3 text-slate-500 font-medium">
                    {tx.plan}
                  </td>
                  <td className="py-3 font-bold text-slate-800">
                    {tx.amount}
                  </td>
                  <td className="py-3 text-slate-400 font-medium">
                    {tx.date}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        tx.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl border border-slate-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EEF0FD] flex items-center justify-center text-[#5B50E5]">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    All Platform Transactions
                  </h3>
                  <span className="text-xs text-slate-400">
                    Full payment and billing activity records
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50/50">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter transactions..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5]"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
                {["All", "Paid", "Pending"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      statusFilter === status
                        ? "bg-[#5B50E5] text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                    <th className="pb-2.5 font-semibold">Transaction ID</th>
                    <th className="pb-2.5 font-semibold">Company</th>
                    <th className="pb-2.5 font-semibold">Plan</th>
                    <th className="pb-2.5 font-semibold">Amount</th>
                    <th className="pb-2.5 font-semibold">Payment Date</th>
                    <th className="pb-2.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3 font-semibold text-slate-700">
                        {tx.id}
                      </td>
                      <td className="py-3 font-medium text-slate-800">
                        {tx.company}
                      </td>
                      <td className="py-3 text-slate-500 font-medium">
                        {tx.plan}
                      </td>
                      <td className="py-3 font-bold text-slate-800">
                        {tx.amount}
                      </td>
                      <td className="py-3 text-slate-400 font-medium">
                        {tx.date}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            tx.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

