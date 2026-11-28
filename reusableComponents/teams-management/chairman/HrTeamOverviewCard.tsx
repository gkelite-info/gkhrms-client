"use client"

import React from "react"
import { Users, IdentificationBadge, RadioButton } from "phosphor-react"

export interface HrTeamOverviewCardProps {
  totalHrMembers?: number
  hrManagersCount?: number
  hrMembersCount?: number
  activeCount?: number
}

export default function HrTeamOverviewCard({
  totalHrMembers = 14,
  hrManagersCount = 2,
  hrMembersCount = 12,
  activeCount = 14,
}: HrTeamOverviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0 shadow-xs">
          <Users size={22} weight="regular" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            HR Team Overview
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-10">
        <div className="flex items-center gap-2.5">
          <div className="text-[#5046E5] flex items-center justify-center shrink-0">
            <Users size={22} weight="regular" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {totalHrMembers}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Total HR Members
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-[#5046E5] flex items-center justify-center shrink-0">
            <IdentificationBadge size={22} weight="regular" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {hrManagersCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              HR Managers
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-[#5046E5] flex items-center justify-center shrink-0">
            <Users size={22} weight="regular" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {hrMembersCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              HR Members
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-emerald-600 flex items-center justify-center shrink-0">
            <RadioButton size={22} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {activeCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
