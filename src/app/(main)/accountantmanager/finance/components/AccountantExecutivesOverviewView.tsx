"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  CheckCircle2,
  RotateCcw,
  Calendar,
  Search,
  ChevronDown,
  FileText,
  ArrowRight,
} from "lucide-react"
import ReusableAvatar from "../../../../../../reusableComponents/ReusableAvatar"
import {
  executiveOverviewKpis,
  mockAccountantExecutives,
  executiveStatusFilterOptions,
  executiveMonthFilterOptions,
} from "../data/mockAccountantData"
import { AccountantExecutive } from "../types"

interface AccountantExecutivesOverviewViewProps {
  onViewExecutive?: (executive: AccountantExecutive) => void
}

export default function AccountantExecutivesOverviewView({
  onViewExecutive,
}: AccountantExecutivesOverviewViewProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Status: All")
  const [monthFilter, setMonthFilter] = useState("Month: Nov 2026")
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)

  const handleOpenExecutive = (exec: AccountantExecutive) => {
    if (onViewExecutive) {
      onViewExecutive(exec)
    } else {
      router.push(`/accountantmanager?view=executive-details&id=${exec.id}`)
    }
  }

  const filteredExecutives = useMemo(() => {
    return mockAccountantExecutives.filter((item) => {
      if (statusFilter !== "Status: All") {
        const expectedStatus = statusFilter.replace("Status: ", "").trim()
        if (item.status.toLowerCase() !== expectedStatus.toLowerCase()) {
          return false
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesName = item.name.toLowerCase().includes(q)
        const matchesId = item.employeeId.toLowerCase().includes(q)
        const matchesRole = item.role.toLowerCase().includes(q)
        if (!matchesName && !matchesId && !matchesRole) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, statusFilter])

  return (
    <div className="space-y-4 xl:space-y-4.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-400 truncate">
              Total Executives
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
              {executiveOverviewKpis.totalExecutives}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-400 truncate">
              Completed Entries
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
              {executiveOverviewKpis.completedEntries}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-400 truncate">
              Completed Reimbursements
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
              {executiveOverviewKpis.completedReimbursements}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-3.5 sm:gap-4 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-[#FEF8ED] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#D97706]" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-medium text-slate-400 truncate">
              Completed This Month
            </span>
            <span className="block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
              {executiveOverviewKpis.completedThisMonth}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search executive by name or employee ID..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setStatusDropdownOpen(!statusDropdownOpen)
                setMonthDropdownOpen(false)
              }}
              className="flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer min-w-[130px] shadow-2xs"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {statusDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setStatusDropdownOpen(false)}
                />
                <div className="absolute top-full mt-1.5 right-0 z-30 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveStatusFilterOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setStatusFilter(opt)
                        setStatusDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        statusFilter === opt
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setMonthDropdownOpen(!monthDropdownOpen)
                setStatusDropdownOpen(false)
              }}
              className="flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors cursor-pointer min-w-[155px] shadow-2xs"
            >
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{monthFilter}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {monthDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMonthDropdownOpen(false)}
                />
                <div className="absolute top-full mt-1.5 right-0 z-30 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-xs">
                  {executiveMonthFilterOptions.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMonthFilter(m)
                        setMonthDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        monthFilter === m
                          ? "text-[#4F46E5] font-semibold bg-indigo-50/50"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredExecutives.map((exec) => (
          <div
            key={exec.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3.5">
                  <ReusableAvatar
                    src={exec.avatar}
                    name={exec.name}
                    size={48}
                    shape="circle"
                    fallbackType="initials"
                    className="shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {exec.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {exec.employeeId} • {exec.role}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF7EE] text-[#16A34A] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span>{exec.status}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] flex items-center justify-center text-[#9333EA] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400 leading-tight">
                      Completed Entries
                    </span>
                    <span className="block text-xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      {exec.completedEntries}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] flex items-center justify-center text-[#9333EA] shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400 leading-tight">
                      Completed Reimbursements
                    </span>
                    <span className="block text-xl font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                      {exec.completedReimbursements}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Last Activity: {exec.lastActivity}</span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenExecutive(exec)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-200/90 hover:border-indigo-300 text-[#4F46E5] hover:bg-indigo-50/60 text-xs font-semibold transition-all cursor-pointer shadow-2xs shrink-0"
              >
                <span>View Executive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredExecutives.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-8 border border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              No executives found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

