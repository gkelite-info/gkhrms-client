"use client"

import { useState } from "react"
import { CaretDown, UserMinus } from "phosphor-react"
import { ManagerUser } from "./types"
import { AVAILABLE_MANAGERS } from "./mockTeamsData"
import ReusableAvatar from "../ReusableAvatar"

interface ManagerSelectDropdownProps {
  selectedManager?: ManagerUser | null
  onSelect: (mgr: ManagerUser | null) => void
}

export default function ManagerSelectDropdown({
  selectedManager,
  onSelect,
}: ManagerSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold text-gray-700 block">Manager</label>
        <span className="text-[10px] text-gray-400 font-medium">Optional</span>
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 flex items-center justify-between bg-white cursor-pointer transition-all"
      >
        {selectedManager ? (
          <div className="flex items-center gap-2.5 truncate">
            <ReusableAvatar src={selectedManager.avatar} name={selectedManager.name} size={28} shape="circle" fallbackType="icon" />
            <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{selectedManager.name}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400 font-normal">None / Unassigned</span>
        )}
        <CaretDown size={14} className="text-gray-400 shrink-0 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl p-1 z-30 max-h-52 overflow-y-auto custom-scrollbar">
          <button
            type="button"
            onClick={() => {
              onSelect(null)
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left cursor-pointer border-b border-gray-100"
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
              <UserMinus size={13} weight="bold" />
            </div>
            <span className="text-xs font-medium text-gray-600">None / Unassigned</span>
          </button>
          {AVAILABLE_MANAGERS.map((mgr) => (
            <button
              key={mgr.id}
              type="button"
              onClick={() => {
                onSelect(mgr)
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F5F4FE] transition-colors text-left cursor-pointer"
            >
              <ReusableAvatar src={mgr.avatar} name={mgr.name} size={24} shape="circle" fallbackType="icon" />
              <div>
                <span className="text-xs font-bold text-gray-800 block">{mgr.name}</span>
                <span className="text-[10px] text-gray-400 block">{mgr.role}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
