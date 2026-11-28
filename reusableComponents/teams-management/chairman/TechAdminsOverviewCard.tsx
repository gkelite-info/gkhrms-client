"use client"

import React from "react"
import { Desktop, Users, TreeStructure } from "phosphor-react"

export interface TechAdminsOverviewCardProps {
  totalTechAdmins?: number
  departmentsCount?: number
  activeTechAdminsCount?: number
}

export default function TechAdminsOverviewCard({
  totalTechAdmins = 8,
  departmentsCount = 4,
  activeTechAdminsCount = 8,
}: TechAdminsOverviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0 shadow-xs">
          <Desktop size={22} weight="regular" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Tech Admins Overview
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
              {totalTechAdmins}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Total Tech Admins
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-[#5046E5] flex items-center justify-center shrink-0">
            <TreeStructure size={22} weight="regular" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {departmentsCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Departments
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-[#5046E5] flex items-center justify-center shrink-0">
            <Users size={22} weight="regular" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {activeTechAdminsCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Active Tech Admins
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
