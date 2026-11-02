"use client"

import {  useState  } from "react";
import { AirplaneTilt, House } from "phosphor-react"
import { ReusableAvatar } from "@/components/reusableComponents"
import { ManagerRequestItem } from "../../data/managerRequestsData"

interface ManagerRequestItemCardProps {
  item: ManagerRequestItem
  onView: (item: ManagerRequestItem) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export default function ManagerRequestItemCard({
  item,
  onView,
  onApprove,
  onReject,
}: ManagerRequestItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLeave = item.requestType === "Leave"
  const isPending = item.status === "Pending"
  const isApproved = item.status === "Approved"
  const isLongReason = item.reason.length > 100 || item.reason.includes("\n")

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs transition-all hover:border-gray-200 min-w-0 flex flex-col gap-3.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 min-w-0">
        <div className="flex items-center justify-between lg:justify-start gap-3.5 min-w-0 flex-1">
          <div className="flex items-center gap-3 min-w-0">
            <ReusableAvatar
              src={item.avatar}
              alt={item.name}
              name={item.name}
              size={44}
              fallbackType="icon"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-bold text-gray-900 leading-snug break-words">
                {item.name}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium flex-wrap mt-0.5">
                <span className="font-mono text-gray-400 font-semibold shrink-0">{item.employeeId}</span>
                <span className="text-gray-300 shrink-0">•</span>
                <span className="text-gray-600 font-normal break-words">{item.designation}</span>
              </div>
            </div>
          </div>

          <span
            className={`lg:hidden px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              isPending
                ? "bg-[#FFF8EC] text-[#F59E0B]"
                : isApproved
                ? "bg-[#E8FAF4] text-[#10B981]"
                : "bg-[#FFF1F2] text-[#F43F5E]"
            }`}
          >
            {item.status}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isLeave
                ? "bg-[#E8FAF4] text-[#10B981] border border-[#10B981]/25"
                : "bg-[#EFF6FF] text-[#3B82F6] border border-[#3B82F6]/25"
            }`}
          >
            {isLeave ? (
              <AirplaneTilt size={13} weight="bold" />
            ) : (
              <House size={13} weight="bold" />
            )}
            {item.requestType}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {item.duration || `(${item.requestedTime})`}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-gray-50/70 p-3.5 border border-gray-100 flex flex-col gap-1.5 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Reason for Request
        </span>
        <div className="text-xs text-gray-700 font-medium leading-relaxed break-words whitespace-pre-wrap">
          {isExpanded || !isLongReason ? (
            item.reason
          ) : (
            <span className="line-clamp-2">{item.reason}</span>
          )}
        </div>
        {isLongReason && (
          <div className="pt-2 mt-1 border-t border-gray-100/70">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#5B50EC] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1 text-xs transition-colors"
            >
              {isExpanded ? "Show less" : "Read full reason"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-gray-100 min-w-0">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-400 font-medium">Requested on:</span>
          <span className="font-semibold text-gray-700">
            {item.requestedOnTime || `${item.date}, 10:00 AM`}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          <span
            className={`hidden lg:inline-flex px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              isPending
                ? "bg-[#FFF8EC] text-[#F59E0B]"
                : isApproved
                ? "bg-[#E8FAF4] text-[#10B981]"
                : "bg-[#FFF1F2] text-[#F43F5E]"
            }`}
          >
            {item.status}
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onView(item)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#5B50EC] border border-[#5B50EC]/30 hover:bg-[#EEF2FF] transition-all cursor-pointer"
            >
              View
            </button>

            {isPending && (
              <>
                <button
                  type="button"
                  onClick={() => onApprove(item.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#10B981] border border-[#10B981]/40 hover:bg-[#10B981] hover:text-white transition-all cursor-pointer"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => onReject(item.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#F43F5E] border border-[#F43F5E]/40 hover:bg-[#F43F5E] hover:text-white transition-all cursor-pointer"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
