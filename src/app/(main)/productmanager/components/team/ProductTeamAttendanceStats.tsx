"use client"

import React from "react"
import {
  UsersThree,
  CheckCircle,
  XCircle,
  MinusCircle,
  House,
} from "phosphor-react"

interface ProductTeamAttendanceStatsProps {
  stats: {
    total: number
    present: number
    absent: number
    onLeave: number
    wfh: number
  }
}

export default function ProductTeamAttendanceStats({
  stats,
}: ProductTeamAttendanceStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 min-w-0">
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0">
          <UsersThree size={22} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {stats.total}
          </span>
          <span className="text-xs text-gray-500 font-medium leading-tight mt-0.5 text-center sm:text-left">
            Total Employees
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-emerald-600 shrink-0">
          <CheckCircle size={22} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {stats.present}
          </span>
          <span className="text-xs text-gray-500 font-medium leading-tight mt-0.5 text-center sm:text-left">
            Present
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FEF2F2] flex items-center justify-center text-rose-600 shrink-0">
          <XCircle size={22} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {stats.absent}
          </span>
          <span className="text-xs text-gray-500 font-medium leading-tight mt-0.5 text-center sm:text-left">
            Absent
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFFBEB] flex items-center justify-center text-amber-600 shrink-0">
          <MinusCircle size={22} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {stats.onLeave}
          </span>
          <span className="text-xs text-gray-500 font-medium leading-tight mt-0.5 text-center sm:text-left">
            On Leave
          </span>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-1 xl:col-span-1 bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-blue-600 shrink-0">
          <House size={22} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {stats.wfh}
          </span>
          <span className="text-xs text-gray-500 font-medium leading-tight mt-0.5 text-center sm:text-left">
            Work From Home
          </span>
        </div>
      </div>
    </div>
  )
}

