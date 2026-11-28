"use client"

import React from "react"
import { CurrencyCircleDollar, UsersThree, User, CheckCircle } from "phosphor-react"

interface FinanceTeamOverviewCardProps {
  totalMembers?: number
  financeManagersCount?: number
  financeExecutivesCount?: number
  activeCount?: number
}

export default function FinanceTeamOverviewCard({
  totalMembers = 12,
  financeManagersCount = 1,
  financeExecutivesCount = 11,
  activeCount = 12,
}: FinanceTeamOverviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0 shadow-xs">
          <CurrencyCircleDollar size={24} weight="bold" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Finance Team Overview
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            <UsersThree size={16} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {totalMembers}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Total Members
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            <User size={16} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {financeManagersCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Finance Manager
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            <UsersThree size={16} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {financeExecutivesCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Finance Executives
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle size={16} weight="bold" />
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
