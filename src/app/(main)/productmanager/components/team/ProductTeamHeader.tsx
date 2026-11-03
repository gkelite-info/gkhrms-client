"use client"

import React from "react"
import { UsersThree, ArrowLeft } from "phosphor-react"
import SearchableProjectScrollDropdown from "./SearchableProjectScrollDropdown"

interface ProductTeamHeaderProps {
  onBack?: () => void
  currentProjectName: string
  selectedProduct: string
  onProductChange: (id: string) => void
}

export default function ProductTeamHeader({
  onBack,
  currentProjectName,
  selectedProduct,
  onProductChange,
}: ProductTeamHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
      <div className="flex items-center gap-3.5 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center transition-all cursor-pointer shrink-0"
            title="Back to Projects Overview"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
        )}
        <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0">
          <UsersThree size={22} weight="duotone" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight truncate">
              Product Team Attendance
            </h1>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#5B50EC]">
              {currentProjectName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
            View attendance of all team members in {currentProjectName}.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 shrink-0 self-start md:self-auto min-w-[160px]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          PRODUCT / PROJECT
        </span>
        <SearchableProjectScrollDropdown
          value={selectedProduct}
          onChange={onProductChange}
          className="w-full sm:w-52"
        />
      </div>
    </div>
  )
}
