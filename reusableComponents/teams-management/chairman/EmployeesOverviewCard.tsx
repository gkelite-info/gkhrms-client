"use client"

import React from "react"
import { UsersThree, Buildings, User } from "phosphor-react"

interface EmployeesOverviewCardProps {
  totalEmployees?: number
  departmentsCount?: number
  activeEmployeesCount?: number
}

export default function EmployeesOverviewCard({
  totalEmployees = 248,
  departmentsCount = 18,
  activeEmployeesCount = 237,
}: EmployeesOverviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0 shadow-xs">
          <UsersThree size={22} weight="bold" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Employees Overview
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
              {totalEmployees}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Total Employees
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            <Buildings size={16} weight="bold" />
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
          <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#5046E5] flex items-center justify-center shrink-0">
            <User size={16} weight="bold" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {activeEmployeesCount}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 font-normal">
              Active Employees
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
