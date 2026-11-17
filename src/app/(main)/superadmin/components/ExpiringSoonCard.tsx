"use client"

import { Clock } from "lucide-react"

interface ExpiringItem {
  company: string
  renewalDate: string
  daysLeft: number
}

const expiringList: ExpiringItem[] = [
  {
    company: "Maple HR Solutions",
    renewalDate: "30 Aug 2025",
    daysLeft: 4,
  },
  {
    company: "Vision Corp",
    renewalDate: "02 Sep 2025",
    daysLeft: 7,
  },
  {
    company: "Orion Enterprises",
    renewalDate: "05 Sep 2025",
    daysLeft: 10,
  },
  {
    company: "PixelSoft LLC",
    renewalDate: "10 Sep 2025",
    daysLeft: 15,
  },
]

export default function ExpiringSoonCard() {
  return (
    <div className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#5B50E5]" />
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Expiring Soon
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
              <th className="pb-2.5 font-semibold">COMPANY</th>
              <th className="pb-2.5 font-semibold">RENEWAL DATE</th>
              <th className="pb-2.5 font-semibold text-right">DAYS LEFT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {expiringList.map((item) => (
              <tr
                key={item.company}
                className="hover:bg-slate-50/70 transition-colors"
              >
                <td className="py-2.5 font-bold text-slate-800">
                  {item.company}
                </td>
                <td className="py-2.5 text-slate-500 font-medium">
                  {item.renewalDate}
                </td>
                <td className="py-2.5 text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                      item.daysLeft <= 5
                        ? "bg-rose-50 text-rose-600 border border-rose-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}
                  >
                    {item.daysLeft} days
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
