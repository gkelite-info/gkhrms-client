"use client"

import React, { useState, useEffect } from "react"
import { X, Funnel, MagnifyingGlass, MapPin, Briefcase, CheckCircle, ArrowsCounterClockwise } from "phosphor-react"
import ReusableDropdown from "../../ReusableDropdown"

interface ApplyFiltersModalProps {
  isOpen: boolean
  onClose: () => void
  currentSearchQuery: string
  currentDepartment: string
  currentLocation: string
  currentStatus: string
  showDepartmentFilter?: boolean
  onApplyFilters: (filters: {
    searchQuery: string
    department: string
    location: string
    status: string
  }) => void
  onResetFilters: () => void
  totalResultsCount?: number
}

const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Technology",
  "Operations",
  "Projects",
  "Product",
  "HR & People",
  "Finance",
  "Frontend",
  "Backend",
  "Design",
]

const LOCATION_OPTIONS = [
  "All Locations",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
]

const STATUS_OPTIONS = ["All Status", "Active", "Inactive"]

export default function ApplyFiltersModal({
  isOpen,
  onClose,
  currentSearchQuery,
  currentDepartment,
  currentLocation,
  currentStatus,
  showDepartmentFilter = true,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: ApplyFiltersModalProps) {
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery)
  const [department, setDepartment] = useState(currentDepartment)
  const [location, setLocation] = useState(currentLocation)
  const [status, setStatus] = useState(currentStatus)

  useEffect(() => {
    if (isOpen) {
      setSearchQuery(currentSearchQuery)
      setDepartment(currentDepartment)
      setLocation(currentLocation)
      setStatus(currentStatus)
    }
  }, [isOpen, currentSearchQuery, currentDepartment, currentLocation, currentStatus])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  const handleReset = () => {
    setSearchQuery("")
    setDepartment("All Departments")
    setLocation("All Locations")
    setStatus("All Status")
    onResetFilters()
  }

  const handleApply = () => {
    onApplyFilters({
      searchQuery,
      department,
      location,
      status,
    })
    onClose()
  }

  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (department !== "All Departments" && showDepartmentFilter ? 1 : 0) +
    (location !== "All Locations" && location !== "Location" ? 1 : 0) +
    (status !== "All Status" && status !== "Status" ? 1 : 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#EFF3FA] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5046E5] shrink-0 shadow-xs">
              <Funnel size={20} weight="bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  Filter Team Members
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#5046E5]/10 text-[#5046E5] font-bold">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Refine organizational list by search keyword, location, and status
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar text-xs sm:text-sm">
          <div className="bg-white p-4 rounded-2xl border border-gray-100/90 shadow-2xs space-y-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <MagnifyingGlass size={14} className="text-[#5046E5]" />
              <span>Search Keyword</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or employee ID..."
                className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5046E5] focus:ring-1 focus:ring-[#5046E5] bg-gray-50/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {showDepartmentFilter && (
            <div className="bg-white p-4 rounded-2xl border border-gray-100/90 shadow-2xs space-y-2">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Briefcase size={14} className="text-[#5046E5]" />
                <span>Department / Function</span>
              </label>
              <ReusableDropdown
                value={department}
                options={DEPARTMENT_OPTIONS}
                onChange={(val) => setDepartment(String(val))}
                placeholder="All Departments"
                className="w-full"
                buttonClassName="py-2.5 px-3.5 text-xs sm:text-sm rounded-xl border-gray-200 w-full justify-between bg-gray-50/50"
                align="left"
              />
            </div>
          )}

          <div className="bg-white p-4 rounded-2xl border border-gray-100/90 shadow-2xs space-y-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#5046E5]" />
              <span>Office Location</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {LOCATION_OPTIONS.map((loc) => {
                const isSelected = location === loc
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#EEF2FF] border-[#5046E5] text-[#5046E5] shadow-2xs"
                        : "bg-gray-50/70 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {loc.replace("All Locations", "All")}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100/90 shadow-2xs space-y-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#5046E5]" />
              <span>Status</span>
            </label>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {STATUS_OPTIONS.map((st) => {
                const isSelected = status === st
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#EEF2FF] border-[#5046E5] text-[#5046E5] shadow-2xs"
                        : "bg-gray-50/70 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {st.replace("All Status", "All")}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-gray-200 bg-white flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <ArrowsCounterClockwise size={14} />
            <span>Reset All</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#5046E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer active:scale-98"
            >
              <Funnel size={14} weight="bold" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
