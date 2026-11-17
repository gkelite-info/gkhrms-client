"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
} from "lucide-react"
import {
  ActivePaidCompany,
  ACTIVE_PAID_COMPANIES,
} from "../activePaidCompaniesData"
import CompanySubscriptionModal from "./CompanySubscriptionModal"

export default function ActivePaidCompaniesTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("All Plans")
  const [selectedBillingCycle, setSelectedBillingCycle] = useState("All Cycles")
  const [selectedRenewalStatus, setSelectedRenewalStatus] = useState("All Statuses")
  const [selectedAccountStatus, setSelectedAccountStatus] = useState("All Statuses")

  const [planDropdownOpen, setPlanDropdownOpen] = useState(false)
  const [cycleDropdownOpen, setCycleDropdownOpen] = useState(false)
  const [renewalDropdownOpen, setRenewalDropdownOpen] = useState(false)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 8

  const [selectedCompany, setSelectedCompany] = useState<ActivePaidCompany | null>(
    null
  )

  const planRef = useRef<HTMLDivElement>(null)
  const cycleRef = useRef<HTMLDivElement>(null)
  const renewalRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (planRef.current && !planRef.current.contains(event.target as Node)) {
        setPlanDropdownOpen(false)
      }
      if (cycleRef.current && !cycleRef.current.contains(event.target as Node)) {
        setCycleDropdownOpen(false)
      }
      if (renewalRef.current && !renewalRef.current.contains(event.target as Node)) {
        setRenewalDropdownOpen(false)
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCompanies = useMemo(() => {
    return ACTIVE_PAID_COMPANIES.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPlan =
        selectedPlan === "All Plans" || item.plan === selectedPlan

      const matchesCycle =
        selectedBillingCycle === "All Cycles" ||
        item.billingCycle === selectedBillingCycle

      const matchesRenewal =
        selectedRenewalStatus === "All Statuses" ||
        (selectedRenewalStatus === "Renewing This Month" &&
          item.isRenewingThisMonth) ||
        (selectedRenewalStatus === "Up to Date" && !item.isRenewingThisMonth)

      const matchesAccount =
        selectedAccountStatus === "All Statuses" ||
        item.accountStatus === selectedAccountStatus

      return (
        matchesSearch &&
        matchesPlan &&
        matchesCycle &&
        matchesRenewal &&
        matchesAccount
      )
    })
  }, [
    searchQuery,
    selectedPlan,
    selectedBillingCycle,
    selectedRenewalStatus,
    selectedAccountStatus,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ]
  }, [currentPage, totalPages])

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-slate-100/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search Company"
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B50E5]/20 focus:border-[#5B50E5] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div ref={planRef} className="relative flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              PLAN
            </span>
            <button
              type="button"
              onClick={() => {
                setPlanDropdownOpen(!planDropdownOpen)
                setCycleDropdownOpen(false)
                setRenewalDropdownOpen(false)
                setAccountDropdownOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedPlan}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {planDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Plans", "Enterprise", "Professional", "Standard"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedPlan(opt)
                        setCurrentPage(1)
                        setPlanDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedPlan === opt
                          ? "font-bold text-[#5B50E5]"
                          : "text-slate-600"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div ref={cycleRef} className="relative flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              BILLING CYCLE
            </span>
            <button
              type="button"
              onClick={() => {
                setCycleDropdownOpen(!cycleDropdownOpen)
                setPlanDropdownOpen(false)
                setRenewalDropdownOpen(false)
                setAccountDropdownOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedBillingCycle}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {cycleDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Cycles", "Annual", "Monthly"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedBillingCycle(opt)
                      setCurrentPage(1)
                      setCycleDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                      selectedBillingCycle === opt
                        ? "font-bold text-[#5B50E5]"
                        : "text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={renewalRef} className="relative flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              RENEWAL STATUS
            </span>
            <button
              type="button"
              onClick={() => {
                setRenewalDropdownOpen(!renewalDropdownOpen)
                setPlanDropdownOpen(false)
                setCycleDropdownOpen(false)
                setAccountDropdownOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedRenewalStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {renewalDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Statuses", "Renewing This Month", "Up to Date"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedRenewalStatus(opt)
                        setCurrentPage(1)
                        setRenewalDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedRenewalStatus === opt
                          ? "font-bold text-[#5B50E5]"
                          : "text-slate-600"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div ref={accountRef} className="relative flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              ACCOUNT STATUS
            </span>
            <button
              type="button"
              onClick={() => {
                setAccountDropdownOpen(!accountDropdownOpen)
                setPlanDropdownOpen(false)
                setCycleDropdownOpen(false)
                setRenewalDropdownOpen(false)
              }}
              className="h-9 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>{selectedAccountStatus}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {accountDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 py-1 text-xs">
                {["All Statuses", "Active", "Pending", "Suspended"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedAccountStatus(opt)
                        setCurrentPage(1)
                        setAccountDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#EEF0FD] hover:text-[#5B50E5] ${
                        selectedAccountStatus === opt
                          ? "font-bold text-[#5B50E5]"
                          : "text-slate-600"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100/90 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">COMPANY NAME</th>
                <th className="py-4 px-4">CURRENT PLAN</th>
                <th className="py-4 px-4">BILLING CYCLE</th>
                <th className="py-4 px-4">SUBSCRIPTION START</th>
                <th className="py-4 px-4">RENEWAL DATE</th>
                <th className="py-4 px-4">PAYMENT STATUS</th>
                <th className="py-4 px-4">ACCOUNT STATUS</th>
                <th className="py-4 px-5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {paginatedCompanies.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    No active paid companies found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedCompanies.map((comp) => (
                  <tr
                    key={comp.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${comp.avatarBg} ${comp.avatarColor}`}
                        >
                          {comp.avatarLetter}
                        </div>
                        <span className="font-semibold text-slate-800 tracking-tight">
                          {comp.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {comp.plan}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {comp.billingCycle}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {comp.subscriptionStart}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {comp.renewalDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/90">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {comp.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {comp.accountStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedCompany(comp)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#5B50E5] hover:text-[#4538C9] hover:bg-[#EEF0FD] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredCompanies.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + rowsPerPage, filteredCompanies.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {filteredCompanies.length}
            </span>{" "}
            companies
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {paginationItems.map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 font-medium"
                  >
                    ...
                  </span>
                )
              }

              const pageNum = Number(item)
              const isActive = currentPage === pageNum

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5B50E5] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 font-medium rounded-lg"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <CompanySubscriptionModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  )
}
