"use client"

import React from "react"
import { UsersThree, CheckCircle } from "phosphor-react"

interface TeamLeadsOverviewCardProps {
  totalTeamLeads?: number
  activeTeamsCount?: number
}

export default function TeamLeadsOverviewCard({
  totalTeamLeads = 36,
  activeTeamsCount = 32,
}: TeamLeadsOverviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0 shadow-xs">
          <UsersThree size={22} weight="bold" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Team Leads Overview
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            <UsersThree size={16} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {totalTeamLeads}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Total Team Leads
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle size={16} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {activeTeamsCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Active Teams
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
