"use client"

import { Eye } from "phosphor-react"
import { MyExceptionItem } from "./types"

interface MyExceptionTableProps {
  records: MyExceptionItem[]
  onSelectRecord: (record: MyExceptionItem) => void
}

const getStatusBadge = (status: string) => {
  const norm = status?.toLowerCase()
  if (norm === "approved" || norm === "accepted") {
    return {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      dot: "bg-emerald-500",
      label: "Approved",
    }
  }
  if (norm === "rejected") {
    return {
      bg: "bg-rose-50 text-rose-700 border-rose-200/80",
      dot: "bg-rose-500",
      label: "Rejected",
    }
  }
  return {
    bg: "bg-amber-50 text-amber-700 border-amber-200/80",
    dot: "bg-amber-500",
    label: "Pending",
  }
}

export default function MyExceptionTable({
  records,
  onSelectRecord,
}: MyExceptionTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-2xs custom-scrollbar">
      <table className="w-full text-left text-xs min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-700 tracking-wider">
            <th className="py-3.5 px-4 whitespace-nowrap">DATE</th>
            <th className="py-3.5 px-4 whitespace-nowrap">ISSUE TYPE</th>
            <th className="py-3.5 px-4 whitespace-nowrap">REQUESTED CORRECTION</th>
            <th className="py-3.5 px-4 whitespace-nowrap">REVIEWED BY</th>
            <th className="py-3.5 px-4 whitespace-nowrap">STATUS</th>
            <th className="py-3.5 px-4 text-center whitespace-nowrap">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {records.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-xs text-gray-400">
                No exception records match your search criteria.
              </td>
            </tr>
          ) : (
            records.map((item) => {
              const badge = getStatusBadge(item.status)
              return (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-gray-900 whitespace-nowrap">{item.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800 whitespace-nowrap">{item.issueType}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">{item.requestedCorrection}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-gray-900 leading-tight">{item.reviewedBy.name}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{item.reviewedBy.role}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.bg} shadow-2xs`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelectRecord(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#5B50EC] hover:bg-[#EEF2FF] hover:border-[#5B50EC] transition-all cursor-pointer shadow-2xs"
                    >
                      <Eye size={14} weight="bold" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
