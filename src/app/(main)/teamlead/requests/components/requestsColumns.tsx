"use client"

import { Check, X } from "phosphor-react"
import { TableColumn, ReusableAvatar } from "@/components/reusableComponents"
import { AttendanceRequestItem } from "../types"

interface GetRequestsColumnsProps {
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onView: (row: AttendanceRequestItem) => void
  canApprove?: boolean
}

export function getRequestsColumns({
  onApprove,
  onReject,
  onView,
  canApprove = true,
}: GetRequestsColumnsProps): TableColumn<AttendanceRequestItem>[] {
  return [
    {
      header: "EMPLOYEE",
      accessor: "name",
      className: "min-w-[180px]",
      render: (row) => (
        <div className="flex items-center gap-3">
          <ReusableAvatar
            src={row.avatar}
            name={row.name}
            size={36}
            fallbackType="icon"
            bgColor="#EEF2FF"
            textColor="#5B50EC"
            className="flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-gray-900 text-xs truncate">{row.name}</span>
            <span className="text-[11px] text-gray-400 font-medium truncate">{row.designation}</span>
          </div>
        </div>
      ),
    },
    { header: "REQUEST TYPE", accessor: "requestType", className: "text-gray-700 font-medium whitespace-nowrap" },
    { header: "DATE", accessor: "date", className: "text-gray-700 whitespace-nowrap" },
    { header: "REQUESTED TIME", accessor: "requestedTime", className: "text-gray-700 whitespace-nowrap" },
    {
      header: "REASON",
      accessor: "reason",
      className: "max-w-[260px] text-gray-600 truncate",
      render: (row) => (
        <span className="truncate block" title={row.reason}>
          {row.reason}
        </span>
      ),
    },
    {
      header: "STATUS",
      accessor: "status",
      render: (row) => {
        const isApproved = row.status === "Approved"
        const isRejected = row.status === "Rejected"
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap select-none ${
              isApproved
                ? "bg-[#E8FAF4] text-[#059669] border border-[#A7F3D0]"
                : isRejected
                ? "bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]"
                : "bg-[#FFF8EC] text-[#D97706] border border-[#FDE68A]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isApproved ? "bg-[#059669]" : isRejected ? "bg-[#E11D48]" : "bg-[#D97706]"
              }`}
            />
            {row.status}
          </span>
        )
      },
    },
    {
      header: "ACTION",
      align: "center",
      className: "whitespace-nowrap",
      render: (row) => {
        const isPending = row.status === "Pending"

        if (!canApprove) {
          return (
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => onView(row)}
                className="text-[#5B50EC] hover:text-[#4338CA] font-semibold text-xs transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-[#EEF2FF] border border-[#C5C1FF]/70"
              >
                View
              </button>
            </div>
          )
        }

        return (
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={!isPending}
              onClick={() => onApprove(row.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                isPending
                  ? "bg-[#E8FAF4] text-[#059669] hover:bg-[#D1F7EA] border border-[#A7F3D0] cursor-pointer shadow-2xs active:scale-97"
                  : "bg-gray-50 text-gray-400 border border-gray-200/60 cursor-not-allowed opacity-60"
              }`}
              title={isPending ? "Approve Request" : `Already ${row.status}`}
            >
              <Check size={12} weight="bold" />
              <span>Approve</span>
            </button>
            <button
              type="button"
              disabled={!isPending}
              onClick={() => onReject(row.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                isPending
                  ? "bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] border border-[#FECDD3] cursor-pointer shadow-2xs active:scale-97"
                  : "bg-gray-50 text-gray-400 border border-gray-200/60 cursor-not-allowed opacity-60"
              }`}
              title={isPending ? "Reject Request" : `Already ${row.status}`}
            >
              <X size={12} weight="bold" />
              <span>Reject</span>
            </button>
            <button
              type="button"
              onClick={() => onView(row)}
              className="text-[#5B50EC] hover:text-[#4338CA] font-semibold text-xs transition-colors cursor-pointer px-1.5 py-1 rounded-lg hover:bg-[#EEF2FF]"
            >
              View
            </button>
          </div>
        )
      },
    },
  ]
}
