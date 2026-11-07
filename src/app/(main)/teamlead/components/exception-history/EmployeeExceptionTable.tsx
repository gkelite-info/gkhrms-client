"use client"

import { EmployeeExceptionRecord } from "./types"

interface EmployeeExceptionTableProps {
  records: EmployeeExceptionRecord[]
  totalRecordsCount: number
  onViewDetails: (record: EmployeeExceptionRecord) => void
}

const getIssueDotColor = (issue: string) => {
  if (issue.includes("Late Check-in")) return "bg-purple-500"
  if (issue.includes("Missed Check-out")) return "bg-blue-500"
  if (issue.includes("Low Working Hours")) return "bg-amber-500"
  if (issue.includes("Early Check-out")) return "bg-cyan-500"
  return "bg-indigo-500"
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

export default function EmployeeExceptionTable({
  records,
  totalRecordsCount,
  onViewDetails,
}: EmployeeExceptionTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col overflow-hidden min-w-0">
      <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">Previous Regularizations</h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Historical log of exception applications and manager resolutions.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5B50EC] shrink-0">
          {totalRecordsCount} Records
        </span>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-700 tracking-wider">
              <th className="py-3 px-4 whitespace-nowrap">Date</th>
              <th className="py-3 px-4 whitespace-nowrap">ISSUE TYPE</th>
              <th className="py-3 px-4 whitespace-nowrap">ORIGINAL VALUE</th>
              <th className="py-3 px-4 whitespace-nowrap">CORRECTED VALUE</th>
              <th className="py-3 px-4 whitespace-nowrap">APPROVED BY</th>
              <th className="py-3 px-4 whitespace-nowrap">STATUS</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {records.map((rec) => {
              const badge = getStatusBadge(rec.status)
              return (
                <tr key={rec.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">{rec.date}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getIssueDotColor(rec.issueType)} shrink-0`} />
                      <span className="font-semibold text-gray-800">{rec.issueType}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">{rec.originalValue}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">{rec.correctedValue}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-700 whitespace-nowrap">{rec.approvedBy}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.bg} shadow-2xs`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onViewDetails(rec)}
                      className="text-xs font-bold text-[#5B50EC] hover:underline cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
