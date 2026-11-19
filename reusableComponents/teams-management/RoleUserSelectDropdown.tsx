"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { CaretDown, MagnifyingGlass, UserMinus, X, Check } from "phosphor-react"
import { RoleUser, ManagerUser } from "./types"
import ReusableAvatar from "../ReusableAvatar"

interface RoleUserSelectDropdownProps {
  label: string
  icon?: React.ReactNode
  selectedUser?: RoleUser | ManagerUser | string | null
  options: (RoleUser | ManagerUser)[]
  onSelect: (user: RoleUser | ManagerUser | null) => void
  placeholder?: string
  className?: string
}

export default function RoleUserSelectDropdown({
  label,
  icon,
  selectedUser,
  options,
  onSelect,
  placeholder,
  className = "",
}: RoleUserSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedObj = useMemo(() => {
    if (!selectedUser) return null
    if (typeof selectedUser === "object") return selectedUser
    return options.find((opt) => opt.name.toLowerCase() === selectedUser.toLowerCase()) || {
      id: "custom",
      name: selectedUser,
      role: label,
    }
  }, [selectedUser, options, label])

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options
    const q = search.toLowerCase()
    return options.filter(
      (opt) => opt.name.toLowerCase().includes(q) || (opt.role && opt.role.toLowerCase().includes(q))
    )
  }, [options, search])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutside)
      document.addEventListener("keydown", handleEsc)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className={`relative flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
          {icon}
          <span>{label}</span>
        </label>
        <span className="text-[10px] text-gray-400 font-medium">Optional</span>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2 rounded-xl border border-gray-200 hover:border-[#5B50EC] bg-white flex items-center justify-between gap-2 cursor-pointer transition-all shadow-2xs select-none min-h-[42px]"
      >
        {selectedObj ? (
          <div className="flex items-center gap-2 truncate min-w-0">
            <ReusableAvatar src={selectedObj.avatar} name={selectedObj.name} size={24} shape="circle" fallbackType="icon" />
            <span className="text-xs font-semibold text-gray-900 truncate">{selectedObj.name}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400 font-normal truncate">
            {placeholder || `Select ${label}...`}
          </span>
        )}
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {selectedObj && (
            <span
              onClick={(e) => {
                e.stopPropagation()
                onSelect(null)
              }}
              className="p-1 rounded-md text-gray-400 hover:text-rose-500 hover:bg-gray-100 cursor-pointer"
            >
              <X size={12} weight="bold" />
            </span>
          )}
          <CaretDown size={13} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180 text-[#5B50EC]" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-40 max-h-60 overflow-hidden flex flex-col">
          <div className="relative flex items-center mb-1.5 px-1 shrink-0">
            <MagnifyingGlass size={13} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user..."
              autoFocus
              className="w-full pl-7 pr-2.5 py-1.5 text-xs text-gray-800 bg-gray-50 rounded-lg border border-gray-200/80 focus:border-[#5B50EC] outline-none"
            />
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => {
                onSelect(null)
                setIsOpen(false)
                setSearch("")
              }}
              className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 text-left cursor-pointer transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                <UserMinus size={13} weight="bold" />
              </div>
              <span className="text-xs text-gray-500 font-medium">None / Unassigned</span>
            </button>

            {filteredOptions.map((opt) => {
              const isChosen = selectedObj?.id === opt.id || selectedObj?.name === opt.name
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onSelect(opt)
                    setIsOpen(false)
                    setSearch("")
                  }}
                  className={`w-full flex items-center justify-between gap-2 p-1.5 rounded-xl transition-colors text-left cursor-pointer ${
                    isChosen ? "bg-[#EEF2FF] text-[#5B50EC]" : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate min-w-0">
                    <ReusableAvatar src={opt.avatar} name={opt.name} size={24} shape="circle" fallbackType="icon" />
                    <div className="truncate min-w-0">
                      <span className="text-xs font-semibold block leading-tight truncate">{opt.name}</span>
                      <span className="text-[10px] text-gray-400 block leading-tight truncate">{opt.role}</span>
                    </div>
                  </div>
                  {isChosen && <Check size={14} weight="bold" className="text-[#5B50EC] shrink-0 mr-1" />}
                </button>
              )
            })}
            {filteredOptions.length === 0 && (
              <span className="text-xs text-gray-400 text-center py-2 italic">No users found</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
